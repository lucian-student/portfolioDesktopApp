import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillProject } from 'react-icons/ai';
//const { shell } = window.require('electron');


function ProjectDisplay({ project: { project_id, name, description_eng, description_cz, github_url, project_url, data } }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (data) {
            setImage(btoa(new Uint8Array(data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')));
        }
    }, []);

    return (
        <Card style={{ backgroundColor: 'blanchbalmond' }}>
            <Container>
                <Row>
                    <Card.Title>
                        {name}
                    </Card.Title>
                </Row>
                <Row>
                    <Card.Subtitle>
                        Description English
                    </Card.Subtitle>
                </Row>
                <Row>
                    <Card.Text>
                        {description_eng}
                    </Card.Text>
                </Row>
                <Row>
                    <Card.Subtitle>
                        Description Czech
                    </Card.Subtitle>
                </Row>
                <Row>
                    <Card.Text>
                        {description_cz}
                    </Card.Text>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {image && (
                        <img src={`data:image/png;base64,${image}`} alt="main_image" className='main_image' />
                    )}
                </Row>
                <Row>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <a style={{ textDecoration: 'none' }}
                            href={`${github_url}`} target='_blank'>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <AiFillGithub /> <div>Github</div>
                            </div>
                        </a>
                        <a style={{ textDecoration: 'none' }}
                            href={`${project_url}`} target='_blank'>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <AiFillProject />
                                <div>Project</div>
                            </div>
                        </a>
                    </div>
                </Row>
            </Container>
        </Card>
    )
}

export default ProjectDisplay;