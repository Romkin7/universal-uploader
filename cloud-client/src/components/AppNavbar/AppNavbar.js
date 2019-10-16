import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AppNavbar.css";

const AppNavbar = () => {
    return (
        <React.Fragment>
            <header>
                <div id="logo">
                    <FontAwesomeIcon color="#fff" size="3x" icon={["fas", "cloud"]} />
                </div>
                <div id="brand">
                    <h2>Cloud</h2>
                    <small>Universal file manager</small>
                </div>
            </header>
        </React.Fragment>
    )
}

export default AppNavbar;