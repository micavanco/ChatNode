import React, { Component } from 'react';
import ChatWindow from "../components/MainView/ChatWindow/ChatWindow";
import ContactList from "../components/MainView/ContactList/ContactList";


export default class MainView extends Component {
    render = () => {
        return (
            <div className="main-view">
                <ContactList/>
                <ChatWindow/>
            </div>
        );
    };
}
