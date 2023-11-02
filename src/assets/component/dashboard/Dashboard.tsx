import React from 'react';

const Dashboard: React.FC = () => {
    const handleBookTicket = () => {
        // Handle the book ticket action
    //     handle api from backend
    };

    const handleProfile = () => {
        // Handle the profile action
    //     handle profile username api from backend
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Dashboard</h3>
                            <div className="button-group">
                                <nav>
                                    <button className="btn btn-primary" onClick={handleBookTicket}>
                                        Book Ticket
                                    </button>
                                    <button className="btn btn-primary" onClick={handleProfile}>
                                        Profile
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
