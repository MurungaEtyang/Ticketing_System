import React, { Component } from 'react';
import './other-style.css';
import { FaPaperPlane } from 'react-icons/fa';

class ChatModal extends Component<void, any> {
    constructor(props) {
        super(props);
        alert(sessionStorage.getItem('ticket_sender'))

        //from tickets/AllsentTickets.tsx

        const storedMessages = sessionStorage.getItem('chatMessage');
        const initialMessages = storedMessages ? JSON.parse(storedMessages) : [];

        this.state = {
            messages: initialMessages,
            newMessage: '',
        };
    }

    generateRandomReply() {
        const replies = [
            'Thanks for reaching out!',
            "I'm glad the issue is resolved.",
            'How can I assist you further?',
            'Hello! How can I help you today?',
        ];
        const randomIndex = Math.floor(Math.random() * replies.length);
        return replies[randomIndex];
    }

    sendMessage = () => {
        const { newMessage, messages } = this.state;

        if (newMessage.trim() === '') {
            return;
        }

        const newMessages = [
            ...messages,
            { sender: 'evans', content: newMessage },
        ];

        setTimeout(() => {
            const reply = this.generateRandomReply();
            this.setState(
                {
                    messages: [
                        ...newMessages,
                        { sender: 'murungaevans84@gmail.com', content: reply },
                    ],
                    newMessage: '',
                },
                () => {
                    sessionStorage.setItem(
                        'chatMessages',
                        JSON.stringify(this.state.messages)
                    );
                }
            );
        }, 1000);
    };

    handleInputChange = (e) => {
        this.setState({ newMessage: e.target.value });
    };

    render() {
        const { messages, newMessage } = this.state;

        return (
            <>
                <div className={`chat-section`}>
                    <div className={`chat`}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={
                                    message.sender === 'kamar254baraka@gmail.com'
                                        ? 'sender-message'
                                        : 'receive-message'
                                }
                            >
                                <p>{message.sender}</p>
                                <p>{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className={`send-message`}>
            <textarea
                placeholder={`message`}
                value={newMessage}
                onChange={this.handleInputChange}
            />
                        <button onClick={this.sendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default ChatModal;