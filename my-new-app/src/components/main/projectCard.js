import React, { Fragment, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function ProjectCard({ project: { project_id, name, data, description, github_url, project_url } }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (data) {
            setImage(btoa(new Uint8Array(data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')));
        }
    }, []);
    return (
        <Fragment>
            <Card>
                <Container>
                    <Row>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Card.Title>
                                {name}
                            </Card.Title>
                            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                as={Link} to={`/project_page/${project_id}`}>
                                <AiFillEdit />
                            </Button>
                        </Card.Header>
                    </Row>
                    <Card.Body>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            {image && (
                                <img src={`data:image/png;base64,${image}`} alt="" style={{ width: 'auto', height: '5rem' }} />
                            )}
                        </Row>
                    </Card.Body>
                </Container>
            </Card>
        </Fragment >
    )
}

export default ProjectCard;

