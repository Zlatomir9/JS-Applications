import { del, get, post, put } from './api.js';

const endpoints = {
    'catalog': '/data/cars?sortBy=_createdOn%20desc',
    'create': '/data/cars',
    'getItemById': '/data/cars/',
    'userItems': (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'search': (value) => `/data/cars?where=year%3D${value}`
};

export async function getAllItems() {
    return await get(endpoints.catalog);
}

export async function createItem(data) {
    debugger
    return await post(endpoints.create, data);
}

export async function getItemById(id) {
    return await get(endpoints.getItemById + id);
}

export async function deleteItemById(id) {
    return await del(endpoints.getItemById + id);
}

export async function editItem(data, id) {
    return await put(endpoints.getItemById + id, data);
}

export async function getUserItems(userId) {
    return await get(endpoints.userItems(userId));
}

export async function searchItem(value) {
    return await get(endpoints.search(value));
}