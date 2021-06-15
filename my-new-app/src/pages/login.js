import React, { useRef, useContext, useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import loginAdmin from '../queries/admin/loginAdmin';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import '../css/form.css';
function Login() {
    let btnRef = useRef();
    const source = useRef(axios.CancelToken.source());
    const [loginErrors, setLoginErrors] = useState(null);
    const { setAdmin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            if (cancelToken) {
                cancelToken.cancel('canceled login');
            }
        }
    }, []);
    async function handleLogin(data) {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        const { name, password } = data;
        await loginAdmin(name, password, setAdmin, btnRef, source.current, setLoginErrors);
    }
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Form onSubmit={handleSubmit(handleLogin)}>
                    {loginErrors && (
                            <Form.Text className="helperText">{loginErrors}</Form.Text>
                        )}
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Admin name</Form.Label>
                            <Form.Control autoComplete="on"
                                name='name'
                                type="text"
                                placeholder="Enter admin name"
                                {...register('name', {
                                    required: true
                                })}
                            />
                            {errors.email && errors.email.type === "required" && (
                                <Form.Text className="helperText">Admin name is empty!</Form.Text>
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