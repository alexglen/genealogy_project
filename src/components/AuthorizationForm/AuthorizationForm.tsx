import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input, Typography} from "antd";
import {loginUser} from "../../requests";
import {useAuth} from "../../context/authContext";

export const AuthorizationForm = () => {
    const navigate = useNavigate();

    const {changeAuthStatus} = useAuth() as { changeAuthStatus: (status: boolean) => {} };

    const login = ({firstName, password}: { firstName: string, password: string }) => {
        loginUser({username: firstName, password}).then(res => res === "ok" && navigate("/tree"));
        changeAuthStatus(true);
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
                onFinish={login}
                autoComplete="off"
            >
                <Form.Item
                    label="Ваше имя"
                    name="firstName"
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