import React from 'react';
import {Upload} from 'antd';
import ImgCrop from 'antd-img-crop';

export const FamilyMemberImage = ({avatar, setAvatar}: any) => {

    const onChange = ({fileList: newFileList}: any) => {
        setAvatar(newFileList);
    };

    return (
        <ImgCrop>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                className="upload-avatar"
                listType="picture-card"
                fileList={avatar}
                onChange={onChange}
            >
                {avatar.length < 1 && '+ Аватар'}
            </Upload>
        </ImgCrop>
    );
};
