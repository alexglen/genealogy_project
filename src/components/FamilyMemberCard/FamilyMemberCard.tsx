import React, {useState} from "react";
import {AddFamilyMemberModal} from "../AddFamilyMemberModal/AddFamilyMemberModal";
import {ButtonForAddingNewFamilyMember} from "../ButtonForAddingNewFamilyMember/ButtonForAddingNewFamilyMember";
import {FamilyMemberEditableModal} from "../FamilyMemberEditableModal/FamilyMemberEditableModal";
import {FamilyMemberInfo} from "../FamilyMemberInfo/FamilyMemberInfo";
import {TreeNode} from "react-organizational-chart";
import {useScale} from "../../context/scaleContext";
import {getButtonsForAddingParents, getClassesForFamilyMemberCard, getLifeYears} from "../../helpers";
import {IObjectConvertedInCamelNotationData} from "../../models";
import {MALE} from "../../constants";
import "./FamilyMemberCard.scss";

export const FamilyMemberCard = ({familyMember}: { familyMember: IObjectConvertedInCamelNotationData }) => {
    const {
        firstName,
        lastName,
        avatar,
        gender,
        mother,
        father,
        setFamilyTreeData,
        death,
        birth,
    } = familyMember;

    const {scale} = useScale() as { scale: number };

    const [openFamilyMemberInfoModal, setFamilyMemberInfoModal] = useState<boolean>(false);

    const [isOpenEditableModal, setOpenEditableModal] = useState<boolean>(false);

    const [addFamilyMemberModal, setAddFamilyMemberModal] =
        useState<{ isOpenModal: boolean, gender: string }>({
            isOpenModal: false,
            gender: ""
        });

    const [isConfirmDeletingFamilyMemberOpen, setIsConfirmDeletingFamilyMemberOpen] = useState<boolean>(false);

    return (
        <>
            <TreeNode label={
                <div>
                    <div className={getClassesForFamilyMemberCard(gender as string, death as string | null)}
                         style={{height: 160 * scale, width: 90 * scale}}>
                        <p style={{fontSize: 14}}>{firstName}</p>
                        <p style={{fontSize: 12}}>{(birth || death) ? getLifeYears(birth as string | null, death as string | null) : "Годы жизни ?"}</p>
                        {avatar ? <img src={avatar} alt="avatar" onClick={() => setFamilyMemberInfoModal(true)}/>
                            : <img alt="avatar"
                                   src={gender === MALE ? "https://orgs.ncsu.edu/student-govt/wp-content/uploads/sites/8/2014/07/EMPTY1.png"
                                       : "https://mamushki.ru/wp-content/uploads/2020/11/team_fpo-woman-1100x1100.png"}
                                   onClick={() => setFamilyMemberInfoModal(true)}/>}

                        <div className="buttons-for-adding">
                            {getButtonsForAddingParents(mother as string | null, father as string | null).map(gender => {
                                    if (gender === "empty") {
                                        return <p style={{fontSize: 14}} key={gender}>{lastName}</p>
                                    } else {
                                        return <ButtonForAddingNewFamilyMember
                                            key={gender}
                                            gender={gender}
                                            setAddFamilyMemberModal={setAddFamilyMemberModal} scale={scale}/>
                                    }
                                }
                            )}
                        </div>
                        {/*{scale > 1.5 ? (<p>{"Hola"}</p>) : null}*/}
                    </div>

                </div>


            }/>
            {openFamilyMemberInfoModal ?
                <FamilyMemberInfo setOpen={setFamilyMemberInfoModal} open={openFamilyMemberInfoModal}
                                  familyMember={familyMember}
                                  setOpenEditableModal={setOpenEditableModal}
                                  isConfirmDeletingFamilyMemberOpen={isConfirmDeletingFamilyMemberOpen}
                                  setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
                                  isOpenEditableModal={isOpenEditableModal}/> : null}
            {isOpenEditableModal ? <FamilyMemberEditableModal
                isOpenEditableModal={isOpenEditableModal}
                familyMember={familyMember}
                setOpenEditableModal={setOpenEditableModal}
                setOpen={setFamilyMemberInfoModal}
                setFamilyTreeData={setFamilyTreeData}
                isConfirmDeletingFamilyMemberOpen={isConfirmDeletingFamilyMemberOpen}
                setIsConfirmDeletingFamilyMemberOpen={setIsConfirmDeletingFamilyMemberOpen}
            /> : null}
            {addFamilyMemberModal.isOpenModal ? <AddFamilyMemberModal addFamilyMemberModal={addFamilyMemberModal}
                                                                      setAddFamilyMemberModal={setAddFamilyMemberModal}
                                                                      familyMember={familyMember}

            /> : null}
        </>
    )
};

