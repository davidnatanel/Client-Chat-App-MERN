import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logomp.svg'


export default function Contacts({contacts,currentUser,changeChat}) {
const [currentUserName,setCurrentUserName]=useState(undefined)
const [currentUserImage,setcurrentUserImage]=useState(undefined)
const [currentSelected, setCurrentSelected] = useState(undefined);


  useEffect(()=>{
    if(currentUser){
      setcurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  },[currentUser])
const changeCurrentChat = (index,contact) =>{
  setCurrentSelected(index)
  changeChat(contact)
}

  return <>
   {currentUserImage && currentUserName && (
    <Container>
    <div className="brand">
      <img src={logo} alt="logo" />
      <h3>Message in pocket</h3>
    </div>
    <div className="contacts">

    {contacts.map((contact,index)=> {
      return(
        <div 
        className={`contact ${index == currentSelected?"selected":""}`} 
        key={index}
        onClick={()=>changeCurrentChat(index,contact)}
        >
         
          <div className="avatar">
          <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar'/>
          </div>
        
          <div className="username">
            <h3>{contact.username}</h3>
          </div>

        </div>
        )
    })}

    </div>

    <div className="current-user">

    <div className="avatar">
          <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar'/>
          </div>
        
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>

    </div>
    </Container>
     
    
   )
  }
  </>;
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #181814;
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  img {
    height: 4rem;
  }
  h3 {
    color: white;
    text-transform: uppercase;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffffff34;
    min-height: 5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .selected {
    background-color: #efb810;
  }
}
.current-user {
  background-color: #181814;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username {
    h2 {
      color: white;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
}
`;