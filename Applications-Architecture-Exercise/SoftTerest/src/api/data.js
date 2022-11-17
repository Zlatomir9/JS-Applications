import * as api from './api.js';

const endPoints = {
    "getAllIdea": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    "createIdea": "data/ideas",
    "ideaById": "data/ideas/"
}

export async function getAllIdea() {
    return api.get(endPoints.getAllIdea);
}

export async function createIdea(data) {
    return api.post(endPoints.createIdea, data);
}

export async function getIdeaById(id){
    return api.get(endPoints.ideaById + id);
}

export async function deleteById(id) {
    return api.delete(endPoints.ideaById + id)
}