import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import '../assets/stylesheet/AssignTicket.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DepartmentAssignTicket = (ticketId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);

    const handleAssignToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(event.target.value);
    };

    const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    };

    const handleDeadlineChange = (date: Date | null) => {
        setDeadline(moment(date).format('MM/DD/YYYY'));
        alert(moment(date).format('MM/DD/YYYY'))
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsLoading(true);


            await fetch('http://localhost:8080/api/v1/tickets/assign?id=' +
                ticketId + '&to=' + assignTo + '&priority=' + priority + '&deadline=' + deadline, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: JSON.stringify({
                    'ticketId': ticketId,
                    'assignTo': assignTo,
                    'priority': priority,
                    'deadline': deadline

                })
            }).then(response => {
                if (response.ok) {
                    // console.log('Ticket assigned successfully');
                    toast.success('Ticket assigned successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    // setShowForm(false);
                    // setCurrentForm('check');
                    // setIsLoading()
                } else {
                    toast.error('Error assigning ticket', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                }
            }).catch(() =>{
                toast.error('Error fetching ticket content', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }).finally(() => {
                setTicketId('');
                setAssignTo('');
                setPriority('');
                setDeadline(null);
                // setCurrentForm('check');
            });

            alert(ticketId);
            alert(deadline);


        setIsLoading(false);
    };

    return (
        <div className="assign-ticket-container">
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
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <input
                        required
                        type="text"
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    />
                </div>
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
                <div>
                    {isLoading ? (
                        <BeatLoader color="#000000" size={30} />
                    ) : (
                        <button
                            type="submit"
                            className="assign-ticket-button"
                            disabled={isLoading}
                        >
                            Assign Ticket
                        </button>
                    )}
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default DepartmentAssignTicket;
