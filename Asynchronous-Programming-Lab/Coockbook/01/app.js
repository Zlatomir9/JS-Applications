window.addEventListener('load', () => {
    getRecipes();
});

async function getRecipes() {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    const previewArticle = document.createElement("article");
    previewArticle.classList.add("preview");
    mainElement.appendChild(previewArticle);

    const url = "http://localhost:3030/jsonstore/cookbook/recipes";

    const respone = await fetch(url);
    const data = await respone.json();

    Object.values(data).forEach(r => {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        const header = document.createElement("h2");
        header.innerText = r.name;
        titleDiv.appendChild(header);

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("small");
        const img = document.createElement("img");
        img.src = r.img;
        imgDiv.appendChild(img);

        previewArticle.appendChild(titleDiv);
        previewArticle.appendChild(imgDiv);

        titleDiv.addEventListener('click', () => recipeDetails(r._id, previewArticle));
        imgDiv.addEventListener('click', () => recipeDetails(r._id, previewArticle));
    });
}

async function recipeDetails(id, recipe) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    const main = document.querySelector('main');

    const response = await fetch(url);
    const data = await response.json();

    const article = document.createElement("article");
    main.appendChild(article);
    const articleTitle = document.createElement("h2");
    articleTitle.innerText = data.name;
    article.appendChild(articleTitle);

    const bandDiv = document.createElement("div");
    bandDiv.classList.add("band");
    const thumbDiv = document.createElement("div");
    thumbDiv.classList.add("thumb");
    const img = document.createElement("img");
    img.src = data.img;
    thumbDiv.appendChild(img);
    bandDiv.appendChild(thumbDiv);

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("ingredients");
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.innerText = "Ingredients:";
    ingredientsDiv.appendChild(ingredientsTitle);

    const ul = document.createElement("ul");
    data.ingredients.forEach(i => {
        const li = document.createElement("li");
        li.innerText = i;
        ul.appendChild(li);
    });
    ingredientsDiv.appendChild(ul);
    bandDiv.appendChild(ingredientsDiv);
    article.appendChild(bandDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    const descriptionTitle = document.createElement("h3");
    descriptionTitle.innerText = "Preparation:";
    descriptionDiv.appendChild(descriptionTitle);

    data.steps.forEach(s => {
        const p = document.createElement("p");
        p.innerText = s;
        descriptionDiv.appendChild(p);
    });

    article.appendChild(descriptionDiv);

    recipe.style.display = "none";
}