import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/menu.css';
/*
Navigace aplikace
*/
function Menu() {
    const { admin, logout } = useContext(AuthContext);
    return (
        <Container className='menuContainer'>
            <Row>
                <Col >
                    {admin && (
                        <Nav variant="pills" defaultActiveKey={`/main`} >
                            <Nav.Item >
                                <Nav.Link eventKey='/main' as={Link} to='/main'>
                                    Main
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}
                </Col>
                <Col>
                    <Nav variant="pills" defaultActiveKey={`/`} style={{ float: 'right' }}>
                        {!admin ? (
                            <Fragment>
                                <Nav.Item >
                                    <Nav.Link eventKey='/' as={Link} to='/'>
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                            </Fragment>
                        ) : (
                            <Nav.Item >
                                <Button variant='light' style={{ color: 'black !important', backgroundColor: 'white !important' }}
                                    onClick={logout}>
                                    Logout
                                </Button>
                            </Nav.Item>
                        )}
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Menu;

