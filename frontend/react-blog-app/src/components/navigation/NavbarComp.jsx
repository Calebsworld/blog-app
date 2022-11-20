import React from 'react'


import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAddressCard, faBlog, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export const NavbarComp= () => {
  
    return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="light" expand="md" variant='light'>
          <Navbar.Brand as={NavLink} to={'/'} className='text-success'>Lele's Garden</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link as={NavLink} to={'/'} className='text-success ms-1'>
                  <FontAwesomeIcon icon={faHouse} className='me-1' />
                Home
                </Nav.Link>
                <Nav.Link as={NavLink} to={'/about'} className='text-success ms-1'>
                  <FontAwesomeIcon icon={faAddressCard} className='me-1' />
                About 
                </Nav.Link>
                <Nav.Link as={NavLink} to={'/blogs'} className='text-success ms-1'>
                  <FontAwesomeIcon icon={faBlog} className='me-1' />  
                Blogs 
                </Nav.Link>
                <NavDropdown className='ms-1' title={<FontAwesomeIcon icon={faUser} className='me-1'/>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to={'/user/register'} >Create User Account</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={'/user/login'} >User Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" className='text-success'>View User Profile</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown className='ms-1' title={<FontAwesomeIcon icon={faLock} className='me-1'/>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to={'/admin/write'} >Admin Write Blog</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={'/admin/blogs'} >Admin Blogs</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">View Admin Profile</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
    );
  }

