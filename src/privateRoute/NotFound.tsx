import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const returnMainPage = () =>{

        navigate('/')

    }
    return (
        <div>
            <div className="not-found-card">
                <form className="not-found-form">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <input type='submit' onClick = {returnMainPage} value='BACK'/>
                </form>
            </div>

        </div>
    );
};

export default NotFound;