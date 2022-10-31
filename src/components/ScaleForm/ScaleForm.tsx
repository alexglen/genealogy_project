import React from 'react';
import {Button, Tooltip} from "antd";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useScale} from "../../context/scaleContext";
import "./ScaleForm.scss";

export const ScaleForm: React.FC = () => {
    const {scale, changeScale} = useScale() as { scale: number, changeScale: (scale: number) => number };

    return (
        <div className='scale'>
            <Tooltip title="Увеличить">
                <Button type="primary" shape="circle" icon={<PlusCircleOutlined/>}
                        onClick={() => scale <= 1.8 && changeScale(scale + .25)}/>
            </Tooltip>
            <Button type="primary" shape="circle">{scale.toFixed(1)}</Button>
            <Tooltip title="Уменьшить">
                <Button type="primary" shape="circle" icon={<MinusCircleOutlined/>}
                        onClick={() => scale > 1 && changeScale(scale - .25)}/>
            </Tooltip>
        </div>
    )
}