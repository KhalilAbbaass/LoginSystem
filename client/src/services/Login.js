import axios from 'axios';

const apiURL = '/api/auth/Login'

export const LoginUser = async (userInfo) => {
    return await axios.post(apiURL, userInfo)
}