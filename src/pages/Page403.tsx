import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";

export const Page403: React.FC = () => {
    const navigator = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Извините, но у вас нет прав на посещение этой страницы"
            extra={<Button type="primary" onClick={() => navigator("/")}>Вернуться на главную страницу</Button>}
        />
    )
}
