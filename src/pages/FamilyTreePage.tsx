import React, {useEffect, useState} from "react";
import {HeaderFamilyTree} from "../components/HeaderFamilyTree/HeaderFamilyTree";
import {RecursiveTreeNode} from "./RecursiveTreeNode";
import {Tree} from 'react-organizational-chart';
import {ScaleForm} from "../components/ScaleForm/ScaleForm";
import {IObjectConvertedInCamelNotationData, IObjectData} from "../models";
import {convertDataMemberFamily, convertDataMembersFamily} from "../helpers";
import {Typography} from "antd";
import {getData} from "../requests";
import {CreateFirstFamilyMember} from "../components/CreateFirstFamilyMember/CreateFirstFamilyMember";
import {useQuery} from "react-query";

import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';


export const FamilyTreePage: React.FC = () => {
    const [familyTreeData, setFamilyTreeData] = useState<any>({});
    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

    // useEffect(() => {
    //     getData().then((data: any) => {
    //         if (data.length) {
    //             const dataInCamelNotation: IObjectConvertedInCamelNotationData[] =
    //                 data.map((memberFamily: IObjectData) => convertDataMemberFamily(memberFamily));
    //
    //             const treeOwnerFamilyMember: IObjectConvertedInCamelNotationData =
    //                 dataInCamelNotation.find(({treeOwner}: IObjectConvertedInCamelNotationData) => treeOwner) as IObjectConvertedInCamelNotationData;
    //
    //             const convertedDataMembersFamily: any =
    //                 convertDataMembersFamily(dataInCamelNotation, treeOwnerFamilyMember);
    //
    //             setFamilyTreeData(convertedDataMembersFamily);
    //         }
    //     });
    // }, [Object.keys(familyTreeData).length]);


    const {isLoading, error, data} = useQuery('repoData', () => {
            getData().then((data: any) => {
                if (data.length) {
                    const dataInCamelNotation: IObjectConvertedInCamelNotationData[] =
                        data.map((memberFamily: IObjectData) => convertDataMemberFamily(memberFamily));

                    const treeOwnerFamilyMember: IObjectConvertedInCamelNotationData =
                        dataInCamelNotation.find(({treeOwner}: IObjectConvertedInCamelNotationData) => treeOwner) as IObjectConvertedInCamelNotationData;

                    const convertedDataMembersFamily: any =
                        convertDataMembersFamily(dataInCamelNotation, treeOwnerFamilyMember);

                    setFamilyTreeData(convertedDataMembersFamily);
                }
            })
        }
    )

    if (isLoading) {
        return <h1>eeeeeeeeeeeeeeeeeeeeeeeeee</h1>
    }

    console.log('REACT QUERY', isLoading, error, data)

    // if (!Object.keys(familyTreeData).length) {
    //     return (
    //         <>
    //             <HeaderFamilyTree firstName={familyTreeData.firstName ?? "A"}
    //                               lastName={familyTreeData.lastName ?? "A"}/>
    //             <CreateFirstFamilyMember/>
    //         </>
    //     )
    // }

    return (
        <div>
            <HeaderFamilyTree firstName={familyTreeData?.firstName ?? "A"} lastName={familyTreeData?.lastName ?? "A"}/>
            {Object.keys(familyTreeData).length ? <Tree label={<Typography.Title level={4}>
                Ваша родословная
            </Typography.Title>}>
                <RecursiveTreeNode key={familyTreeData.id} {...familyTreeData} />
            </Tree> : null}
            <ScaleForm/>
        </div>
    )
}

