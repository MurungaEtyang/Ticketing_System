import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import '../../stylesheeet/ticket.css';
import '../../stylesheeet/ticket-mobile.css';
// import { Readable } from 'stream'
import Select from "react-select";


interface TicketProps {
    setNotificationMessage: (message: string) => void;
}

const Ticket: React.FC<TicketProps> = ({ setNotificationMessage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');
    const [uploadedFile, setFile] = useState<FileList>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [department, setDepartment] = useState<{ label: string; value: string } | null>(null); // Change department state type
    const [departments, setDepartments] = useState<string[]>([]);
    const [ftp, setFtp] = useState<File | undefined>(undefined);
    const navigate = useNavigate()
    let attachments = null;

    // let ftp: File | undefined;

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        setFile(file);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (title === '' || description === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        // if (!ftp) {
        //     toast.error('Please select a file to upload.', {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //     });
        //     return;
        // }

            setLoading(true);

        //     let attach = document.querySelector('#attachment');
        //     const formData1 = new FormData();
        //
        // const formData = new FormData();
        // /*formData.append('department', department?.label || '');
        // formData.append('title', title);
        // formData.append('description', description);*/
        // formData.append('attachment', imageUrl);

            // console.log('Selected file:', ftp);
        const formData = new FormData();



        console.log(uploadedFile);
        // alert(department?.label || '')
            await fetch('http://localhost:8080/api/v1/tickets?department=' + department?.label +
                '&title='+ title + '&description=' + description, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=----123',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
                // body: formData,
            }).then(response => {
                // alert('hello')
                if (response.ok) {
                    // Show success toast notification
                    toast.success('Ticket submitted successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    // Set the notification message
                    setNotificationMessage('Message has been sent');
                } else {
                    console.log(response.status);
                }
            }).catch(error => {
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }).finally(() => {
                setLoading(false);
            });

    };


    const override = css`
        display: block;
        margin: 0 auto;
    `;

    const data = btoa("kamar254baraka@gmail.com:admin");
    localStorage.setItem('owner', data);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/departments/all', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('owner')
                }
            });
            const data = await response.json();
            const departmentOptions = data.map((dept: { departmentName: string }) => ({
                value: dept.departmentName,
                label: dept.departmentName,
            }));
            setDepartments(departmentOptions);
        } catch (error) {
            toast.error('Failed to fetch departments. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    };

    const openMyTickets = () => {
        navigate('./dashboard/my-tickets')
    }


    return (
        <>
            <div className="ticket-card-body-ticket">
                <h3 className="ticket-card-title">Book ticket</h3>
                <form onSubmit={handleSubmit} className="ticket-form-group-ticket">
                    <div className="ticket-form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="ticket-form-group">
                        <label htmlFor="description">Description*</label>
                        <textarea
                            className="message-description"
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            ref={descriptionRef}
                        ></textarea>
                    </div>

                    <div className="ticket-form-group-department">
                        <label htmlFor="department">Department *</label>
                        <Select
                            className="group-department"
                            required
                            options={departments}
                            value={department}
                            onChange={(selectedOption) => setDepartment(selectedOption)}
                            isSearchable
                        />
                    </div>

                    <div className="ticket-form-group-attachment">
                        <label htmlFor="attachment">Upload File</label>
                        <input
                            className="ticket-form-group-attachment"
                            type="file"
                            id="attachment"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/*{imageUrl && (*/}
                    {/*    <div className="uploaded-image-container">*/}
                    {/*        <img src={imageUrl} alt="Uploaded File" className="uploaded-image" />*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className={`button-layout-flex`}>
                        <button type="submit" disabled={loading} className={`ticket-submit-button`}>
                            {loading ? (
                                <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                            ) : (
                                'Raise Ticket'
                            )}
                        </button>
                        <button onClick={openMyTickets} className={`my-tickets-button `}>My Tickets</button>
                    </div>

                </form>

                <ToastContainer />
            </div>
        </>
    );
};

export default Ticket;
