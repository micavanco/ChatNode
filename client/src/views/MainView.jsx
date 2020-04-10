import React from 'react';
import { useHistory } from "react-router-dom";
import ChatWindow from "../components/MainView/ChatWindow/ChatWindow";
import ContactList from "../components/MainView/ContactList/ContactList";


export default function MainView() {
    const history = useHistory();

    if(!localStorage.getItem('user')) {
        history.push('/login');
    }

    return (
        <div className="main-view">
            <ContactList/>
            <ChatWindow/>
        </div>
    );
}
