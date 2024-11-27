import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function Landing() {
  return (
    <section className="p-5">
      {/* Hero Section */}
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #141E30, #000000)',
          color: '#fff',
        }}
      >
        <Row className="p-4 w-100" style={{ maxWidth: '1200px' }}>
          {/* Text Section */}
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start"
            data-aos="fade-right"
          >
            <h1 className="fw-bold text-white" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
              Organize Your Tasks
            </h1>
            <p
              className="mt-3"
              style={{
                lineHeight: '1.8',
                fontSize: '1rem',
                padding: '0 10px',
                maxWidth: '500px',
              }}
            >
              Simplify your workflow and boost productivity with our powerful task manager.
              Stay on top of your goals, track your progress, and achieve more every day.
            </p>
            <Link
              className="btn btn-primary btn-lg mt-3"
              to="/auth"
              style={{
                backgroundColor: '#007BFF',
                border: 'none',
                padding: '10px 20px',
                fontSize: '1rem',
              }}
            >
              Get Started
            </Link>
          </Col>
          {/* Image Section */}
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center mt-4 mt-md-0"
            data-aos="fade-left"
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/male-web-developer-doing-research-on-development-illustration-download-in-svg-png-gif-file-formats--thinking-researching-and-pack-design-illustrations-4759504.png"
              alt="Landing"
              className="img-fluid"
              style={{
                maxHeight: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Landing;
