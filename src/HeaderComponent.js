import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron, NavbarToggler,
    Collapse, NavItem, Nav, Button, Modal, ModalHeader, 
    ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    state = {
        isNavOpen: false,
        isModalOpen: false
    }
    togglerNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    togglerModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogin = (e) => {
        e.preventDefault();
        alert(`Username ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.togglerModal();
    }
    render(){
        return(
            <>
                <Jumbotron fluid>
                    <div className="row">
                        <div className="row">
                            <div className="col">
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src="/assets/images/logo.png" height="30" width="30" alt="NuCamp Logo"></img></NavbarBrand>
                        <NavbarToggler onClick={this.togglerNav}/>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <i className="fa fa-home fa-lg"/> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/directory">
                                        <i className="fa fa-home fa-lg"/> Directory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <i className="fa fa-home fa-lg"/> About
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <i className="fa fa-home fa-lg"/> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <span className="navbar-text ml-auto">
                                <Button outline onClick={this.togglerModal}><i className="fa fa-sign-in fa-lg"/>Login</Button>
                            </span>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen}  toggle={() => this.togglerModal()}>
                    <ModalHeader toggle={() => this.togglerModal()}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.handleLogin(e)}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => this.password = input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label Check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input}/>Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
export default Header;