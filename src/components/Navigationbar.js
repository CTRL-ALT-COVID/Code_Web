import React from'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar{
		background-color : #222;
	}

	.navbar-brand, .navbar-nav .nav-link{
		color : #FFFFFF;

	&:hover{
		color : white;
	}	
	}
`;

export const NavigationBar = () => (

	<Styles>
		<Navbar expand="lg">
			<Navbar.Brand href="/">CTRL+ALT+COVID</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
			<Nav className = "ml-auto">
			<Nav.Item><Nav.Link href="/">Home </Nav.Link></Nav.Item>
			<Nav.Item><Nav.Link href="/Doctor">Doctor </Nav.Link></Nav.Item>
			<Nav.Item><Nav.Link href="/Patients">Patients </Nav.Link></Nav.Item>
			<Nav.Item><Nav.Link href="/Awareness">Awareness </Nav.Link></Nav.Item>
			</Nav>
			</Navbar.Collapse>
		</Navbar>
	</Styles>

	)
