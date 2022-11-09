import React from "react";
import {Modal} from "antd";
import {IConfirmDeletingFamilyMemberModal} from "../../models";
import {deletePerson} from "../../requests";

export const ConfirmDeletingFamilyMemberModal = ({
                                                     isModalOpen,
                                                     setIsConfirmDeletingFamilyMemberOpen,
                                                     id,
                                                     setEditableModal,
                                                     setOpen,
                                                     setFamilyTreeData
                                                 }: IConfirmDeletingFamilyMemberModal) => {

    const deleteFamilyMember = () => {
        deletePerson(id as number).then(response => {
            setIsConfirmDeletingFamilyMemberOpen(false);
            // setOpen(false);
            setEditableModal(false);
            console.log('response in DELETE')
            setFamilyTreeData(response?.data);
        })
    };

    const cancelModal = () => {
        setIsConfirmDeletingFamilyMemberOpen(false);
    };
    return (
        <Modal title="Удаление предка из древа" open={isModalOpen} onOk={deleteFamilyMember} onCancel={cancelModal}>
            <p>Вы уверены, что хотите удалить предка?</p>
        </Modal>
    )
}
