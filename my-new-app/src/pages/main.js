import React from 'react';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Containter from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
function Main() {
    return (
        <Fragment>
            <Containter>
                <Row>
                    <Button as={Link} to='/project_form' variant='light'
                        style={{ width: '100%' }}>
                        Add project
                    </Button>
                </Row>
                <Row>
                    Projects
                </Row>
            </Containter>
        </Fragment>
    )
}


export default Main;