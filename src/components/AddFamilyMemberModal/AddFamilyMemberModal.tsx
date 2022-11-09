import React, {useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Radio, Space} from "antd";
import {FEMALE, MALE} from "../../constants";
import {createPerson, updatePerson} from "../../requests";
import moment from "moment";

export const AddFamilyMemberModal = ({
                                         addFamilyMemberModal,
                                         setAddFamilyMemberModal,
                                         familyMember,
                                     }: any) => {

    const {setFamilyTreeData, firstName, id, death, birth, lastName} = familyMember;
    const {gender: genderOfNewPerson, isOpenModal} = addFamilyMemberModal;

    const [isAlive, setIsAlive] = useState<boolean>(true);

    const handleCancel = () => {
        setAddFamilyMemberModal((state: { isOpenModal: boolean }) => ({
            isOpenModal: false
        }))
    };


    const titleText = genderOfNewPerson === MALE ? `${firstName} ${lastName} : добавить отца` : `${firstName} ${lastName}: добавить мать`
    const genderKey = genderOfNewPerson === MALE ? "father" : "mother";

    const onFinish = ({firstName, lastName, bio, maidenName}: any) => {
        const body = {
            gender: genderOfNewPerson,
            first_name: firstName,
            last_name: lastName,
            maiden_name: maidenName,
            user: 46,
            birth: null,
            death: null,
            birth_ca: null,
            death_ca: null,
            photo: null,
            tree_owner: false,
            father: null,
            mother: null,
            bio,
            spouse: [],
        }

        createPerson(body).then(res => {
            console.log('RES', res)
            // @ts-ignore
            const {id: parentId} = res?.data?.at(0);
            setAddFamilyMemberModal(false);
            // @ts-ignore
            // @ts-ignore
            updatePerson({
                [genderKey]: parentId,
                user: 46,
                first_name: familyMember.firstName,
                gender: familyMember.gender
            }, id as number).then(res => {
                setFamilyTreeData(res?.data)
            })
        })
    };

    return (
        <Modal
            open={isOpenModal}
            title={titleText}
            className="family-member-editable-modal"
            onCancel={handleCancel}
            width={460}
            style={{top: 20}}
            footer={[]}
        >
            <div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    initialValues={{
                        lastName: "",
                        firstName: "",
                        maidenName: "",
                        bio: "",
                        isAlive: "alive",
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Имя"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Вы забыли написать имя',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Фамилия"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Вы забыли указать фамилию',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    {genderOfNewPerson === FEMALE ? <Form.Item
                        label="Девичья фамилия"
                        name="maidenName"
                        rules={[
                            {
                                required: true,
                                message: 'Вы забыли указать девичью фамилию',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item> : null}

                    <Form.Item
                        label="Дата рождения"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, напишите дату рождения',
                            },
                        ]}
                    >
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item name='isAlive'>
                        <Radio.Group value="alive"
                                     onChange={({target: {value}}) => value === "alive" ? setIsAlive(true) : setIsAlive(false)}>
                            <Radio value="alive">{genderOfNewPerson === FEMALE ? "Жива" : "Жив"}</Radio>
                            <Radio value="dead">{genderOfNewPerson === FEMALE ? "Умерла" : "Умер"}</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {!isAlive && <Form.Item
                        label="Дата смерти"
                        name="death"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, напишите дату рождения',
                            },
                        ]}
                    >
                        <DatePicker/>
                    </Form.Item>}


                    <p>Биография: </p>
                    <Form.Item
                        name="bio"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 14, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Создать личность
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </Modal>)
}