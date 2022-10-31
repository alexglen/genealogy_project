import {IObjectConvertedInCamelNotationData, IObjectData} from "./models";

export const getDateForFamilyMemberCard = (date: string): string => {
    const fullDate = new Date(date);
    const year = fullDate.getFullYear();
    const month = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',][fullDate.getMonth()];
    const day = fullDate.getDay() + 1;
    return `${day} ${month} ${year}`
}

// export const getYearsOfLife = (birthDate: string, deathDate: string): string => {
//     const yearOfBirth = new Date(birthDate).getFullYear();
//     if (deathDate) {
//         const yearOfDeath = new Date(deathDate).getFullYear();
//         return `(${yearOfBirth}-${yearOfDeath})`
//     } else {
//         return `(р. ${yearOfBirth})`
//     }
// }

export const convertDataMemberFamily = (data: IObjectData): IObjectConvertedInCamelNotationData => {
    const {
        first_name: firstName,
        last_name: lastName,
        maiden_name: maidenName,
        tree_owner: treeOwner,
        spouse,
        photo: avatar,
        birth: birthDate,
        mother,
        id,
        bio,
        birth_ca: approximateBirthDate,
        death: deathDate,
        death_ca: approximateDeathDate,
        father,
        gender,
        no_parents: isNoParents,
    } = data;
    return {
        firstName,
        lastName,
        maidenName,
        treeOwner,
        spouse,
        avatar,
        birthDate,
        mother,
        id,
        bio,
        approximateBirthDate,
        deathDate,
        approximateDeathDate,
        father,
        gender,
        isNoParents,
        parents: [],
    }
}

// const addParents = (relative, treeOwnerFamilyMember, convertedArray) => {
//     if (relative) {
//         treeOwnerFamilyMember.parents.push(relative);
//
//         const granny = convertedArray.find(({id}) => id === relative.mother);
//         if (granny) {
//             convertDataMembersFamily(convertedArray, relative)
//         }
//     }
// }

const setNull = (object: IObjectConvertedInCamelNotationData): IObjectConvertedInCamelNotationData => {
    let newObject: any = {};
    for (let key in object) {
        if (["bio", "firstName", "lastName"].includes(key)) {
            newObject[key] = "";
        } else if (key === "gender") {
            newObject[key] = object[key]
        } else if (["isNoParents", "treeOwner"].includes(key)) {
            newObject[key] = false;
        } else {
            newObject[key] = null;
        }
    }
    return newObject;
}

export const convertDataMembersFamily =
    (convertedArray: IObjectConvertedInCamelNotationData[], treeOwnerFamilyMember: IObjectConvertedInCamelNotationData):
        IObjectConvertedInCamelNotationData => {

        const mother = convertedArray.find(({id}: any) => treeOwnerFamilyMember.mother === id);
        const father = convertedArray.find(({id}: any) => treeOwnerFamilyMember.father === id);

        if (mother && treeOwnerFamilyMember.parents && father) {
            treeOwnerFamilyMember.parents.push(mother);
            const granny = convertedArray.find(({id}: any) => id === father.mother);
            if (granny) {
                convertDataMembersFamily(convertedArray, mother)
            }
        }
        if (father && treeOwnerFamilyMember.parents) {
            treeOwnerFamilyMember.parents.push(father);
            const granny = convertedArray.find(({id}: any) => id === father.mother);
            if (granny) {
                convertDataMembersFamily(convertedArray, father)
            }
        }

        if (mother?.isNoParents || father?.isNoParents) {
            convertDataMembersFamily(convertedArray, setNull(father as IObjectConvertedInCamelNotationData))
        }
        return treeOwnerFamilyMember;
    }
