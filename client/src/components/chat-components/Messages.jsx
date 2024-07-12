import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import '../../css/form.css';
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading, error } = useGetMessages(); // Make sure useGetMessages handles errors and provides the error state
    useListenMessages();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!loading && messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    // Function to group messages by date and sort messages within each group
    const groupMessagesByDate = (messages) => {
        // Sort messages by createdAt date in ascending order
        const sortedMessages = messages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const groupedMessages = sortedMessages.reduce((grouped, message) => {
            const created = new Date(message.createdAt);
            const date = `${created.toLocaleDateString('en-GB', { weekday: 'short' })} ${created.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(message);
            return grouped;
        }, {});

        return groupedMessages;
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className='px-4 flex-1 overflow-auto h-[100vh]'>
            {error && (
                <div className='text-center text-red-500'>
                    An error occurred while fetching messages. Please try again later.
                </div>
            )}
            {!loading && Object.keys(groupedMessages).length > 0 ? (
                Object.keys(groupedMessages).map((date) => (
                    <div key={date}>
                        <p className='text-center mb-2 text-n-8 dark:text-n-1 py-5'>{date}</p>
                        {groupedMessages[date].map((message, index) => (
                            <div key={message._id} ref={index === groupedMessages[date].length - 1 ? messagesEndRef : null}>
                                <Message message={message} />
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className='text-center'>{!loading && !error ? 'Send a message to start the conversation' : 'Loading...'}</p>
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;
