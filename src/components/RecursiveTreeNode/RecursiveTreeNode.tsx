import React from "react";
import {TreeNode} from "react-organizational-chart";
import {FamilyMemberCard} from "../FamilyMemberCard/FamilyMemberCard";
import {IObjectConvertedInCamelNotationData} from "../../models";

export const RecursiveTreeNode = (props: IObjectConvertedInCamelNotationData) => {
    return (
        <TreeNode label={<div style={{width: "80%", margin: "0 auto"}}><FamilyMemberCard familyMember={props}/></div>}>
            {props.parents ? props.parents.map((familyMember: any) =>
                <RecursiveTreeNode
                    setFamilyTreeData={props?.setFamilyTreeData}
                    setWasDataChanged={props?.setWasDataChanged} {...familyMember}
                    key={familyMember.id}/>) : null}
        </TreeNode>
    )
};
