import React from "react";
import {Route, Routes} from 'react-router-dom';
import {AuthPage} from "../pages/AuthPage";
import {FamilyTreePage} from "../pages/FamilyTreePage";
import {HomePage} from "../pages/HomePage";
import {RegistrationPage} from "../pages/RegistrationPage";
import {SuccessfullyRegisteredPage} from "../pages/SuccessfullyRegisteredPage";
import {Page403} from "../pages/Page403";
import {Page404} from "../pages/Page404";
import {CreateFirstPersonPage} from "../pages/CreateFirstPersonPage";
import {useAuth} from "../context/authContext";

export const AppRoutes: React.FC = () => {
    const {isAuth} = useAuth() as { isAuth: boolean };
    return (
        <Routes>
            <Route element={<HomePage/>} path="/"/>
            <Route element={<RegistrationPage/>} path="/registration"/>
            <Route element={<AuthPage/>} path="/auth"/>
            <Route element={isAuth ? <FamilyTreePage/> : <Page403/>} path="/tree"/>
            <Route element={<SuccessfullyRegisteredPage/>} path={`/successfully-registered`}/>
            <Route element={isAuth ? <CreateFirstPersonPage/> : <Page403/>}
                   path={`/create-first-person`}/>
            <Route element={<Page404/>}
                   path="*"/>
        </Routes>
    )
}




