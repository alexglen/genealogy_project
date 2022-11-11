import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Button, DatePicker, Form, Input, Select} from 'antd';
import {Header} from "../../Layouts/Header";
import {createPerson} from "../../requests";
import "./CreateFirstFamilyMember.scss";

const {Option} = Select;

export const CreateFirstFamilyMember: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const createFirstPerson = ({firstName, lastName, bio, birth, death, maidenName, gender}: any) => {
        const body = {
            gender,
            first_name: firstName,
            user: 46,
            last_name: lastName,
            maiden_name: maidenName,
            birth: null,
            death: null,
            birth_ca: null,
            death_ca: null,
            photo: null,
            tree_owner: true,
            father: null,
            mother: null,
            bio,
            spouse: [],
        }
        createPerson(body).then(res => {
            if (res) {
                console.log('RES', res);
                navigate("/tree");
            }
        });
    };


    return (
        <Header>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={createFirstPerson}
                autoComplete="off"
                className="create-first-family-member"
            >
                <Form.Item
                    label="Ваше имя"
                    name="firstName"
                    rules={[{required: true, message: 'Напишите Ваше имя!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ваша фамилия"
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
                        <Option value="M">Мужской</Option>
                        <Option value="F">Женский</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Девичья фамилия"
                    name="maidenName"
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="Дата рождения" name='birth'>
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="Дата рождения" name='death'>
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    label="Биография"
                    name="bio"
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Создать личность
                    </Button>
                </Form.Item>
            </Form>
        </Header>
    );
}
