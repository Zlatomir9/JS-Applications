import { html, nothing } from "../lib.js";
import { getAlbumById, deleteAlbumById, isLiked, getLikesCount, addLike } from "../api/data.js";
import { getUserData } from '../util.js';

const detailsTemp = (data, isOwner, isLogged, hasLiked, likesCount) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src=${data.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${data.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
            </div>
        <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>
        <div id="action-buttons">
        ${isOwner
    ? html`
            <!-- <a href="" id="like-btn">Like</a> -->
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${deleteItem} href="javascript:void(0)" id="delete-btn">Delete</a>`
    : nothing}
        ${isLogged && !isOwner && hasLiked == 0
        ? html`
            <a @click=${onLike} href="#" id="like-btn">Like</a></a>`
    : nothing}
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const albumId = ctx.params.id;
    const data = await getAlbumById(ctx.params.id);
    const likesCount = await getLikesCount(albumId);
    const user = getUserData();
    const isLogged = user ? user._id : false;
    const isOwner = user ? user._id === data._ownerId : false;
    let hasLiked = 0;

    if (isLogged && !isOwner) {
        hasLiked = await isLiked(albumId, user._id);
    }

    ctx.render(detailsTemp(data, isOwner, isLogged, hasLiked, likesCount));
}

async function onLike() {
    let album = ctx.params.id;
    debugger
    await addLike( { album } );
    ctx.page.redirect(`/details/${ctx.params.id}`);
}

async function deleteItem(e) {
    e.preventDefault();

    const confirmed = confirm('Are you sure you want to delete the selected album?');

    if(confirmed) {
        await deleteAlbumById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}