import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Radio, Space} from "antd";
import {FamilyMemberImage} from "../FamilyMemberImage/FamilyMemberImage";
import {FamilyMemberInfoType} from "../../models";
import {getCookie, getDateForFamilyMemberCard} from "../../helpers";
import {ConfirmDeletingFamilyMemberModal} from "../ConfirmDeletingFamilyMemberModal/ConfirmDeletingFamilyMemberModal";
import {FEMALE, MALE} from "../../constants";
import "./FamilyMemberEditableModal.scss";
import {createPerson, getData, updatePerson} from "../../requests";
import moment from "moment";

export const FamilyMemberEditableModal = ({
                                              editableModal,
                                              familyMember,
                                              setEditableModal,
                                              setIsConfirmDeletingFamilyMemberOpen,
                                              isConfirmDeletingFamilyMemberOpen
                                          }: any) => {
    const {
        firstName,
        lastName,
        birthDate,
        deathDate,
        avatar,
        gender,
        maidenName,
        bio,
        treeOwner,
        parents,
        id,
        setFamilyTreeData
    } = familyMember;

    const {isNewFamilyMember, gender: genderStatus} = editableModal;

    const lifeYears = deathDate ? `(${getDateForFamilyMemberCard(birthDate as string)} - ${getDateForFamilyMemberCard(deathDate)})`
        : `(р. ${getDateForFamilyMemberCard(birthDate as string)})`;

    const handleCancel = () => {
        setEditableModal((state: { isOpenModal: boolean, isNewFamilyMember: boolean }) => ({
            isOpenModal: false,
            isNewFamilyMember: false
        }))
    };

    const deleteFamilyMember = () => {
        setIsConfirmDeletingFamilyMemberOpen(true);
    }

    const titleTextOfNewMemberFamily = genderStatus === MALE ? `${firstName} ${lastName} : добавить отца` : `${firstName} ${lastName}: добавить мать`
    const titleText = !isNewFamilyMember ? `${firstName} ${lastName} ${lifeYears}` : titleTextOfNewMemberFamily;
    const genderKey = genderStatus === MALE ? "father" : "mother";

    const onFinish = ({firstName, lastName, bio}: any) => {
        if (isNewFamilyMember) {
            const body = {
                gender: genderStatus,
                first_name: firstName,
                user: 46,
                last_name: lastName,
                maiden_name: null,
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
                // @ts-ignore
                const {id: parentId} = res?.data?.at(0);
                setEditableModal(false);
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
        }
    };

    // @ts-ignore
    return (
        <div>
            <Modal
                open={editableModal.isOpenModal}
                title={titleText}
                className="family-member-editable-modal"
                onCancel={handleCancel}
                width={460}
                style={{top: 20}}
                footer={!isNewFamilyMember ? [
                    <Button key="back">
                        Сохранить
                    </Button>,
                    <Button key="submit" type="primary" disabled={(treeOwner || parents?.length) as boolean}
                            onClick={deleteFamilyMember}>
                        Удалить
                    </Button>
                ] : []}
            >
                <div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        initialValues={{
                            lastName: isNewFamilyMember ? "" : lastName,
                            firstName: isNewFamilyMember ? "" : firstName,
                            surname: isNewFamilyMember ? "" : lastName,
                            maidenName: isNewFamilyMember ? "" : maidenName,
                            bio: isNewFamilyMember ? "" : bio

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

                        {genderStatus === FEMALE ? <Form.Item
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

                        <Form.Item
                            label="Дата рождения"
                            name="birth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <DatePicker defaultValue={moment('1990/01/01', 'YYYY/MM')}/>
                        </Form.Item>

                        <Form.Item>
                            <Radio.Group value={isNewFamilyMember ? "" : deathDate ? "dead" : "alive"}>
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
                        <Form.Item wrapperCol={{offset: 8, span: 16}} className="create-person-button">
                            <Button type="primary" htmlType="submit">
                                Создать личность
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
            <ConfirmDeletingFamilyMemberModal isModalOpen={isConfirmDeletingFamilyMemberOpen}
                                              setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                              id={id}
                                              setEditableModal={setEditableModal}
                                              setFamilyTreeData={setFamilyTreeData}
            />
        </div>)
}