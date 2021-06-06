import React, { useRef } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/form.css';
function Login() {
    let btnRef = useRef();
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleLogin(data) {

    }
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Form onSubmit={handleSubmit(handleLogin)}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control autoComplete="on"
                                name='email'
                                type="email"
                                placeholder="Enter email"
                                {...register('email', {
                                    pattern: regEx,
                                    required: true
                                })}
                            />
                            {errors.email && errors.email.type === "pattern" && (
                                <Form.Text className="helperText">Email has to be valid!</Form.Text>
                            )}
                            {errors.email && errors.email.type === "required" && (
                                <Form.Text className="helperText">Email is empty!</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="off"
                                name='password'
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: true,
                                    minLength: 8
                                })} />
                            {errors.password && errors.password.type === "required" && (
                                <Form.Text className="helperText">Password is empty!</Form.Text>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <Form.Text className="helperText">Password has to be atleast 8 chars long!</Form.Text>
                            )}
                        </Form.Group>
                        <Button type='submit'
                            className='submitButton'
                            variant="secondary"
                            ref={btnRef}
                            onClick={() => {

                            }} >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;