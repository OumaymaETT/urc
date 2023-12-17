/*import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, userId }) => {
  // Créez une référence pour l'élément de la liste des messages
  const messageListRef = useRef();

  // Utilisez useEffect pour définir le scroll après chaque mise à jour des messages
  useEffect(() => {
    // Faites défiler jusqu'au bas de la liste après chaque rendu
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]); // Déclenchez cet effet chaque fois que la liste des messages est mise à jour

  return (
    <div ref={messageListRef} className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === userId ? 'sent' : 'received'}>
          <strong>{msg.sender}:</strong> {msg.messageContent}
        </div>
      ))}
    </div>
  );
};

export default MessageList;*/
import React, { useRef, useEffect, useState } from 'react';
import { getMessage } from './getMessageApi'; 

const MessageList = ({ selectedUser, userId }) => {
  const messageListRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loadedMessages, setLoadedMessages] = useState(false);

  useEffect(() => {
    if (selectedUser && !loadedMessages) {
      const messageInfos = {
        senderId: userId,
        receiverId: selectedUser.userId,
      };

      getMessage(messageInfos, (messageList) => {
        setMessages(messageList);
        setLoadedMessages(true);
        console.log("liiiiii1");
        console.log(messageList);
        console.log(messageInfos);
        console.log("liiiiiist");
      }, (error) => {
        console.error('Erreur lors de la récupération des messages.', error);
      });
    }
  }, [selectedUser, userId, loadedMessages]);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messageListRef} className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={msg.senderId === userId ? 'sent' : 'received'}>
          <strong>{msg.senderName}:</strong> {msg.messageContent}
        </div>
      ))}
    </div>
  );
};

export default MessageList;



