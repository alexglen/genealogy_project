import React, {useState} from "react";
import {ButtonForAddingNewFamilyMember} from "../ButtonForAddingNewFamilyMember/ButtonForAddingNewFamilyMember";
import {FamilyMemberEditableModal} from "../FamilyMemberEditableModal/FamilyMemberEditableModal";
import {FamilyMemberInfo} from "../FamilyMemberInfo/FamilyMemberInfo";
import {TreeNode} from "react-organizational-chart";
import {IObjectConvertedInCamelNotationData} from "../../models";
import {FEMALE, FEMALE_BUTTON_COLOR, FEMALE_COLOR, MALE, MALE_BUTTON_COLOR, MALE_COLOR} from "../../constants";
import {useScale} from "../../context/scaleContext";
import "./FamilyMemberCard.scss";

// @ts-ignore
export const FamilyMemberCard = ({familyMember}: IObjectConvertedInCamelNotationData) => {
    console.log("familyMember", familyMember);
    const {
        firstName,
        lastName,
        avatar,
        gender,
        mother,
        father
    } = familyMember;

    const [open, setOpen] = useState<boolean>(false);

    const {scale} = useScale() as { scale: number };
    const [isOpenEditableModal, setOpenEditableModal] = useState(false);
    const cardColor = gender === MALE ? MALE_COLOR : FEMALE_COLOR;

    const classes = ["card"];
    if (gender === MALE) {
        classes.push('male-color')
    } else {
        classes.push('female-color')
    }

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

    return (
        <>
            <TreeNode label={
                <div>
                    <div className={classes.join(" ")} style={{height: 120 * scale, width: 75 * scale}}>
                        <p style={{fontSize: 12}}>{firstName}</p>
                        {avatar ? <img src={avatar} alt="avatar" onClick={() => setOpen(true)}/>
                            : <img alt="avatar"
                                   src={"https://orgs.ncsu.edu/student-govt/wp-content/uploads/sites/8/2014/07/EMPTY1.png"}
                                   onClick={() => setOpen(true)}/>}

                        <div className="buttons-for-adding">
                            {Array.from(buttonsForAddingParents)?.map(gender => {
                                    if (gender === "empty") {
                                        return <p style={{fontSize: 12}}>{lastName}</p>
                                    } else {
                                        return <ButtonForAddingNewFamilyMember
                                            key={gender}
                                            color={gender === MALE ? FEMALE_BUTTON_COLOR : MALE_BUTTON_COLOR}
                                            setOpenEditableModal={setOpenEditableModal} scale={scale}/>
                                    }
                                }
                            )}
                        </div>
                    </div>

                </div>


            }/>
            <FamilyMemberInfo setOpen={setOpen} open={open} familyMember={familyMember}
                              setOpenEditableModal={setOpenEditableModal}/>
            <FamilyMemberEditableModal
                isOpenEditableModal={isOpenEditableModal}
                familyMember={familyMember}
                setOpenEditableModal={setOpenEditableModal}
            />
        </>
    )
}

