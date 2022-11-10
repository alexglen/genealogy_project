import {IObjectConvertedInCamelNotationData, IObjectData} from "./models";
import {FEMALE, MALE} from "./constants";

export const getDateForFamilyMemberCard = (date: string): string => {
    const fullDate = new Date(date);
    const year = fullDate.getFullYear();
    const month = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',][fullDate.getMonth()];
    const day = fullDate.getDay() + 1;
    return `${day} ${month} ${year}`
}

export const getLifeYears = (birth: string | null, death: string | null) => {
    if (birth && !death) {
        return `р. ${new Date(birth).getFullYear()}`;
    } else if (birth && death) {
        return `${new Date(birth).getFullYear()} - ${new Date(death).getFullYear()}`
    }
}


export const convertDataMemberFamily = (data: IObjectData): IObjectConvertedInCamelNotationData => {
    const {
        first_name: firstName,
        last_name: lastName,
        maiden_name: maidenName,
        tree_owner: treeOwner,
        spouse,
        photo: avatar,
        birth,
        mother,
        id,
        bio,
        birth_ca: approximateBirthDate,
        death,
        death_ca: approximateDeathDate,
        father,
        gender,
        no_parents: isNoParents,
        ghost_parent: ghostParents
    } = data;
    return {
        firstName,
        lastName,
        maidenName,
        ghostParents,
        treeOwner,
        spouse,
        avatar,
        birth,
        mother,
        id,
        bio,
        approximateBirthDate,
        death,
        approximateDeathDate,
        father,
        gender,
        isNoParents,
        parents: [],
    }
}

export const convertDataMembersFamily =
    (convertedArray: IObjectConvertedInCamelNotationData[], treeOwnerFamilyMember: IObjectConvertedInCamelNotationData):
        IObjectConvertedInCamelNotationData => {

        const mother = convertedArray.find(({id}: any) => treeOwnerFamilyMember.mother === id);
        const father = convertedArray.find(({id}: any) => treeOwnerFamilyMember.father === id);

        if (mother && treeOwnerFamilyMember.parents) {
            treeOwnerFamilyMember.parents.push(mother);
            const granny = convertedArray.find(({id}: any) => id === mother.father);
            if (granny) {
                convertDataMembersFamily(convertedArray, mother)
            }
        }
        if (father && treeOwnerFamilyMember.parents) {
            treeOwnerFamilyMember.parents.push(father);
            const granny = convertedArray.find(({id}: any) => id === father.father);
            if (granny) {
                convertDataMembersFamily(convertedArray, father)
            }
        }
        return treeOwnerFamilyMember;
    }


export const getCookie = (name: string): string | undefined => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const clearAllCookies = (): void => {
    document.cookie.split(";").forEach(function (string: string) {
        document.cookie = string.replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

export const getClassesForFamilyMemberCard = (gender: string, death: string | null): string => {
    const cls = ["card"];

    if (gender === MALE && death) {
        cls.push('male-dead-color');
    } else if (gender === MALE && !death) {
        cls.push('male-alive-color');
    } else if (gender === FEMALE && death) {
        cls.push('female-dead-color');
    } else {
        cls.push('female-alive-color');
    }
    return cls.join(' ')
}

export const getButtonsForAddingParents = (mother: string | null, father: string | null): string[] => {
    const buttonsForAddingParents = new Set<string>([FEMALE, MALE]);

    [{mother, father}].forEach(({mother, father}) => {
        if (mother) {
            buttonsForAddingParents.delete(FEMALE);
        }
        if (father) {
            buttonsForAddingParents.delete(MALE);
        }
    })
    if (buttonsForAddingParents.size === 0) {
        buttonsForAddingParents.add("empty")
    }
    return Array.from(buttonsForAddingParents);
}


