import React from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import './Loading.scss';

export const Loading = () => {
    const antIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;
    return (
        <div className='loading'>
            <Spin indicator={antIcon}/>
        </div>
    )
}