import React from "react";
import {TreeNode} from "react-organizational-chart";
import {FamilyMemberCard} from "../components/FamilyMemberCard/FamilyMemberCard";
import {IObjectConvertedInCamelNotationData} from "../models";

export const RecursiveTreeNode1: any = (props: IObjectConvertedInCamelNotationData) => {
    console.log('count', props)
    return (
        // @ts-ignore
        <TreeNode label={<div style={{width: "80%", margin: "0 auto"}}><FamilyMemberCard familyMember={props}/></div>}>
            {props.parents ? props.parents.map((familyMember: any) =>
                <RecursiveTreeNode setFamilyTreeData={props?.setFamilyTreeData} {...familyMember}
                                   key={familyMember.id}/>) : null}
        </TreeNode>
    )
};

export const RecursiveTreeNode = React.memo(RecursiveTreeNode1);