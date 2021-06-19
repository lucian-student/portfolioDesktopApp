import React, { Fragment, useEffect, useState, useRef } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import getProject from '../queries/project/getProject';
import axios from 'axios';
import ProjectEditForm from '../components/projectPage/projectEditForm';
import ProjectDisplay from '../components/projectPage/projectDisplay';
import Button from 'react-bootstrap/Button';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import deleteProject from '../queries/project/deleteProject';


function ProjectPage(props) {
    const project_id = props.match.params.project_id;
    const [project, setProject] = useState(null);
    const source = useRef(axios.CancelToken.source());
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        const cancelToken = source.current;

        return () => {
            cancelToken.cancel('Canceled get project');
        }
    }, [])
    useEffect(() => {
        const reciveData = async () => {
            await getProject(project_id, setProject, source.current);
        }
        reciveData();
    }, []);

    async function handleDelete() {
        await deleteProject(setDeleted, source.current, project_id);
    }

    if (deleted) {
        return (
            <Redirect to='/main' />
        );
    }
    return (
        <Fragment>
            {project && (
                <Container>
                    <Row>
                        <Button onClick={() => setEditing(old => { return !old })}
                            style={{ width: '50%' }}>
                            <AiFillEdit />
                        </Button>
                        <Button onClick={handleDelete}
                            style={{ width: '50%' }}>
                            <AiFillDelete />
                        </Button>
                    </Row>
                    {!editing ? (
                        <Row>
                            <ProjectDisplay project={project} />
                        </Row>
                    ) : (
                        <Row>
                            <ProjectEditForm project={{ ...project, setProject }} />
                        </Row>
                    )}
                </Container>
            )}
        </Fragment>
    )
}


export default withRouter(ProjectPage);