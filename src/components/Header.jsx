import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../Context/TokenContext';

function Header() {
  const nav = useNavigate();
  const { tokenStatus, setTokenStatus } = useContext(tokenContext);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.error('User Logged out!!');
    setTokenStatus(false);
    nav('/');
  };

  return (
    <>
      <Navbar className="bg-body-tertiary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-diagram-project fa-lg" />
            {' '}Task Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* LOGOUT Button */}
              <button className="btn btn-danger" onClick={handleLogout}>
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                LOGOUT</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
