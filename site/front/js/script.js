fetch("//localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    const items = document.getElementById("items");
    for (let i = 0; i < value.length; i++) {
      //ajout des liens
      const newItem = document.createElement("a");
      newItem.setAttribute("href", `./product.html?id=${value[i]._id}`);
      items.appendChild(newItem);

      //ajout des articles dans les liens
      const newArticleInItem = document.createElement("article");
      newItem.appendChild(newArticleInItem);

      // //ajout des images dans les articles
      const newImgInArticle = document.createElement("img");
      newImgInArticle.setAttribute("src", `${value[i].imageUrl}`);
      newImgInArticle.setAttribute("alt", `${value[i].altTxt}`);
      newArticleInItem.appendChild(newImgInArticle);

      // //ajout des noms dans les articles
      const newNameInArticle = document.createElement("h3");
      newNameInArticle.setAttribute("class", "productDescription");
      newNameInArticle.textContent = `${value[i].name}`;
      newArticleInItem.appendChild(newNameInArticle);

      // `<h3 class="productName">${value[i].name}</h3>`;

      const newDescriptionInArticle = document.createElement("p");
      newDescriptionInArticle.setAttribute("class", "productDescription");
      newDescriptionInArticle.textContent = `${value[i].description}`;
      newArticleInItem.appendChild(newDescriptionInArticle);
    }
  })
  .catch(function (err) {
    alert("Erreur : " + err.message);
  });
