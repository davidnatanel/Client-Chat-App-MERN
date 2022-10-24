import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { allUsersRoute, host } from '../utils/APIRoutes';

//socket
import { io } from 'socket.io-client';


const Chat = () => {
//socket
  const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

 

    useEffect(()=>{
      console.log(localStorage.getItem("chat-app-user"));
      
      (async function(){
        if(!localStorage.getItem("chat-app-user")){
          navigate("/login")
      }else{setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))}
    setIsLoaded(true) 
    })()
     },[])


     //socket

     useEffect(() => {
      if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }, [currentUser]);
    
  useEffect( () => {

    (async function(){
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
         
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }

    })()
  }, [currentUser]);

  const handleChatChange = (chat)=>{
    setCurrentChat(chat)
  }
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

            {isLoaded && currentChat === undefined ? 
            (<Welcome  currentUser={currentUser} />):
            (<ChatContainer
             currentChat={currentChat}
             currentUser={currentUser}
             //socket
             socket={socket}
            />) }

            </div>
        </Container>
    );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #473204;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;