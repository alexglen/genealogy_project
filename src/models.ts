import {
    ButtonForAddingNewFamilyMember
} from "./components/ButtonForAddingNewFamilyMember/ButtonForAddingNewFamilyMember";
import {
    ConfirmDeletingFamilyMemberModal
} from "./components/ConfirmDeletingFamilyMemberModal/ConfirmDeletingFamilyMemberModal";

export interface IObjectData {
    "id": number,
    "ghost_parent": boolean,
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
    ghostParents?: boolean,
    avatar?: string | null,
    bio?: string,
    birth?: string | null,
    death?: string | null,
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
    setFamilyTreeData?: any
}

export type FamilyMemberInfoType = {
    setOpen?: (open: boolean) => any,
    open?: boolean,
    familyMember: IObjectConvertedInCamelNotationData,
    setEditableModal?: any,
    openEditableModal?: any,
    isOpenEditableModal?: any
    isConfirmDeletingFamilyMemberOpen: boolean,
    setIsConfirmDeletingFamilyMemberOpen: any,
    editableModal: any,
    setFamilyTreeData?: any
}

export interface IUser {
    email: string,
    password: string,
    rePassword: string,
    username: string,
    lastName?: string,
    gender: string,
    date?: string
}

export interface IButtonForAddingNewFamilyMember {
    gender: string,
    setAddFamilyMemberModal: any,
    scale: number
}

export interface IConfirmDeletingFamilyMemberModal {
    isModalOpen: boolean,
    setIsConfirmDeletingFamilyMemberOpen: (open: boolean) => void,
    id: number | undefined,
    setEditableModal?: any,
    setOpen?: any,
    setFamilyTreeData?: any
}

export interface ILogin {
    username: string,
    password: string,
    remember: boolean
}
