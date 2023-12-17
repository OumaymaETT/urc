import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageList from './msg/MessageList';
import { addMessage } from './msg/stockMessageApi';
import { getMessage } from './msg/getMessageApi';
import './styles.css';

const UserListItem = ({ user, setSelectedUser }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    setSelectedUser(user);
  };

  return (
    <button className="user-list-item" onClick={handleUserClick}>
      <strong>{user.username}</strong> (Dernière connexion : {user.last_login})
    </button>
  );
};

const MessageInput = ({ selectedUser, messages, setMessages, loggedInUserId, loggedInUsername }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    const newMessage = {
      senderId: loggedInUserId,
      receiverId: selectedUser?.userId,
      senderName: loggedInUsername,
      messageContent: message,
    };

    addMessage(newMessage, (success) => {
      if (success) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
      } else {
        console.error('La création de message a échoué.');
      }
    }, (error) => {
      console.error('Erreur lors de l\'envoi du message.');
    });
  };

  return (
    <div>
      {selectedUser && (
        <div>
          <h3>Conversation avec {selectedUser.username}</h3>
          {/* Afficher tous les messages */}
{messages.length > 0 && (
  <div className="all-messages">
    <strong>Messages :</strong>
    {messages.map((msg, index) => (
      <div key={index}>
        <strong>{msg.senderName} :</strong> {msg.messageContent}
        <h6>{msg.timestamp}</h6>
      </div>
    ))}
  </div>
)}
          {/* Utilisez le tableau de messages directement */}
          <MessageList messages={messages} userId={loggedInUserId} />
          <div className="messaging-container">
            <textarea
              className="message-input"
              placeholder={`Envoyer un message à ${selectedUser.username}`}
              value={message}
              onChange={handleChange}
            />
            <button className="send-button" onClick={handleClick}>
              Envoyer le message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UsersAndRoomsList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuu1");
    
    console.log(sessionStorage.getItem('idUser'));
    console.log(sessionStorage.getItem('idUser'));
    console.log(sessionStorage.getItem('username'));
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuu1");

    fetch('/api/getUserList')
      .then((response) => response.json())
      .then((data) => setUsers(data.filter((user) => user.userId !== +sessionStorage.getItem('idUser'))))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const messageInfos = {
        senderId: +sessionStorage.getItem('idUser'),
        receiverId: selectedUser.userId,
      };
      
      getMessage(messageInfos, (messageList) => {
        setMessages(messageList);
        console.log(messageList);
        console.log(messageList);
        console.log(messageInfos);
        console.log("messageInfos");
      }, (error) => {
        console.error('Erreur lors de la récupération des messages.');
      });
    }
  }, [selectedUser]);

  return (
    <div>
      <h1>bienvenue Mme/M. {sessionStorage.getItem('username')}</h1>
      <h2>Liste des Utilisateurs</h2>
      <h4>Cliquez sur un contact pour commencer  une conversation</h4>
      <div className="user-list">
        {users.map((user) => (
          <UserListItem key={user.userId} user={user} setSelectedUser={setSelectedUser} />
        ))}
      </div>

      {selectedUser && (
        <MessageInput
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          loggedInUserId={+sessionStorage.getItem('idUser')}
          loggedInUsername={sessionStorage.getItem('username')}
        />
      )}
    </div>
  );
};

export default UsersAndRoomsList;
