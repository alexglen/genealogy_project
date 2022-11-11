import React, {useState} from "react";
import {Button, DatePicker, DatePickerProps, Form, Input, Modal, Radio} from "antd";
import {IFamilyMemberEditableModal} from "../../models";
import {getDateForFamilyMemberCard} from "../../helpers";
import {ConfirmDeletingFamilyMemberModal} from "../ConfirmDeletingFamilyMemberModal/ConfirmDeletingFamilyMemberModal";
import {FEMALE} from "../../constants";
import {updatePerson} from "../../requests";
import moment from "moment";
import "./FamilyMemberEditableModal.scss";

export const FamilyMemberEditableModal = ({
                                              isOpenEditableModal,
                                              familyMember,
                                              setOpenEditableModal,
                                              setIsConfirmDeletingFamilyMemberOpen,
                                              isConfirmDeletingFamilyMemberOpen,
                                              setOpen,
                                              setFamilyTreeData
                                          }: IFamilyMemberEditableModal) => {

    const {
        firstName,
        lastName,
        birth,
        death,
        gender,
        maidenName,
        bio,
        id,
        setWasDataChanged
    } = familyMember;

    const [isAlive, setIsAlive] = useState<boolean>(true);
    const [date, setDate] = useState<{ birth: string | null, death: string | null }>({birth: null, death: null});

    const changeBirthDate: DatePickerProps['onChange'] = (_, dateString) => {
        console.log("BIRTH DATE", dateString);
        setDate({...date, birth: dateString});
    };

    const changeDeathDate: DatePickerProps['onChange'] = (_, dateString) => {
        setDate({...date, death: dateString});
    };


    const lifeYears = death ? `(${getDateForFamilyMemberCard(birth as string)} - ${getDateForFamilyMemberCard(death)})`
        : `(р. ${getDateForFamilyMemberCard(birth as string)})`;

    const cancelModal = (): void => {
        setOpenEditableModal(false);
    };

    const openConfirmDeletingFamilyMemberModal = (): void => {
        setIsConfirmDeletingFamilyMemberOpen(true);
    }

    const onFinish = ({firstName, lastName, bio, maidenName}: any) => {
        const body = {
            first_name: firstName,
            user: 46,
            last_name: lastName,
            maiden_name: maidenName,
            birth: date.birth,
            death: date.death,
            bio,
        }

        updatePerson(
            body, id as number).then(response => {
            setFamilyTreeData(response?.data);
            setWasDataChanged(true);
            setOpenEditableModal(false);
        })
    }

    return (
        <div>
            <Modal
                open={isOpenEditableModal}
                title={`${firstName} ${lastName} ${lifeYears}`}
                className="family-member-editable-modal"
                onCancel={cancelModal}
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
                            lastName,
                            firstName,
                            maidenName,
                            bio,
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
                                    message: 'Вы забыли написать имя!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="lastName"
                        >
                            <Input/>
                        </Form.Item>

                        {gender === FEMALE ? <Form.Item
                            label="Девичья фамилия"
                            name="maidenName"
                        >
                            <Input/>
                        </Form.Item> : null}

                        <Form.Item
                            label="Дата рождения"
                            name="birth"
                        >
                            <DatePicker onChange={changeBirthDate}
                                        defaultValue={birth ? moment(birth) : moment('2022/01/01')}/>
                        </Form.Item>

                        <Form.Item name='isAlive'>
                            <Radio.Group value="alive"
                                         onChange={({target: {value}}) => value === "alive" ? setIsAlive(true) : setIsAlive(false)}>
                                <Radio value="alive">{gender === FEMALE ? "Жива" : "Жив"}</Radio>
                                <Radio value="dead">{gender === FEMALE ? "Умерла" : "Умер"}</Radio>
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
                            <DatePicker onChange={changeDeathDate}
                                        defaultValue={death ? moment(death) : moment('2022/01/01')}/>
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

                        <div className='buttons'>
                            <Form.Item>
                                <Button className='delete-button' onClick={openConfirmDeletingFamilyMemberModal}>
                                    Удалить
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Сохранить изменения
                                </Button>
                            </Form.Item>
                        </div>

                    </Form>
                </div>

            </Modal>
            {isConfirmDeletingFamilyMemberOpen ?
                <ConfirmDeletingFamilyMemberModal isModalOpen={isConfirmDeletingFamilyMemberOpen}
                                                  setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                                  id={id}
                                                  setOpenEditableModal={setOpenEditableModal}
                                                  setFamilyTreeData={setFamilyTreeData}
                /> : null}
        </div>)
}