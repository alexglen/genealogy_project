import React from "react";
import {Button, Form, Input, Modal, Radio, Space} from "antd";
import {FamilyMemberImage} from "../FamilyMemberImage/FamilyMemberImage";
import {FamilyMemberInfoType} from "../../models";
import {FEMALE} from "../../constants";
import "./FamilyMemberEditableModal.scss";
import {getDateForFamilyMemberCard} from "../../helpers";

export const FamilyMemberEditableModal = ({
                                              isOpenEditableModal,
                                              familyMember,
                                              setOpenEditableModal
                                          }: FamilyMemberInfoType) => {
    const {firstName, lastName, birthDate, deathDate, avatar, gender, maidenName, bio} = familyMember;
    const lifeYears = deathDate ? `(${getDateForFamilyMemberCard(birthDate as string)} - ${getDateForFamilyMemberCard(deathDate)})`
        : `(р. ${getDateForFamilyMemberCard(birthDate as string)})`;

    const handleCancel = () => {
        setOpenEditableModal?.(false);
    };

    const handleOk = () => {
        console.log('Some');
    }

    // @ts-ignore
    return (
        <>
            <Modal
                open={isOpenEditableModal}
                title={`${firstName} ${lastName} ${lifeYears}`}
                className="family-member-editable-modal"
                onOk={handleOk}
                onCancel={handleCancel}
                width={460}
                style={{top: 20}}
                footer={[
                    <Button key="back">
                        Сохранить
                    </Button>,
                    <Button key="submit" type="primary">
                        Удалить
                    </Button>
                ]}
            >
                <div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        initialValues={{
                            remember: true,
                            lastName: lastName,
                            firstName: firstName,
                            surname: lastName,
                            maidenName: maidenName,
                            bio: bio

                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Имя"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Отчество"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        {gender === FEMALE ? <Form.Item
                            label="Девичья фамилия"
                            name="maidenName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item> : null}

                        <Form.Item>
                            <Radio.Group value={deathDate ? "dead" : "alive"}>
                                <Radio value="alive">{gender === FEMALE ? "Жива" : "Жив"}</Radio>
                                <Radio value="dead">{gender === FEMALE ? "Умерла" : "Умер"}</Radio>
                            </Radio.Group>
                        </Form.Item>
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
                    </Form>
                </div>
                <div className="avatar">
                    <FamilyMemberImage img={avatar}/>
                </div>
            </Modal>
        </>)
}