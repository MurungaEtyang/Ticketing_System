import axios from 'axios';

// Function to handle login API
export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { email, password });
        // Handle the response from the login API
        console.log(response.data);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
    }
};

// Function to handle handleApi API
export const handleRegistration = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
        const response = await axios.post('/api/registration', { firstname, lastname, email, password });
        console.log(response.data);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
    }
};

// Function to handle verification API
export const handleVerification = async (verificationCode: string) => {
    try {
        const response = await axios.post('/api/verification', { verificationCode });
        // Handle the response from the verification API
        console.log(response.data);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
    }
};

// Function to handle booking ticket API
export const handleBookTicket = async (title: string, description: string) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/tickets', { title, description });
        // Handle the response from the book ticket API
        console.log(response.data);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
    }
};