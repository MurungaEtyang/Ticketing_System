import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Verification = () => {
    const [Verification, setVerification] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkCode()){
            //  make api call to register the users
            setVerification('');
            toast.success("Verification code inserted successfully", {
                position: toast.POSITION.TOP_LEFT
            })

        }else{
            toast.error("Verification code is required.", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const checkCode = () => {
        return Verification !== '';
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Registration form</h3>
                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={Verification}
                                        onChange={(e) => setVerification(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Verify
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
export default Verification;