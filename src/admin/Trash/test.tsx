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


const DepartmentAssignTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);

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

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Handle success
            toast.success('Ticket assigned successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAssignTo('');
            setPriority('');
            setDeadline(null);
            setIsLoading(false);
            alert(deadline)
        } catch (error) {
            // Handle error
            toast.error('Error assigning ticket', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsLoading(false);
        }
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
                        <option value="John">John</option>
                        <option value="Jane">Jane</option>
                        <option value="Doe">Doe</option>
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
