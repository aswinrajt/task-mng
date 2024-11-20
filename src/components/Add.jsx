import React from 'react'
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addTaskApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { addtaskResponseContext } from '../Context/Contextapi';



function Add() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const { addResponse, setAddResponse } = useContext(addtaskResponseContext)


  const [task, setTask] = useState({
    tid: "", title: "", desc: "", date: "", status: ""
  })

  const handleAddTask = async () => {
    console.log(task)
    const { tid, title, desc, date, status } = task
    if (!tid || !title || !desc || !date || !status) {
      toast.warning("Enter Valid Inputs!!")
    }
    else {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }

      const body = { tid, title, desc, date, status }

      const res = await addTaskApi(body, header)
      console.log(res)
      if (res.status == 200) {
        toast.success("Task Added Succesfully!!")
        handleClose()
        setAddResponse(res)


      }
      else {
        toast.warning("Updation failed!!!")
      }

    }
  }




  return (
    <>


      <Button variant="primary m-4 d-flex" onClick={handleShow}>
        <i class="fa-solid fa-square-plus me-2"></i>
        ADD TASK
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="mb-3">
              <label for="taskId" class="form-label">Task ID</label>
              <input type="text" onChange={(e) => setTask({ ...task, tid: e.target.value })} id="taskId" class="form-control" placeholder="Enter a unique task ID" required />
            </div>
            <div class="mb-3">
              <label for="taskTitle" class="form-label">Task Title</label>
              <input type="text" onChange={(e) => setTask({ ...task, title: e.target.value })} id="taskTitle" class="form-control" placeholder="Enter task title" required />
            </div>

            <div class="mb-3">
              <label for="taskDescription" class="form-label">Description</label>
              <textarea id="taskDescription" onChange={(e) => setTask({ ...task, desc: e.target.value })} class="form-control" rows="3" placeholder="Enter task details"></textarea>
            </div>


            <div class="mb-3">
              <label for="dueDate" class="form-label">Due Date</label>
              <input type="date" onChange={(e) => setTask({ ...task, date: e.target.value })} id="dueDate" class="form-control" />
            </div>

            <div class="mb-3">
              <label for="taskStatus" class="form-label">Status</label>
              <select id="taskStatus" onChange={(e) => setTask({ ...task, status: e.target.value })} class="form-select">
                <option value="pending" defaultValue={"pending"}>Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
        </Modal.Footer>
      </Modal>










    </>
  )
}

export default Add