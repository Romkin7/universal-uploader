import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ListItem.css";

const ListItem = ({ name, thumbnail, clickHandler }) => {
    return(
        <>
            <li>
                <img src={thumbnail} alt={name} />
                {" "+name.substring(0, 30)} 
                <button type="button" onClick={clickHandler} className="button">
                    <FontAwesomeIcon color="#fff" size="2x" icon={["fas", "file-download"]} />
                </button>
            </li>
        </>
    )
};

export default ListItem;