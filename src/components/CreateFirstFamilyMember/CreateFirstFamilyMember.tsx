import React from "react";
import {Button, DatePicker, Form, Input, Select} from 'antd';
import {Header} from "../../Layouts/Header";
import {createPerson} from "../../requests";
import {getCookie} from "../../helpers";
import "./CreateFirstFamilyMember.scss";
import {NavigateFunction, useNavigate} from "react-router-dom";

const {Option} = Select;

export const CreateFirstFamilyMember = () => {

    const navigate: NavigateFunction = useNavigate();

    const createFirstPerson = ({firstName, lastName, bio, birth, death, maidenName, gender}: any) => {
        //const userId = getCookie("userId");
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
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Ваша фамилия"
                    name="lastName"
                    rules={[{required: true, message: 'Please input your password!'}]}
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
                    rules={[{required: false, message: 'Please input your password!'}]}
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
                    rules={[{required: true, message: 'Please input your password!'}]}
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


//  Фото Биография
