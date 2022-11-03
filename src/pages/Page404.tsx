import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";

export const Page404: React.FC = () => {
    const navigator = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Извините, но эта страница не существует!"
            extra={<Button type="primary" onClick={() => navigator("/")}>Вернуться на главную страницу</Button>}
        />
    )
}
