export interface IObjectData {
    "id": number,
    "gender": "M" | "F",
    "first_name": string,
    "last_name": string,
    "maiden_name": string | null,
    "birth": string,
    "death": string | null,
    "birth_ca": string | null,
    "death_ca": string | null,
    "spouse": number[],
    "father": number | null,
    "mother": number | null,
    "bio": string,
    "photo": string | null,
    "tree_owner": boolean,
    "no_parents": boolean,
}

export interface IObjectConvertedInCamelNotationData {
    approximateBirthDate?: string | null,
    approximateDeathDate?: string | null,
    avatar?: string | null,
    bio?: string,
    birthDate?: string | null,
    deathDate?: string | null,
    father?: number | null,
    firstName?: string | null,
    gender?: "M" | "F",
    id?: number,
    isNoParents?: boolean,
    lastName?: string,
    maidenName?: string | null,
    mother?: number | null,
    parents?: IObjectConvertedInCamelNotationData[],
    spouse?: number[],
    treeOwner?: boolean,
}

export type FamilyMemberInfoType = {
    setOpen?: (open: boolean) => any,
    open?: boolean,
    familyMember: IObjectConvertedInCamelNotationData,
    setOpenEditableModal?: (open: boolean) => any,
    openEditableModal?: boolean,
    isOpenEditableModal?: boolean
}