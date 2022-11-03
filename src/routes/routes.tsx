import React from "react";
import {Route, Routes} from 'react-router-dom';
import {AuthPage} from "../pages/AuthPage";
import {FamilyTreePage} from "../pages/FamilyTreePage";
import {HomePage} from "../pages/HomePage";
import {RegistrationPage} from "../pages/RegistrationPage";
import {SuccessfullyRegisteredPage} from "../pages/SuccessfullyRegisteredPage";
import {Page403} from "../pages/Page403";
import {Page404} from "../pages/Page404";

export const AppRoutes: React.FC = () => (
    <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<RegistrationPage/>} path="/registration"/>
        <Route element={<AuthPage/>} path="/auth"/>
        <Route element={<FamilyTreePage/>} path="/tree"/>
        <Route element={<SuccessfullyRegisteredPage/>}
               path={`/successfully-registered`}/>
        <Route element={<Page403/>}
               path={`/a`}/>
        <Route element={<Page404/>}
               path={`/b`}/>

    </Routes>
)
