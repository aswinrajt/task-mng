import React, { useState, useEffect, useContext } from 'react';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { deleteTaskApi, getTaskApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { addtaskResponseContext, editTaskResponseContext } from '../Context/Contextapi';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  const [data, setData] = useState([]);
  const { addResponse, setAddResponse } = useContext(addtaskResponseContext);
  const { editResponse, setEditResponse } = useContext(editTaskResponseContext);
  const [searchKey, setSearchKey] = useState('');

  // For refreshing
  useEffect(() => {
    getData();
  }, [addResponse, editResponse, searchKey]);

  // For fetching data
  const getData = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    };
    const res = await getTaskApi(header, searchKey);
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.log(res);
    }
  };

  // Function for deletion
  const handleDelete = async (id) => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    };
    const res = await deleteTaskApi(id, header);
    if (res.status === 200) {
      toast.success('Task deleted!');
      getData();
    } else {
      toast.error('Something went wrong!');
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
   <>
      <div className="container my-4">
        <Header />
        <div className="d-flex flex-column flex-md-row justify-content-between mb-4 mt-4">
          <Add />
          <div className="d-flex flex-column mt-3 mt-md-0">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Task Title to Search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
  
        <main className="card shadow-sm p-4">
          <section>
            <h2 className="h4 mb-4 text-secondary">Your Tasks</h2>
            <div className="row g-3">
              {data?.length > 0 ? (
                <>
                  {data?.map((item) => (
                    <div className="col-12 col-sm-6 col-md-4" key={item._id}>
                      <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="card-title mb-0">{item.title}</h5>
                          <span className="badge bg-primary">Task Id: {item.tid}</span>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            <strong>Description:</strong> {item.desc}
                          </p>
                          <p className="card-text">
                            <strong>Due Date:</strong> {formatDate(item.date)}
                          </p>
                          <p className="card-text">
                            <strong>Status:</strong> <span className="text-warning">{item.status}</span>
                          </p>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                          <Edit tasks={item} />
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                            <i class="fa-solid fa-trash me-2"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h1>No Tasks Added!</h1>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer/>

   </>

  );
}

export default Dashboard;
