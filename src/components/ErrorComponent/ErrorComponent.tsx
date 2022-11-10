import React from 'react';
import {Button, Result} from 'antd';
import {NavigateFunction, useNavigate} from "react-router-dom";

export const ErrorComponent = ({errorText}: any) => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <Result
            status="warning"
            title={errorText}
            style={{marginTop: 60}}
            extra={
                <Button type="primary" key="console" onClick={() => navigate("/")}>
                    Вернуться на главную страницу
                </Button>
            }
        />
    );

}