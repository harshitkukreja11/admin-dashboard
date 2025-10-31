import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';


export default function AppNavbar(){
const dispatch = useDispatch();
return (
<Navbar bg="light" expand="lg" className="border-bottom">
<Container fluid>
<Navbar.Brand href="/">Admin</Navbar.Brand>
<Navbar.Toggle />
<Navbar.Collapse className="justify-content-end">
<Nav>
<NavDropdown title="Account" id="acc">
<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item onClick={()=>dispatch(logout())}>Logout</NavDropdown.Item>
</NavDropdown>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
);
}