import React from "react";
import {HeaderFamilyTree} from "../components/HeaderFamilyTree/HeaderFamilyTree";

export const FamilyTreesPage = () => {
    return (
        <>
            <HeaderFamilyTree firstName={"A"} lastName={"A"}/>
            <h1>Мои деревья</h1>
        </>
    )
}