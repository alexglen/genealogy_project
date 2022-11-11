import React from "react";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input, Typography} from "antd";
import {getData, loginUser} from "../../requests";
import {useAuth} from "../../context/authContext";
import {ILogin} from "../../models";

export const AuthorizationForm: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const {changeAuthStatus} = useAuth() as { changeAuthStatus: (status: boolean) => {} };

    const loginHandler = async (data: ILogin) => {
        const responseLoginUser = await loginUser(data);
        if (responseLoginUser === "ok") {
            const responseDataFamily = await getData();
            if (responseDataFamily.length) {
                navigate(`/trees/водкин`);
            } else {
                navigate("/create-first-person");
            }

            changeAuthStatus(true);
        }
    };

    return (
        <div>
            <Typography.Title level={3} style={{display: "flex", justifyContent: "center", marginTop: 50}}>
                Авторизация
            </Typography.Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={loginHandler}
                autoComplete="off"
            >
                <Form.Item
                    label="Ваше имя"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, напишите Ваш email',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите Ваш пароль',
                            min: 8
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                    <p className="auth-link">Еще нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
                </Form.Item>
            </Form>
        </div>
    );
}