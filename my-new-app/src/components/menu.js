import React, { Fragment, useContext } from 'react';
//import { AuthContext } from '../context/auth';
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
    //  const { currentUser, logout } = useContext(AuthContext);
    let pathname = '/';
    const currentUser = null;
    return (
        <Container className='menuContainer'>
            <Row>
                <Col xs={12} md={8}>
                    {currentUser && (
                        <Nav variant="pills" defaultActiveKey={`${pathname}`} >
                            <Nav.Item >
                                <Nav.Link eventKey='/Main' as={Link} to='/Main'>
                                    Your Recipes
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey='/IngredientsAndUtensils' as={Link} to='/IngredientsAndUtensils'>
                                    Ingredients And Utensils
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey='/SharedRecipes' as={Link} to='/SharedRecipes'>
                                    Shared Recipes
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    <Nav variant="pills" defaultActiveKey={`${pathname}`} style={{ float: 'right' }}>
                        {!currentUser ? (
                            <Fragment>
                                <Nav.Item >
                                    <Nav.Link eventKey='/' as={Link} to='/'>
                                        Login
                                            </Nav.Link>
                                </Nav.Item>
                            </Fragment>
                        ) : (
                            <Nav.Item >
                                <Button >
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

