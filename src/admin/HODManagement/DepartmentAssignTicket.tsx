import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/stylesheet/AssignTicket.css';
import moment from "moment";

const DepartmentAssignTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const ticketId = localStorage.getItem('ticket_number')
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);

    // alert(ticketId);

    useEffect(() => {
        // Fetch the Assign To options from the API endpoint
        const fetchAssignToOptions = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/tickets/referral/refer', {
                    method: "GET",
                    headers: {
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                    }
                }).then(response => response.json()).then(data => {
                    if(data){
                        // const data = response.json();
                        // const userNames = data.map((user: any) => user.members); // Specify the type of 'user' parameter
                        setAssignToOptions(data.members);
                        // console.log(data.members)
                    }else {
                        alert("")
                    }
                });
            } catch (error) {
                console.error('Error fetching Assign To options:', error);
            }
        };

        fetchAssignToOptions()
    }, []);

    const handleAssignToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(event.target.value);
    };

    const handleDeadlineChange = (date: Date | null) => {
        setDeadline(moment(date).format('DD/MM/YYYY'));
        // alert(moment(date).format('MM/DD/YYYY'))
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

            await fetch('http://localhost:8080/api/v1/tickets/assign?' +
                'ticket_number=' + encodeURIComponent(ticketId) +
                '&to=' + assignTo +
                '&priority=MEDIUM' +
                '&deadline=' + encodeURIComponent(deadline), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: JSON.stringify({
                    'ticketId': encodeURIComponent(ticketId),
                    'assignTo': assignTo,
                    'priority': 'MEDIUM',
                    'deadline': encodeURIComponent(deadline)

                })
            }).then(response => {
                if (response.ok) {
                    // console.log('Ticket assigned successfully');
                    toast.success('Ticket assigned successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setShowForm(false);
                } else {
                    toast.error('Error assigning ticket.', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setShowForm(false);
                }
            }).catch(() =>{
                toast.error('Error fetching ticket content', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setShowForm(false);
            })



        setIsLoading(false);
    };

    return (
        <section className="assign-ticket-container">
            <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="assignTo">Assign To:</label>
                        <select
                            id="assignTo"
                            value={assignTo}
                            onChange={handleAssignToChange}
                        >
                            <option value="">Select an Employee</option>
                            {assignToOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="priority">Priority</label>*/}
                    {/*    <select*/}
                    {/*        className="form-control"*/}
                    {/*        id="priority"*/}
                    {/*        value={priority}*/}
                    {/*        onChange={(e) => setPriority(e.target.value)}*/}
                    {/*    >*/}
                    {/*        <option value="">Select Priority</option>*/}
                    {/*        <option value="LOW">LOW</option>*/}
                    {/*        <option value="MEDIUM">MEDIUM</option>*/}
                    {/*        <option value="HIGH">HIGH</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div>
                        <div>
                            <label htmlFor="deadline">Deadline:</label>
                            <DatePicker
                                id="deadline"
                                value={deadline}
                                onChange={handleDeadlineChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"

                            />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <BeatLoader color="#000000" size={30}/>
                        ) : (
                            <>
                                <button onClick={handleSubmit} type="submit" className="assign-ticket-button">
                                    Assign Ticket
                                </button>
                            </>
                        )}
                    </div>
                </form>

            <ToastContainer/>
        </section>
    );
}
export default DepartmentAssignTicket;