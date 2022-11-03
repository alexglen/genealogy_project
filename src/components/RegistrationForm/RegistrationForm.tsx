import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, DatePicker, Form, Input, Select, Typography} from 'antd';
import {IUser} from "../../models";
import "./RegistrationForm.scss";
import {postDataUser} from "../../requests";

const {Option} = Select;

export const RegistrationForm = () => {
    const navigate = useNavigate();

    const registerUser = (body: IUser) => {
        postDataUser(body).then(({data}: any) => {
            navigate("/successfully-registered", {
                state: {
                    email: data.email,
                    username: data.username
                }
            })
        })
    }

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
                    label="Повторите Ваш пароль"
                    name="rePassword"
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