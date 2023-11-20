import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const authorize = 'Basic ' + localStorage.getItem('email_password_credentials');
const contentType = 'application/x-www-form-urlencoded';

export const RegisterApi = (email: string, password: string) => {4
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://localhost:8080/api/v1/users/registration/register", {
        method: 'POST',
        headers: {
            'Content-Type': contentType,
            Authorization: authorize
        },
        body: formData
    }).then(response => {
        alert(response);
        navigate('/verification', { state: { email } });
    });
};