import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import isFileImage from '../../validators/isFileImage';
import { Fragment } from 'react';
import axios from 'axios';
import updateProject from '../../queries/project/updateProject';
function ProjectEditForm({ project: { project_id, name, description_eng, description_cz, github_url, project_url, data, setProject } }) {
    const source = useRef(axios.CancelToken.source());
    const [currImage, setCurrImage] = useState(null);
    const [image, setImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const previewImage = watch('image');

    useEffect(() => {
        const cancelToken = source.current;

        return () => {
            cancelToken.cancel('Canceled update project');
        }
    }, []);
    useEffect(() => {
        if (data) {
            setCurrImage(btoa(new Uint8Array(data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')));
        }
    }, []);

    useEffect(() => {
        if (previewImage) {
            if (previewImage[0]) {
                const file = previewImage[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    setImage([reader.result]);
                }
            } else {
                setImage(null);
            }
        } else {
            setImage(null);
        }
    }, [previewImage]);

    async function handleData(form_data) {
        await updateProject(setCurrImage, setProject, project_id, removeImage, form_data, source);
    }

    return (
        <Form onSubmit={handleSubmit(handleData)}>
            <Container fluid='lg ' style={{ maxWidth: '100%' }}>
                <Row>
                    <Form.Group controlId="formGroupUsername" style={{ width: '100%' }}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control autoComplete="on"
                            name='name'
                            type="text"
                            defaultValue={name}
                            placeholder="Name project"
                            {...register('name', {
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                            })} />
                        {errors.name && errors.name.type === "required" && (
                            <Form.Text className="helperText">Name is empty!</Form.Text >
                        )}
                        {errors.name && errors.name.type === "minLength" && (
                            <Form.Text className="helperText">Name has to be atleast 3 chars long!</Form.Text >
                        )}
                        {errors.name && errors.name.type === "maxLength" && (
                            <Form.Text className="helperText">Name cannot be longer than 20 characters!</Form.Text >
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ width: '100%' }}>
                        <Form.Label>Description English</Form.Label>
                        <Form.Control as="textarea" rows={3} style={{ width: '100%' }}
                            autoComplete="on"
                            name='description_eng'
                            defaultValue={description_eng}
                            type="text"
                            placeholder="Description English"
                            {...register('description_eng', {
                                required: true
                            })} />
                        {errors.description && errors.description.type === "required" && (
                            <Form.Text className="helperText">Description is empty!</Form.Text >
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ width: '100%' }}>
                        <Form.Label>Description Czech</Form.Label>
                        <Form.Control as="textarea" rows={3} style={{ width: '100%' }}
                            autoComplete="on"
                            name='description_cz'
                            defaultValue={description_cz}
                            type="text"
                            placeholder="Description Czech"
                            {...register('description_cz', {
                                required: true
                            })} />
                        {errors.description && errors.description.type === "required" && (
                            <Form.Text className="helperText">Description is empty!</Form.Text >
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ width: '100%' }}>
                        <Form.Label>Github url</Form.Label>
                        <Form.Control autoComplete="on"
                            name='github_url'
                            defaultValue={github_url}
                            type="text"
                            placeholder="Github url"
                            {...register('github_url', {})} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ width: '100%' }}>
                        <Form.Label>Project url</Form.Label>
                        <Form.Control autoComplete="on"
                            name='project_url'
                            defaultValue={project_url}
                            type="text"
                            placeholder="Project url"
                            {...register('project_url', {})} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ width: '100%' }}>
                        <Form.Label>Add Image</Form.Label>
                        <Form.File name='image'
                            //multiple={true}
                            encType='multipart/form-data'
                            {...register('image', {
                                validate: {
                                    isImage: value => isFileImage(value, image)
                                }
                            })} />
                        {errors.image && errors.image.type === "isImage" && (
                            <Form.Text className="helperText">File isnt image!</Form.Text >
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    {!image && (
                        <Button variant='light'
                            style={{ width: '100%' }}
                            onClick={() => { setRemoveImage(old => { return !old }) }}>
                            <Fragment>
                                {removeImage ? (
                                    <Fragment>
                                        Cancel
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        Remove image
                                    </Fragment>
                                )}
                            </Fragment>
                        </Button>
                    )}
                </Row>
                <Row>
                    {(currImage && !image && !removeImage) && (
                        <img src={`data:image/png;base64,${currImage}`} alt={'previewImage1'} style={{ width: '100%', height: 'auto' }} />
                    )}
                    {image && (
                        <img src={image} alt={'previewImage2'} style={{ width: '100%', height: 'auto' }} />
                    )}
                </Row>
                <Row>
                    <Button type='submit' variant='light'
                        style={{ width: '100%' }}>
                        Save project
                    </Button>
                </Row>
            </Container>
        </Form >
    )
}

export default ProjectEditForm;