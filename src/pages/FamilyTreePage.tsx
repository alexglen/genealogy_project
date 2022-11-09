import React, {useEffect, useState} from "react";
import {HeaderFamilyTree} from "../components/HeaderFamilyTree/HeaderFamilyTree";
import {RecursiveTreeNode} from "./RecursiveTreeNode";
import {Tree} from 'react-organizational-chart';
import {ScaleForm} from "../components/ScaleForm/ScaleForm";
import {IObjectConvertedInCamelNotationData, IObjectData} from "../models";
import {convertDataMemberFamily, convertDataMembersFamily} from "../helpers";
import {Typography} from "antd";
import {getData} from "../requests";
import {useQuery} from "react-query";
import {Loading} from "../components/Loading/Loading";

export const FamilyTreePage = () => {

    const [data, setData] = useState([]);
    const [familyTreeData, setFamilyTreeData] = useState<any>({});

    useEffect(() => {
        getData().then((res) => {
            setData(res);
            if (data.length) {
                const dataInCamelNotation: IObjectConvertedInCamelNotationData[] =
                    data.map((memberFamily: IObjectData) => convertDataMemberFamily(memberFamily));

                console.log("dataInCamelNotation", dataInCamelNotation)

                const treeOwnerFamilyMember: IObjectConvertedInCamelNotationData =
                    dataInCamelNotation.find(({treeOwner}: IObjectConvertedInCamelNotationData) => treeOwner) as IObjectConvertedInCamelNotationData;
                console.log("treeOwnerFamilyMember", treeOwnerFamilyMember)

                const convertedDataMembersFamily: any =
                    convertDataMembersFamily(dataInCamelNotation, treeOwnerFamilyMember);
                setFamilyTreeData(convertedDataMembersFamily);

                console.log('convertedDataMembersFamily', convertedDataMembersFamily)
            }
        })
    }, [data.length]);


    console.log('familyTreeData', familyTreeData)

    //
    // if (isLoading) {
    //     return <Loading/>
    // }

    return (
        <div>
            <HeaderFamilyTree firstName={familyTreeData?.firstName ?? "A"} lastName={familyTreeData?.lastName ?? "A"}/>
            {Object.keys(familyTreeData).length ? <Tree label={<Typography.Title level={4}>
                Ваша родословная
            </Typography.Title>}>
                <RecursiveTreeNode key={familyTreeData.id} setFamilyTreeData={setData} {...familyTreeData}/>
            </Tree> : null}
            <ScaleForm/>
        </div>
    )
}

