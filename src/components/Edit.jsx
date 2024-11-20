import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { editTaskApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { editTaskResponseContext } from '../Context/Contextapi';



function Edit({ tasks }) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { editResponse, setEditResponse } = useContext(editTaskResponseContext)



  const [data, setData] = useState({ ...tasks })
  const handleEdit = async () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`,
    };

    const body = {
      tid: data.tid,
      title: data.title,
      desc: data.desc,
      date: data.date,
      status: data.status,
    };

    try {
      const res = await editTaskApi(body, tasks._id, header);
      if (res.status === 200) {
        toast.success("Task updated!");
        handleClose()
        setEditResponse(res)

      } else {
        toast.warning("Update failed!");
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.error(error);
    }
  };



  const formatDate = (date) => {
    if (date) {
      const formattedDate = new Date(date).toISOString().split('T')[0]; // Format: YYYY-MM-DD
      return formattedDate;
    }
    return '';
  };





  return (
    <>


      <button class="btn btn-success btn-sm me-2" onClick={handleShow}>
        <i class="fa-solid fa-pen-to-square me-2"></i>
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="mb-3">
              <label for="taskId" class="form-label">Task ID</label>
              <input type="text" defaultValue={tasks?.tid} onChange={(e) => setData({ ...data, tid: e.target.value })} id="taskId" class="form-control" placeholder="Enter a unique task ID" required />
            </div>
            <div class="mb-3">
              <label for="taskTitle" class="form-label">Task Title</label>
              <input type="text" defaultValue={tasks?.title} onChange={(e) => setData({ ...data, title: e.target.value })} id="taskTitle" class="form-control" placeholder="Enter task title" required />
            </div>

            <div class="mb-3">
              <label for="taskDescription" class="form-label">Description</label>
              <textarea id="taskDescription" defaultValue={tasks?.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} class="form-control" rows="3" placeholder="Enter task details"></textarea>
            </div>


            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                defaultValue={formatDate(tasks?.date)} // Format date correctly
                onChange={(e) => setData({ ...data, date: e.target.value })}
                id="dueDate"
                className="form-control"
              />
            </div>

            <div class="mb-3">
              <label for="taskStatus" class="form-label">Status</label>
              <select id="taskStatus" defaultValue={tasks?.status} onChange={(e) => setData({ ...data, status: e.target.value })} class="form-select">
                <option value="pending">Pending</option>
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
          <Button variant="primary" onClick={handleEdit}>Update Task</Button>
        </Modal.Footer>
      </Modal>





    </>
  )
}

export default Edit