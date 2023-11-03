import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkAllInputs()) {
            // Make API call to register the user

            // Reset the form fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            // Show success toast notification
            toast.success('Registration successful!', {
                position: toast.POSITION.TOP_RIGHT,
            });


        } else {
            if(firstName === ''){
                toast.error('Please fill First Name input.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            else if(lastName === ''){
                toast.error('Please fill Last Name input.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            else if (email == ''){
                toast.error('Please fill email input.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else if(password == ''){
                toast.error('Please fill password input', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else {
                toast.error('Please fill in all the input fields.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    };

    const checkAllInputs = () => {
        return firstName !== '' && lastName !== '' && email !== '' && password !== '';
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Registration form</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstname">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstname"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;
