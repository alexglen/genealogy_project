import axios from "axios";
import {IUser} from "./models";
import {useNavigate} from "react-router-dom";

export const postDataUser = async ({email, password, rePassword, firstName, lastName, gender, date}: IUser) => {
    const body = {email, password, re_password: rePassword, firstName, lastName, gender, date, username: firstName};
    try {
        return await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("error in registerUser", error)
    }
}

// export const activateUser = async ({email, password, rePassword, firstName, lastName, gender, date}: IUser) => {
//     const body = {email, password, re_password: rePassword, firstName, lastName, gender, date, username: firstName};
//     try {
//         return await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', body, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     } catch (error) {
//         console.log("error in registerUser", error)
//     }
// }

export const loginUser = async ({username, password}: { username: string, password: string }) => {
    try {
        const res = await axios.post(' http://127.0.0.1:8000/api/v1/auth/token/login/', {username, password}, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const {auth_token} = res.data;
        document.cookie = `token=${auth_token}`;
        return "ok";

    } catch (error) {
        console.log("error in loginUser", error)
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/token/logout/');
        document.cookie = "";

    } catch (error) {
        console.log("error in loginUser", error)
    }
}

