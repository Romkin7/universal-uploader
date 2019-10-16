import React from "react";
import "./ListItem.css";

const ListItem = ({ name, thumbnail }) => {
    return(
        <>
            <li><img src={thumbnail} alt={name} /> {name}</li>
        </>
    )
};

export default ListItem;