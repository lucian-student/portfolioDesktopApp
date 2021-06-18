import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProjectCard({ project: { project_id, name, data } }) {
    const image = btoa(new Uint8Array(data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
    console.log(data);
    return (
        <Fragment>
            <Card>
                <Container>
                    <Row>
                        <Card.Header style={{ textAlign: 'center' }}>
                            {name}
                        </Card.Header>
                    </Row>
                    <Card.Body>
                        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {image && (
                                <img src={`data:image/png;base64,${image}`} alt="" style={{ width: 'auto', height: '5rem' }} />
                            )}
                        </Row>
                    </Card.Body>
                </Container>
            </Card>
        </Fragment>
    )
}

export default ProjectCard;

