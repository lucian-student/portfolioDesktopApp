import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import isFileImage from '../validators/isFileImage';
import saveProject from '../queries/project/saveProject';
import axios from 'axios';

function ProjectForm() {
    const source = useRef(axios.CancelToken.source());
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const previewImage = watch('image');
    const [image, setImage] = useState(null);
    // [result, setResult] = useState(null);

    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            if (cancelToken) {
                cancelToken.cancel('canceled login');
            }
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



    async function handleData(data) {
        // console.log(data.image[0]);
        await saveProject(data, source.current);
        //console.log(data);
    }
    return (
        <Fragment >
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Form onSubmit={handleSubmit(handleData)}>
                        <Container fluid='lg ' style={{ maxWidth: '100%' }}>
                            <Row>
                                <Form.Group controlId="formGroupUsername" style={{ width: '100%' }}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control autoComplete="on"
                                        name='name'
                                        type="text"
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
                                {image && (
                                    <img src={image} alt={'previewImage'} style={{ width: '100%', height: 'auto' }} />
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
                </div>
            </div>
        </Fragment >
    )
}

export default ProjectForm;


/*
 <Row>
                                {result && (
                                   <img src={`data:image/png;base64,${result}`} alt="" style={{ width: '100%', height: 'auto' }}/>
                                )}
                            </Row>
*/