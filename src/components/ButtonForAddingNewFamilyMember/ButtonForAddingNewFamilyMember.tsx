import React, {useState} from "react";
import {Button} from "antd";
import {IButtonForAddingNewFamilyMember} from "../../models";
import {PlusCircleFilled} from "@ant-design/icons";
import {FEMALE_BUTTON_COLOR, MALE, MALE_BUTTON_COLOR} from "../../constants";

export const ButtonForAddingNewFamilyMember = ({
                                                   gender,
                                                   setAddFamilyMemberModal,
                                                   scale
                                               }: IButtonForAddingNewFamilyMember) => {
    const size = (scale > 1.6) ? "large" : (scale >= 1.3) ? "middle" : "small";
    const color = gender === MALE ? FEMALE_BUTTON_COLOR : MALE_BUTTON_COLOR;

    return <Button shape="circle" icon={<PlusCircleFilled/>} style={{color: color}}
                   onClick={() => setAddFamilyMemberModal((state: { isOpenModal: boolean }) => ({
                       isOpenModal: true,
                       gender
                   }))} className="button-for-adding" size={size}/>
}

