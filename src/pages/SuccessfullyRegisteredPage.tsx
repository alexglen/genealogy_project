import {Button, Result} from 'antd';
import React from 'react';
import {Header} from "../Layouts/Header";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const SuccessfullyRegisteredPage = () => {

    const navigate = useNavigate();
    const {state} = useLocation();

    console.log("state", state);


    return (
        <Header>
            <Result
                status="success"
                title={`${state.username}, Вы успешно зарегистрированы!`}
                subTitle={`На адрес ${state.email} должно прийти письмо. Пройдите по ссылке, чтобы завершить регистрацию`}
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate("/")}>
                        Вернуться на главную страницу
                    </Button>,
                ]}
            />
        </Header>
    )
}


