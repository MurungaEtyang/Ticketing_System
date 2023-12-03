import React, { useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const AcceptRefer: React.FC = () => {
    const [referralId, setReferralId] = useState("");
    const [acceptanceStatus, setAcceptanceStatus] = useState("Accept");
    const [isLoading, setIsLoading] = useState(false);

    const handleAcceptanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAcceptanceStatus(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const check = acceptanceStatus === "Accept"

        const apiEndpoint = 'http://localhost:8080/api/v1/tickets/referral?accept='+check +
        '&referral_id=' + referralId;

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Accepted.', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error('Rejected', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch(error => {
                toast.error('Wrong Id', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>User Acceptance Form</h2>
                <div>
                    <label htmlFor="reason">Referral Id:</label>
                    <input
                        type="text"
                        id="reason"
                        value={referralId}
                        onChange={(event) => setReferralId(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="acceptanceStatus">Acceptance Status:</label>
                    <select
                        required
                        id="acceptanceStatus"
                        value={acceptanceStatus}
                        onChange={handleAcceptanceChange}
                    >
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                    </select>
                </div>
                <button type="submit" className="assign-ticket-button" disabled={isLoading}>
                    {isLoading ? <BeatLoader color="#000000" size={30} /> : "Assign Ticket"}
                </button>
            </form>
        </div>
    );
};

export default AcceptRefer;
