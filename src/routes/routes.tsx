import React from "react";
import {Route, Routes} from 'react-router-dom';
import {AuthPage} from "../pages/AuthPage";
import {FamilyTreePage} from "../pages/FamilyTreePage";
import {HomePage} from "../pages/HomePage";
import {RegistrationPage} from "../pages/RegistrationPage";

export const AppRoutes: React.FC = () => (
    <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<RegistrationPage/>} path="/registration"/>
        <Route element={<AuthPage/>} path="/auth"/>
        <Route element={<FamilyTreePage/>} path="/tree"/>
    </Routes>
)
