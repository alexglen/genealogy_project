import React from "react";
import {Button, Dropdown, Menu, Typography} from 'antd';
import {useAuth} from "../../context/authContext";
import {Link} from "react-router-dom";
import "./HeaderFamilyTree.scss";
import {logoutUser} from "../../requests";

const {Title} = Typography;

export const HeaderFamilyTree = ({firstName, lastName}: { firstName: string, lastName: string }) => {

    const {setAuth} = useAuth() as { setAuth: (auth: boolean) => boolean };

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to="/user">
                            Личный кабинет
                        </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Link to="/trees">
                            Мои деревья
                        </Link>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Link to="/" onClick={() => logoutUser().then(res => console.log("RES", res))}>
                            Выйти
                        </Link>
                    ),
                },
            ]}
        />
    );
    return (
        <header className="header-family-tree-container">
            <div className="header-family-tree">
                <Title level={3}>Ваше семейное древо</Title>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <Button type="primary" shape="circle" size="large">
                        {firstName[0]}{lastName[0]}
                    </Button>
                </Dropdown>
            </div>
        </header>
    )
}