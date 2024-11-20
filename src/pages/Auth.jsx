import React, { useState, useContext } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApi';
import { tokenContext } from '../Context/TokenContext';
import Footer from '../components/Footer';

function Auth() {
    const { tokenStatus, setTokenStatus } = useContext(tokenContext);
    const [authStatus, setAuthStatus] = useState(false);
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const nav = useNavigate();

    const changeStatus = () => {
        setAuthStatus(!authStatus);
        setUser({ email: '', username: '', password: '' });
    };

    const handleRegister = async () => {
        const { email, username, password } = user;
        if (!email || !username || !password) {
            toast.error('Enter valid data!!');
        } else {
            const res = await registerApi(user);
            if (res.status === 200) {
                toast.success('Registration successful!!');
                changeStatus();
            } else {
                toast.error('Registration failed!!');
            }
        }
    };

    const handleLogin = async () => {
        const { email, password } = user;
        if (!email || !password) {
            toast.warning('Enter valid inputs!!');
        } else {
            const res = await loginApi(user);
            if (res.status === 200) {
                toast.success('Login successful!!');
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('username', res.data.username);
                setTokenStatus(true);
                nav('/dash');
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="row w-100 mx-auto" style={{ maxWidth: '1100px' }}>
                    <div
                        className="col-12 col-lg-6 d-flex justify-content-center align-items-center mb-4 mb-lg-0"
                        style={{ padding: '20px' }}
                    >
                        <img
                            src={
                                authStatus
                                    ? 'https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg'
                                    : 'https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg'
                            }
                            alt=""
                            className="img-fluid"
                            style={{ maxHeight: '400px' }}
                        />
                    </div>

                    <div className="col-12 col-lg-6 p-4">
                        <h2 className="text-center mb-4">{authStatus ? 'Register' : 'Login'}</h2>
                        <div className="my-3">
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control
                                    type="email"
                                    value={user.email}
                                    placeholder="name@example.com"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </FloatingLabel>

                            {authStatus && (
                                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={user.username}
                                        placeholder="Name"
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                </FloatingLabel>
                            )}

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    value={user.password}
                                    placeholder="Password"
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </FloatingLabel>
                        </div>

                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                            <button
                                className={`btn ${authStatus ? 'btn-primary' : 'btn-info'} w-100 mb-3 mb-lg-0`}
                                onClick={authStatus ? handleRegister : handleLogin}
                            >
                                {authStatus ? 'Register' : 'Login'}
                            </button>
                            <button className="btn btn-link" onClick={changeStatus}>
                                {authStatus ? 'Existing user?' : 'Not a user?'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>


        </>
    )
}

export default Auth;
