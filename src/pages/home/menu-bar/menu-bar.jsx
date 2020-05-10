import React from 'react';
import './menu-bar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const MenuBar = () => (
    <div>
        <Navbar bg="light" expand="lg"  sticky="top">
            <Navbar.Brand href="#home">CRack COVID19</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ">
                <Nav.Link href="#home">Doctors</Nav.Link>
                <Nav.Link href="#link">Patients</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default MenuBar;