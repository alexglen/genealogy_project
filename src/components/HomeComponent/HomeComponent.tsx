import React from "react";
import {Header} from "../../Layouts/Header";
import "./HomeComponent.scss";
import {Link} from "react-router-dom";

export const HomeComponent: React.FC = () => {
    return (
        <div className="main-picture-container">
            <Header/>
        </div>
    )
}