import { del, get, post, put } from './api.js';

const endpoints = {
    'catalog': '/data/albums?sortBy=_createdOn%20desc',
    'add': '/data/albums',
    'getAlbumById': '/data/albums/',
    'likedByUser': (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    'totalLikes': (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    'addLike': '/data/likes'
};

export async function getAllAlbums() {
    return await get(endpoints.catalog);
}

export async function addItem(data) {
    return await post(endpoints.add, data);
}

export async function getAlbumById(id) {
    return await get(endpoints.getAlbumById + id);
}

export async function deleteAlbumById(id) {
    return await del(endpoints.getAlbumById + id);
}

export async function editAlbum(data, id) {
    return await put(endpoints.getAlbumById + id, data);
}

export async function addLike(data){
    return await post(endpoints.addLike, data);
}

export async function getLikesCount(albumId){
    return await get(endpoints.totalLikes(albumId));
}

export async function isLiked(albumId, userId){
    return await get(endpoints.likedByUser(albumId, userId));
}