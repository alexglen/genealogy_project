import React, {useEffect, useState} from 'react';
import {Button, Modal, Space, Typography} from 'antd';
import {FamilyMemberImage} from "../FamilyMemberImage/FamilyMemberImage";
import {ConfirmDeletingFamilyMemberModal} from "../ConfirmDeletingFamilyMemberModal/ConfirmDeletingFamilyMemberModal";
import {getData} from "../../requests";
import {FamilyMemberInfoType, IObjectData} from "../../models";
import {getDateForFamilyMemberCard} from "../../helpers";
import {FEMALE, MALE} from "../../constants";
import "./FamilyMemberInfo.scss";

const {Text, Paragraph} = Typography;


export const FamilyMemberInfo = ({
                                     setOpen,
                                     open,
                                     familyMember,
                                     setEditableModal,
                                     isConfirmDeletingFamilyMemberOpen,
                                     setIsConfirmDeletingFamilyMemberOpen
                                 }: FamilyMemberInfoType) => {
    const {
        firstName,
        lastName,
        maidenName,
        treeOwner,
        avatar,
        birth,
        id,
        bio,
        death,
        gender,
        parents,
    } = familyMember;

    const [children, setChildren] = useState<string[] | []>([]);
    const [spouse, setSpouse] = useState<string | null>(null);

    const genderKey = gender === MALE ? "father" : "mother";

    useEffect(() => {
        getData().then(data => {
            const childrenObject = data?.filter((person: IObjectData) => id === person[genderKey]);
            setChildren(childrenObject.map((person: IObjectData) => person.first_name));
            const parentId = childrenObject.map((person: IObjectData) => gender === MALE ? person["mother"] : person["father"]);
            const spouses = data.find((person: IObjectData) => parentId.includes(person.id));
            setSpouse(spouses.first_name);
        })
    }, []);

    const cancelModal = (): void => {
        setOpen?.(false);
    };

    const openEditFamilyMemberModal = (): void => {
        setOpen?.(false);
        setEditableModal?.((state: ({ isOpenModal: boolean, gender: string })) => ({...state, isOpenModal: true}));
    }

    const openConfirmDeletingFamilyMemberModal = (): void => {
        setIsConfirmDeletingFamilyMemberOpen(true);
    }

    const lifeYears = death ? `(${getDateForFamilyMemberCard(birth as string)} - ${getDateForFamilyMemberCard(death)})`
        : `(р. ${getDateForFamilyMemberCard(birth as string)})`;

    const status: "Муж" | "Жена" = gender === FEMALE ? "Муж" : "Жена";
    const genderName: "женский" | "мужской" = gender === FEMALE ? "женский" : "мужской";

    return (
        <div>
            <Modal
                open={open}
                title={`${firstName} ${lastName} ${lifeYears}`}
                onCancel={cancelModal}
                width={460}
                footer={[
                    <Button key="back" onClick={openEditFamilyMemberModal}>
                        Редактировать
                    </Button>,
                    <Button key="submit" type="primary" onClick={openConfirmDeletingFamilyMemberModal}
                            disabled={(treeOwner || parents?.length) as boolean}>
                        Удалить
                    </Button>,
                ]}
            >
                <div className="avatar">
                    <FamilyMemberImage img={avatar}/>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text>Пол: {genderName}</Text>
                        {maidenName ? <Text>Девичья фамилия: {maidenName} </Text> : ""}
                        <Text>{status}: {spouse ? spouse : "нет"}</Text>
                        <Text>Дети: {children.length ? children.join(' ') : "нет"}</Text>
                        {bio?.length ? <Text strong>Биография:</Text> : ""}
                    </Space>
                    {bio?.length ? <Paragraph style={{maxHeight: 180, overflowY: "auto"}}>
                        {bio}
                    </Paragraph> : ""}
                </div>
            </Modal>
            <ConfirmDeletingFamilyMemberModal isModalOpen={isConfirmDeletingFamilyMemberOpen}
                                              setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                              id={id} setOpen={setOpen}/>
        </div>
    );
};
