import React from "react";
import {TreeNode} from "react-organizational-chart";
import {Button, Tooltip} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

export const ButtonForAddingNewFamilyMember = ({color, setOpenEditableModal, scale}: any) => {
    const size = (scale > 1.5) ? "middle" : (scale > 2) ? "large" : "small";
    // @ts-ignore
    return <Button shape="circle" icon={<PlusCircleFilled/>} style={{color: color}} setOpenEditableModal
                   onClick={() => setOpenEditableModal(true)} size={size}/>

}
