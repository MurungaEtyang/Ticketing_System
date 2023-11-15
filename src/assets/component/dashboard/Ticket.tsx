import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import '../stylesheeet/ticket.css';
import { handleBookTicket } from '../api/HandleApiFromBackend';

interface TicketProps {
    setNotificationMessage: (message: string) => void;
}

const Ticket: React.FC<TicketProps> = ({ setNotificationMessage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title === '' || description === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        try {
            setLoading(true);

            // Make API call to submit the ticket

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('attachment', attachment);

            await fetch('http://localhost:8080/api/v1/tickets', {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
                .then((response) => {
                    // Show success toast notification
                    toast.success('Ticket submitted successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    // Set the notification message
                    setNotificationMessage('Message has been sent');
                })
                .catch((error) => toast.error(error.message));

            // Reset the form fields
            setTitle('');
            setDescription('');
        } catch (error) {
            alert(error.value);
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
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
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
                                    <label htmlFor="title">Title*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description*</label>
                                    <textarea
                                        className="form-control-text"
                                        id="description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        ref={descriptionRef}
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="attachment">Upload File</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="attachment"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {imageUrl && (
                                    <div className="uploaded-image-container">
                                        <img src={imageUrl} alt="Uploaded File" className="uploaded-image" />
                                    </div>
                                )}
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