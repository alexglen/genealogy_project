import React from "react";
import {Modal} from "antd";
import {IConfirmDeletingFamilyMemberModal} from "../../models";
import {deletePerson} from "../../requests";

export const ConfirmDeletingFamilyMemberModal = ({
                                                     isModalOpen,
                                                     setIsConfirmDeletingFamilyMemberOpen,
                                                     id,
                                                     setOpenEditableModal,
                                                     setOpen,
                                                     setFamilyTreeData
                                                 }: IConfirmDeletingFamilyMemberModal) => {

    const deleteFamilyMember = (): void => {
        deletePerson(id as number).then(response => {
            cancelModal();
            setOpen?.(false);
            setOpenEditableModal?.(false);
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
