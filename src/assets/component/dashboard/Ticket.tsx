import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import '../stylesheeet/ticket.css';

const Ticket = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const descriptionRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title === '' || description === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        try {
            setLoading(true); // Set loading state to true

            // const ticket = {
            //     title,
            //     description,
            // };
            //
            // // Make API call to submit the ticket
            // const response = await axios.post('http://localhost:3000/api/tickets', ticket);
            //
            // // Reset the form fields
            // setTitle('');
            // setDescription('');

            // Show success toast notification
            toast.success('Ticket submitted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });

            // Do something with the response data
            console.log(response.data);
        } catch (error: any) {
            // Display specific error message based on the type of error
            if (error.response) {
                // The request was made and the server responded with a status code
                toast.error(`Request failed with status ${error.response.status}`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No response received from the server', {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                // Something happened in setting up the request that triggered an error
                toast.error('An error occurred while submitting the ticket', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }

            // Log the error to the console
            console.error(error);
        } finally {
            setLoading(false);
        }


    };

    const override = css`
        display: block;
        margin: 0 auto;
    `;

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        // Automatically adjust the height of the textarea
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Ticket</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control-text"
                                        id="description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        ref={descriptionRef} // Assign the ref to the textarea
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? (
                                        <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                                    ) : (
                                        'Submit'
                                    )}
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

export default Ticket;
export const ToastNotificationTicket = () => {
    return <ToastContainer />;
};
