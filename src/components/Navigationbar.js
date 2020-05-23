import React from'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { auth } from '../firebase/firebase.utils';

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

const NavigationBar = ({ currentUser }) => (

	<Styles>
		<Navbar expand="lg">
			<Navbar.Brand href="/">CTRL+ALT+COVID</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className = "ml-auto">
				{currentUser ? (
					<Nav.Item><Nav.Link href='/dashboard'>
					Dashboard
					</Nav.Link></Nav.Item>
					) : (
						<Nav.Item><Nav.Link href='/'>Home</Nav.Link></Nav.Item>
					)}
					<Nav.Item><Nav.Link href="/Doctor">Doctor </Nav.Link></Nav.Item>
					<Nav.Item><Nav.Link href="/Patients">Patients </Nav.Link></Nav.Item>
					<Nav.Item><Nav.Link href="/Awareness">Awareness </Nav.Link></Nav.Item>
					{currentUser ? (
					<Nav.Item><Nav.Link onClick={() => auth.signOut()}>
					Sign Out
					</Nav.Link></Nav.Item>
					) : (
						<Nav.Item><Nav.Link href='/'>Sign IN</Nav.Link></Nav.Item>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</Styles>

	);


const mapStateToProps = state => ({
	currentUser: state.user.currentUser
	});
	
export default connect(mapStateToProps)(NavigationBar);
