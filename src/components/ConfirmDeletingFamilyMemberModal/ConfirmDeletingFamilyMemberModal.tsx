import React from "react";
import {Modal} from "antd";
import {IConfirmDeletingFamilyMemberModal} from "../../models";

export const ConfirmDeletingFamilyMemberModal = ({
                                                     isModalOpen,
                                                     setIsConfirmDeletingFamilyMemberOpen,
                                                     id
                                                 }: IConfirmDeletingFamilyMemberModal) => {

    const deleteFamilyMember = async () => {
        setIsConfirmDeletingFamilyMemberOpen(false);
        const res = await fetch(`http://127.0.0.1:8000/api/v1/family/${id}`, {
            method: 'DELETE',
        });
        console.log("RES", res);
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
