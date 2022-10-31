import React from "react"
import {Header} from "../Layouts/Header";
import {AuthorizationForm} from "../components/AuthorizationForm/AuthorizationForm";

export const AuthPage: React.FC = () => {
    return (
        <Header>
            <AuthorizationForm/>
        </Header>
    )
}