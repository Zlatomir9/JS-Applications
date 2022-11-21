import * as api from './api.js';

const endPoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "createItem": "data/catalog",
    "getAllItems": "data/catalog",
    "getItemById": "data/catalog/",
    "myItems": "data/catalog?where=_ownerId%3D%22"
}

export async function login(email, password) {
    const result = await api.post(endPoint.login, { email, password });
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result;
}

export async function register(email, password) {
    const result = await api.post(endPoint.register, { email, password });
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result;
}

export async function logout() {
    const result = await api.get(endPoint.logout);
    sessionStorage.removeItem("userData");
    return result;
}

export async function createItem(data) {
    const result = await api.post(endPoint.createItem, data);
    return result;
}

export async function getAllItems() {
    const result = await api.get(endPoint.getAllItems);
    return result;
}

export async function getItemById(id) {
    const result = await api.get(endPoint.getItemById + id);
    return result;
}

export async function updateItemById(id, data) {
    const result = await api.put(endPoint.getItemById + id, data);
    return result;
}

export async function deleteItem(id) {
    const result = await api.del(endPoint.getItemById + id);
    return result;
}

export async function getMyItems() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData && userData._id;
    let id = `${userId}%22`;

    const result = await api.get(endPoint.myItems + id);

    return result;
}