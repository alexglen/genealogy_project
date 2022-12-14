import React, {useEffect, useState} from 'react';
import {Avatar, Button, Modal, Space, Typography} from 'antd';
import {UserOutlined} from "@ant-design/icons";
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
                                     setOpenEditableModal,
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
        setFamilyTreeData
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
            setSpouse(spouses?.first_name);
        })
    }, []);

    const cancelModal = (): void => {
        setOpen?.(false);
    };

    const openEditFamilyMemberModal = (): void => {
        setOpen?.(false);
        setOpenEditableModal?.(true);
    }

    const openConfirmDeletingFamilyMemberModal = (): void => {
        setIsConfirmDeletingFamilyMemberOpen(true);
    }

    const lifeYears = death ? `(${getDateForFamilyMemberCard(birth as string)} - ${getDateForFamilyMemberCard(death)})`
        : `(??. ${getDateForFamilyMemberCard(birth as string)})`;

    const status: "??????" | "????????" = gender === FEMALE ? "??????" : "????????";
    const genderName: "??????????????" | "??????????????" = gender === FEMALE ? "??????????????" : "??????????????";

    return (
        <div>
            <Modal
                open={open}
                title={`${firstName} ${lastName} ${lifeYears}`}
                onCancel={cancelModal}
                width={460}
                footer={[
                    <Button key="back" onClick={openEditFamilyMemberModal}>
                        ??????????????????????????
                    </Button>,
                    <Button key="submit" type="primary" onClick={openConfirmDeletingFamilyMemberModal}
                            disabled={(treeOwner || parents?.length) as boolean}>
                        ??????????????
                    </Button>,
                ]}
            >
                <div className="avatar">
                    <Avatar size={80} icon={<UserOutlined/>} src={avatar}/>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text>??????: {genderName}</Text>
                        {maidenName ? <Text>?????????????? ??????????????: {maidenName} </Text> : ""}
                        <Text>{status}: {spouse ? spouse : "??????"}</Text>
                        <Text>????????: {children.length ? children.join(' ') : "??????"}</Text>
                        {bio?.length ? <Text strong>??????????????????:</Text> : ""}
                    </Space>
                    {bio?.length ? <Paragraph style={{maxHeight: 180, overflowY: "auto"}}>
                        {bio}
                    </Paragraph> : ""}
                </div>
            </Modal>
            {isConfirmDeletingFamilyMemberOpen ?
                <ConfirmDeletingFamilyMemberModal isModalOpen={isConfirmDeletingFamilyMemberOpen}
                                                  setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                                  id={id} setOpen={setOpen} setFamilyTreeData={setFamilyTreeData}/> : null}
        </div>
    );
};
