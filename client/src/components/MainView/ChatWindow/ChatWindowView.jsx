import React from 'react';
import './ChatWindow.scss';

const ChatWindowViewDisplay = () => {
    return (
        <div className="chat">
            <div className="chat__close-btn">
                <div className="chat__close-btn__bar1"></div>
                <div className="chat__close-btn__bar2"></div>
            </div>

            <div className="chat__header">
                <h3>Conversation with: </h3>
            </div>

            <div className="chat__conversation">

            </div>

        </div>
    );
};

export default ChatWindowViewDisplay;
