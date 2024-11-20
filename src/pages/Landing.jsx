import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function Landing() {




  return (
    <>

      <section className='p-5 m-5'>
        <div className="w-100 bg-infold d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Row className="p-4">
            <Col className='d-flex justify-content-center flex-column'>
              <h2 className='text-dark text-center'>Task Manager</h2>
              <p style={{ textAlign: 'justify' }} className='text-dark'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga totam placeat facere architecto non, doloremque neque quos. Deserunt repudiandae dignissimos repellat vitae facilis. Minima dolorem adipisci itaque, iure unde beatae.</p>

              <Link className="btn btn-dark" to={"/auth"}>Let's Go</Link>
            </Col>
            <Col>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-web-developer-doing-research-on-development-illustration-download-in-svg-png-gif-file-formats--thinking-researching-and-pack-design-illustrations-4759504.png" alt="Landing" className='img-fluid rounded' /></Col>
          </Row>

        </div>
      </section>



    </>
  )
}

export default Landing