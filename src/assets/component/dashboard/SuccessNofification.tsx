import { useEffect, useState } from 'react';

interface DashboardProps {
    message: string;
}

const SuccessNotification: React.FC<DashboardProps> = ({ message }) = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetchMessageFromBackend();
    }, []);

    const fetchMessageFromBackend = async () => {
        try {
            const response = await fetch('/api/notification');
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error fetching message from backend:', error);
        }
    };

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default SuccessNotification;