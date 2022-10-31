import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input, Typography} from "antd";

export const AuthorizationForm = () => {
    const navigate = useNavigate();
    const onFinish = ({email, password, remember}: { email: string, password: string, remember: boolean }) => {
        console.log(email, password, remember);
        navigate('/tree');
    };

    const onFinishFailed = (errorInfo: any): void => {
        console.log('Failed:', errorInfo);
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
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