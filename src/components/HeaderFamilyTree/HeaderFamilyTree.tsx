import React from "react";
import {Button, Dropdown, Menu, Typography} from 'antd';
import {useAuth} from "../../context/authContext";
import {Link} from "react-router-dom";
import "./HeaderFamilyTree.scss";

const {Title} = Typography;

export const HeaderFamilyTree = ({firstName, lastName}: {firstName: string, lastName: string}) => {

    const {setAuth} = useAuth() as {setAuth: (auth: boolean) => boolean};

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            1st menu item
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            2nd menu item
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Link to="/">
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