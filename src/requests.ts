import axios from "axios";
import {ILogin, IUser} from "./models";
import {clearAllCookies, getCookie} from "./helpers";

export const register = async (data: IUser) => {
    const body = {...data, re_password: data.rePassword};
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', body);

        document.cookie = `userId=${res.data.id}; max-age=3600000`;
        return res;
    } catch (error) {
        console.log("error in registerUser", error)
    }
}

export const loginUser = async ({username, password, remember}: ILogin) => {
    try {
        const response = await axios.post(' http://127.0.0.1:8000/api/v1/auth/token/login/',
            {username, password});

        const {auth_token} = response.data;
        document.cookie = `token=${auth_token}`;
        if (remember) {
            document.cookie = `token=${auth_token}; max-age=3600000`;
        }
        return "ok";

    } catch (error) {
        alert("Что-то пошло не так! Возможно вы ввели неверные данные!");
    }
}

export const logoutUser = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/api/v1/auth/token/logout/', null, {
            headers: {
                'Authorization': `Token ${getCookie("token")}`,
                "Content-Type": "application/json",
            }
        });
        clearAllCookies();

    } catch (error) {
        console.log("error in loginUser", error);
    }
}

export const getData = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/family/", {
            headers: {
                'Authorization': `Token ${getCookie("token")}`
            }
        })
        return res.data;

    } catch (error: any) {
        throw Error(error);
    }
}


export const createPerson = async (body: any) => {
    try {
        return await axios.post("http://127.0.0.1:8000/api/v1/family/", body, {
            headers: {
                'Authorization': `Token ${getCookie("token")}`
            }
        })
    } catch (error) {
        console.log('error in createPerson', error);
    }
}


export const updatePerson = async (body: any, id: number) => {
    console.log("BODYYYYYin Updaate", body)
    try {
        return await axios.put(`http://127.0.0.1:8000/api/v1/family/${id}/`, body, {
            headers: {
                'Authorization': `Token ${getCookie("token")}`
            }
        })
    } catch (error) {
        console.log('error in createPerson', error);
    }
}

export const deletePerson = async (id: number) => {
    try {
        return await axios.delete(`http://127.0.0.1:8000/api/v1/family/${id}/`, {
            headers: {
                'Authorization': `Token ${getCookie("token")}`
            }
        })
    } catch (error) {
        alert("Что-то пошло не так! Ошибка при удалении персоны!");
    }
}