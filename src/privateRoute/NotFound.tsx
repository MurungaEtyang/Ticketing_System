import React from 'react';
import { useNavigate } from 'react-router-dom'
const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const returnMainPage = () =>{

        navigate('/')

    }
    return (
        <div>
            <div className="card">
                <form>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <input type='submit' onClick = {returnMainPage} value='BACK'/>
                </form>
            </div>

        </div>
    );
};

export default NotFound;