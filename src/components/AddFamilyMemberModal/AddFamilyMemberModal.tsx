import React, {useState} from "react";
import {Button, DatePicker, DatePickerProps, Form, Input, Modal, Radio} from "antd";
import {createPerson, updatePerson} from "../../requests";
import {IAddFamilyMemberModal, IObjectConvertedInCamelNotationData} from "../../models";
import {FEMALE, MALE} from "../../constants";
import "./AddFamilyMemberModal.scss";

export const AddFamilyMemberModal = ({
                                         addFamilyMemberModal,
                                         setAddFamilyMemberModal,
                                         familyMember,
                                     }: IAddFamilyMemberModal) => {

    const {setFamilyTreeData, firstName, id, lastName} = familyMember;
    const {gender: genderOfNewPerson, isOpenModal} = addFamilyMemberModal;

    const [isAlive, setIsAlive] = useState<boolean>(true);
    const [date, setDate] = useState<{ birth: string | null, death: string | null }>({birth: null, death: null});

    const cancelModal = (): void => {
        setAddFamilyMemberModal({...addFamilyMemberModal, isOpenModal: false});
    };

    const changeBirthDate: DatePickerProps['onChange'] = (_, dateString) => {
        setDate({...date, birth: dateString});
    };

    const changeDeathDate: DatePickerProps['onChange'] = (_, dateString) => {
        setDate({...date, death: dateString});
    };


    const titleText = genderOfNewPerson === MALE ? `${firstName} ${lastName} : добавить отца`
        : `${firstName} ${lastName}: добавить мать`;
    const genderKey = genderOfNewPerson === MALE ? "father" : "mother";

    const onFinish = ({firstName, lastName, bio, maidenName}: IObjectConvertedInCamelNotationData) => {
        const body = {
            gender: genderOfNewPerson,
            first_name: firstName,
            last_name: lastName,
            maiden_name: maidenName,
            user: 46,
            birth: date.birth,
            death: date.death,
            birth_ca: null,
            death_ca: null,
            photo: null,
            tree_owner: false,
            father: null,
            mother: null,
            bio,
            spouse: [],
        };

        createPerson(body).then(res => {
            const {id: parentId} = res?.data?.at(0);
            cancelModal();
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
            className="add-family-member-modal"
            onCancel={cancelModal}
            width={460}
            style={{top: 60}}
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
                        <DatePicker onChange={changeBirthDate} name='birth'/>
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
                        <DatePicker onChange={changeDeathDate}/>
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