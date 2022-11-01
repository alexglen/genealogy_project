import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, DatePicker, Form, Input, Select, Typography} from 'antd';
import {useAuth} from "../../context/authContext";
import {IUser} from "../../models";
import "./RegistrationForm.scss";

const {Option} = Select;

export const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const {changeAuthStatus} = useAuth() as { changeAuthStatus: (status: boolean) => {} };

    const registerUser = async (data: IUser) => {
        console.log('DATA', data);
        // const body = {password, repeat_password: password, username: email, email};
        //const body = {"username": "adle5x4", "email": "aldex12@mail.ru", "password": "1234", "repeat_password": "1234"}
        navigate('/tree');
        changeAuthStatus(true);

        // const res = await fetch("http://127.0.0.1:8000/api/v1/token/register/", {
        //     mode: 'no-cors',
        //     method: "POST",
        //     headers: {
        //         contentType: 'application/json',
        //         // "Accept": "/"
        //     },
        //     body: JSON.stringify(body),
        // })
        // console.log('RES', res);
    };

    return (
        <div>
            <Typography.Title level={3} style={{display: "flex", justifyContent: "center", marginTop: 50}}>
                Регистрация
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
                    remember: true,
                }}
                onFinish={registerUser}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, напишите Ваш корректный email',
                            type: "email"
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
                            message: 'Пароль должен быть длиннее',
                            min: 8
                        },
                    ]}
                >
                    <Input.Password/>

                </Form.Item>

                <Form.Item
                    label="Ваше Имя"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, напишите своё имя',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ваша Фамилия"
                    name="lastName"
                >
                    <Input/>
                </Form.Item>

                <Form.Item name="gender" label="Пол" rules={[{
                    required: true
                }]}>
                    <Select
                        placeholder="Ваш пол"
                        allowClear
                    >
                        <Option value="male">Мужской</Option>
                        <Option value="female">Женский</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Дата рождения" name='date'>
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div>
                        <Button type="primary" htmlType="submit">
                            Зарегистрироваться
                        </Button>
                        <p className="auth-link">Уже зарегистрирован? <Link to="/auth">Войти</Link></p>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};