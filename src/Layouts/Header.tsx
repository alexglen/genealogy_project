import React, {ReactComponentElement, ReactElement} from "react";
import {Link, useLocation} from "react-router-dom";
import {Typography} from 'antd';
// @ts-ignore
import logo from '../images/logo.jpg';
import './Header.scss'

export const Header = ({children}: React.PropsWithChildren) => {
    const {pathname} = useLocation();

    return (
        <>
            <header className="header">
                <Link to='/'>
                    <Typography.Title level={1} style={{color: "#f4a261", marginBottom: 0}}>
                        <img alt="logo" src={logo}/> Genealogy
                    </Typography.Title>
                </Link>
                {pathname === "/" ? <div className="links">
                    <Link to="/registration">Регистрация</Link>
                    <Link to="/auth">Войти в личный кабинет</Link>
                </div> : null}
            </header>
            <main>
                {children}
            </main>
        </>
    )
}