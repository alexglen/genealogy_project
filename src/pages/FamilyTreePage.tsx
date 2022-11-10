import React, {useEffect, useState} from "react";
import {ErrorComponent} from "../components/ErrorComponent/ErrorComponent";
import {HeaderFamilyTree} from "../components/HeaderFamilyTree/HeaderFamilyTree";
import {Loading} from "../components/Loading/Loading";
import {ScaleForm} from "../components/ScaleForm/ScaleForm";
import {RecursiveTreeNode} from "./RecursiveTreeNode";
import {Tree} from 'react-organizational-chart';
import {getData} from "../requests";
import {Typography} from "antd";
import {IObjectConvertedInCamelNotationData, IObjectData} from "../models";
import {convertDataMemberFamily, convertDataMembersFamily} from "../helpers";

export const FamilyTreePage: React.FC = () => {
    const [data, setData] = useState<IObjectData[]>([]);
    const [familyTreeData, setFamilyTreeData] = useState<IObjectConvertedInCamelNotationData>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        getData().then((response) => {
            setIsLoading(true);
            setData(response);
            if (data.length) {
                const dataInCamelNotation: IObjectConvertedInCamelNotationData[] =
                    data.map((memberFamily: IObjectData) => convertDataMemberFamily(memberFamily));

                const treeOwnerFamilyMember: IObjectConvertedInCamelNotationData =
                    dataInCamelNotation.find(({treeOwner}: IObjectConvertedInCamelNotationData) => treeOwner) as IObjectConvertedInCamelNotationData;

                const convertedDataMembersFamily: IObjectConvertedInCamelNotationData =
                    convertDataMembersFamily(dataInCamelNotation, treeOwnerFamilyMember);
                setFamilyTreeData(convertedDataMembersFamily);
                setIsLoading(false);
            }
        }).catch(({message}) => {
            setError(`Что-то пошло не так: ${message}`);
        });
    }, [data.length]);


    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <ErrorComponent errorText={error}/>;
    }

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
};