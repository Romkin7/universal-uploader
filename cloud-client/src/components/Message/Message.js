import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Message.css";

const Message = ({ message, bgColor, closeMessageHandler }) => {
    return(
        <div className={`message ${bgColor}`}>
            {message}
            <FontAwesomeIcon onClick={closeMessageHandler} size="2x" color="#fff" icon={["fas", "times"]} />
        </div>
    )
};

export default Message;
