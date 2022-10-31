import React from "react";
import {RegistrationForm} from "../components/RegistrationForm/RegistrationForm";
import {Header} from "../Layouts/Header";

export const RegistrationPage: React.FC = () => {
    return (
        <Header>
            <RegistrationForm/>
        </Header>
    )
}