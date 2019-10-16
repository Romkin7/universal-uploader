import React from "react";
import "./Message.css";

const Message = ({ message, bgColor, closeHandler}) => {
    return(
        <div className={`message ${bgColor}`}>
            <h4>{message}</h4>
        </div>
    )
};

export default Message;
