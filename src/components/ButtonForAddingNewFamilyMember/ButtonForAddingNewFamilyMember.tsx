import React from "react";
import {Button} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import './ButtonForAddingNewFamilyMember.scss';

export const ButtonForAddingNewFamilyMember = ({color, setOpenEditableModal, scale}: any) => {
    const size = (scale > 1.6) ? "large" : (scale >= 1.3) ? "middle" : "small";
    // @ts-ignore
    return <Button shape="circle" icon={<PlusCircleFilled/>} style={{color: color}} setOpenEditableModal
                   onClick={() => setOpenEditableModal(true)} className="button-for-adding" size={size}/>
}
