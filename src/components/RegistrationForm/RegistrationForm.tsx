import React from 'react';
import {Button, DatePicker, Form, Input, Select, Typography} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../../context/authContext";
import "./RegistrationForm.scss";

const {Option} = Select;

export const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // @ts-ignore
    const {changeAuthStatus} = useAuth();

    const onFinish = async ({firstName, gender, surname, password, email}: any) => {
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

    const onFinishFailed = (errorInfo: any): void => {
        console.log('Failed:', errorInfo);
    };

    const onGenderChange = (value: string): string | void => {
        switch (value) {
            case 'male':
                form.setFieldsValue({note: 'Hi, man!'});
                return;
            case 'female':
                form.setFieldsValue({note: 'Hi, lady!'});
                return;
            default:
                return;
        }
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
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
                        },
                    ]}
                >
                    <Input.Password/>

                </Form.Item>
                <Form.Item
                    label="Подтвердите пароль"
                    name="confirm_password"
                    rules={[
                        {
                            required: true,
                            message: 'Повторите пароль',
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
                            // required: true,
                            message: 'Пожалуйста, напишите своё имя',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ваша Фамилия"
                    name="surname"
                    rules={[
                        {
                            // required: true,
                            message: 'Пожалуйста, напишите свою фамилию',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item name="gender" label="Пол" rules={[{
                    // required: true
                }]}>
                    <Select
                        placeholder="Ваш пол"
                        onChange={onGenderChange}
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