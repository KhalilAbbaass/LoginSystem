import axios from 'axios';

const apiURL = '/api/auth/Logout'

export const LogoutUser = async () => {
    return await axios.get(apiURL)
};