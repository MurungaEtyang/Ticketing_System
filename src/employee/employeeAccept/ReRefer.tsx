import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../src/admin/assets/stylesheet/AssignTicket.css';
import '../../assets/component/stylesheeet/refer.css';

const ReRefer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const ticketId = sessionStorage.getItem('ticket_number')
    const [assignTo, setAssignTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {

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
                    }
                });
            } catch (error) {
                console.error('Error fetching Assign To options:', error);
            }
        };

        fetchAssignToOptions()
    }, []);

    const handleReferToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            await fetch('http://localhost:8080/api/v1/tickets/referral/refer?' +
                'ticket_number=' + encodeURIComponent(ticketId) +
                '&to=' + assignTo + '&reason='+ message, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: JSON.stringify({
                    'ticketId': encodeURIComponent(ticketId),
                    'assignTo': assignTo,
                })
            }).then(async response => {
                if (response.ok) {
                    // console.log('Ticket assigned successfully');
                    toast.success('Ticket Referred successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setShowForm(false);
                } else {
                    toast.error('Error Referred ticket.', {
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
        }catch{
            toast.error('Error fetching ticket content', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        setIsLoading(false);
    };

    return (
        <section className="assign-ticket-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Refer">Refer To:</label>
                    <select
                        id="assignTo"
                        value={assignTo}
                        onChange={handleReferToChange}
                    >
                        <option value="">Select an Employee</option>
                        {assignToOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </div>
                <div className={`refer-message`}>
                    <textarea
                        required
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    ></textarea>
                </div>


                {isLoading ? (
                    <BeatLoader color="#000000" size={30}/>
                ) : (
                    <button onClick={handleSubmit} type="submit" className={`my-tickets-button`}>
                        refer
                    </button>
                )}

            </form>

            <ToastContainer/>
        </section>
    );
}

export default ReRefer;