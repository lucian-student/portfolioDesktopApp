import React, { Fragment, useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Containter from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/main/projectCard';
import getProjects from '../queries/project/getProjects';
import axios from 'axios';
function Main() {
    const [projects, setProjects] = useState(null);
    const source = useRef(axios.CancelToken.source());

    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            if (cancelToken) {
                cancelToken.cancel('canceled get projects');
            }
        }
    }, []);

    useEffect(() => {
        const reciveData = async () => {
            await getProjects(setProjects, source.current);
        }

        reciveData();
    }, []);
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
                    {projects && (
                        <Containter>
                            {projects.map((project) => (
                                <Row key={project.project_id} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                    <ProjectCard project={project} />
                                </Row>
                            ))}
                        </Containter>
                    )}
                </Row>
            </Containter>
        </Fragment>
    )
}


export default Main;