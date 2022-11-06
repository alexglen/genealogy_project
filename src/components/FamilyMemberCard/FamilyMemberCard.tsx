import React, {useState} from "react";
import {ButtonForAddingNewFamilyMember} from "../ButtonForAddingNewFamilyMember/ButtonForAddingNewFamilyMember";
import {FamilyMemberEditableModal} from "../FamilyMemberEditableModal/FamilyMemberEditableModal";
import {FamilyMemberInfo} from "../FamilyMemberInfo/FamilyMemberInfo";
import {TreeNode} from "react-organizational-chart";
import {IObjectConvertedInCamelNotationData} from "../../models";
import {FEMALE, FEMALE_BUTTON_COLOR, MALE, MALE_BUTTON_COLOR} from "../../constants";
import {useScale} from "../../context/scaleContext";
import "./FamilyMemberCard.scss";

// @ts-ignore
export const FamilyMemberCard = ({familyMember}: IObjectConvertedInCamelNotationData) => {
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
    const [editableModal, setEditableModal] = useState<{ isOpenModal: boolean, isNewFamilyMember: boolean, gender: string }>({
        isOpenModal: false,
        isNewFamilyMember: false,
        gender: ""
    });
    const [isConfirmDeletingFamilyMemberOpen, setIsConfirmDeletingFamilyMemberOpen] = useState<boolean>(false);

    const classes = ["card"];
    if (gender === MALE) {
        classes.push('male-color')
    } else {
        classes.push('female-color')
    }

    const buttonsForAddingParents = new Set<string>([FEMALE, MALE]);
    console.log('1buttonsForAddingParents', buttonsForAddingParents);

    [{mother: null, father: null}].forEach(({mother, father}) => {
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

    console.log('buttonsForAddingParents', buttonsForAddingParents)

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
                                        return <p style={{fontSize: 12}} key={gender}>{lastName}</p>
                                    } else {
                                        return <ButtonForAddingNewFamilyMember
                                            key={gender}
                                            gender={gender}
                                            setEditableModal={setEditableModal} scale={scale}/>
                                    }
                                }
                            )}
                        </div>
                    </div>

                </div>


            }/>
            <FamilyMemberInfo setOpen={setOpen} open={open} familyMember={familyMember}
                              setEditableModal={setEditableModal}
                              isConfirmDeletingFamilyMemberOpen={isConfirmDeletingFamilyMemberOpen}
                              setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                              editableModal={editableModal}/>
            <FamilyMemberEditableModal
                editableModal={editableModal}
                familyMember={familyMember}
                setEditableModal={setEditableModal}
                isConfirmDeletingFamilyMemberOpen={isConfirmDeletingFamilyMemberOpen}
                setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                setOpen={setOpen}
            />
        </>
    )
}

