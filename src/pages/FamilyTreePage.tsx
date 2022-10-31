import React, {useEffect, useState} from "react";
import {HeaderFamilyTree} from "../components/HeaderFamilyTree/HeaderFamilyTree";
import {RecursiveTreeNode} from "./RecursiveTreeNode";
import {Tree} from 'react-organizational-chart';
import {ScaleForm} from "../components/ScaleForm/ScaleForm";
import {IObjectConvertedInCamelNotationData, IObjectData} from "../models";
import {convertDataMemberFamily, convertDataMembersFamily} from "../helpers";
import {temporaryData} from "../temporaryData";
import {Typography} from "antd";

export const FamilyTreePage: React.FC = () => {
    const [data, setData] = useState<IObjectConvertedInCamelNotationData>({});

    // const getData = async () => {
    //     const res = await fetch("http://127.0.0.1:8000/api/v1/family/");
    //     if (res.ok) {
    //         return await res.json();
    //     }
    // }

    useEffect(() => {
        // getData().then(data => {
        const dataInCamelNotation: IObjectConvertedInCamelNotationData[] =
            temporaryData.map((memberFamily: IObjectData) => convertDataMemberFamily(memberFamily));

        const treeOwnerFamilyMember: IObjectConvertedInCamelNotationData =
            dataInCamelNotation.find(({treeOwner}: IObjectConvertedInCamelNotationData) => treeOwner) as IObjectConvertedInCamelNotationData;

        const convertedDataMembersFamily: IObjectConvertedInCamelNotationData =
            convertDataMembersFamily(dataInCamelNotation, treeOwnerFamilyMember);
        setData(convertedDataMembersFamily);
        // });
    }, []);

    return (
        <div>
            <HeaderFamilyTree firstName={data.firstName ?? "A"} lastName={data.lastName ?? "A"}/>
            {Object.keys(data).length ? <Tree label={<Typography.Title level={4}>
                Ваша родословная
            </Typography.Title>}>
                <RecursiveTreeNode key={data.id} {...data} />
            </Tree> : null}
            <ScaleForm/>
        </div>
    )
}

