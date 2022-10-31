import React, {useState} from 'react';
import {Button, Modal, Space, Typography} from 'antd';
import {FamilyMemberImage} from "../FamilyMemberImage/FamilyMemberImage";
import {ConfirmDeletingFamilyMemberModal} from "../ConfirmDeletingFamilyMemberModal/ConfirmDeletingFamilyMemberModal";
import {FamilyMemberInfoType, IObjectData} from "../../models";
import {getDateForFamilyMemberCard} from "../../helpers";
import {temporaryData} from "../../temporaryData";
import {FEMALE} from "../../constants";
import "./FamilyMemberInfo.scss";

const {Text, Paragraph} = Typography;

export const FamilyMemberInfo = ({setOpen, open, familyMember, setOpenEditableModal}: FamilyMemberInfoType) => {
    const {
        firstName,
        lastName,
        maidenName,
        treeOwner,
        spouse,
        avatar,
        birthDate,
        id,
        bio,
        deathDate,
        gender,
        parents
    } = familyMember;
    const [isConfirmDeletingFamilyMemberOpen, setIsConfirmDeletingFamilyMemberOpen] = useState<boolean>(false);

    const cancelModal = () => {
        setOpen?.(false);
    };

    const openEditFamilyMemberModal = () => {
        setOpen?.(false);
        setOpenEditableModal?.(true);
    }

    const deleteFamilyMember = () => {
        setIsConfirmDeletingFamilyMemberOpen(true);
    }

    const lifeYears = deathDate ? `(${getDateForFamilyMemberCard(birthDate as string)} - ${getDateForFamilyMemberCard(deathDate)})`
        : `(р. ${getDateForFamilyMemberCard(birthDate as string)})`;

    const status: "Муж" | "Жена" = gender === FEMALE ? "Муж" : "Жена";
    const genderName: "женский" | "мужской" = gender === FEMALE ? "женский" : "мужской";
    const spouses: IObjectData[] = temporaryData.filter(({id}) => spouse?.includes(id));
    const spousesNames: string[] | [] = spouses.length > 0 ? spouses.map(({
                                                                              first_name,
                                                                              last_name
                                                                          }) => `${first_name} ${last_name}`) : [];

    return (
        <div className="family-member-info">
            <Modal
                open={open}
                title={`${firstName} ${lastName} ${lifeYears}`}
                onCancel={cancelModal}
                width={460}
                footer={[
                    <Button key="back" onClick={openEditFamilyMemberModal}>
                        Редактировать
                    </Button>,
                    <Button key="submit" type="primary" onClick={deleteFamilyMember}
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
                        {spouse?.length as number > 0 ? <Text>{status}: {spousesNames?.join(" ,")}</Text> : null}
                        <Text>Дети: нет</Text>
                        {bio?.length ? <Text strong>Биография:</Text> : ""}
                    </Space>
                    {bio?.length ? <Paragraph style={{maxHeight: 180, overflowY: "auto"}}>
                        {bio}
                    </Paragraph> : ""}
                </div>
            </Modal>
            <ConfirmDeletingFamilyMemberModal isModalOpen={isConfirmDeletingFamilyMemberOpen}
                                              setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                              id={id}/>
        </div>
    );
};
