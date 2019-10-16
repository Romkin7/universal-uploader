import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AppFooter.css";

const AppFooter = () => {
    return (
        <>
            <footer>
                <p>
                    <FontAwesomeIcon icon={["fas", "copyright"]} color=" #0460f6" size="1x" />
                    <wbr/> Roman Tuomisto & Telia 2019
                </p>
            </footer>
        </>
    )
};

export default AppFooter;