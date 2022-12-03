import { setUserData, clearUserData } from '../util.js';
import { get, post } from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
};

export async function login (username, password) {
    const { _id, username: resultUsername, accessToken } = await post (endpoints.login, { username, password });

    setUserData({
        _id,
        username: resultUsername,
        accessToken
    });
}

export async function register (username, password) {
    const { _id, username: resultUsername, accessToken } = await post (endpoints.register, { username, password });

    setUserData({
        _id,
        username: resultUsername,
        accessToken
    });
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}