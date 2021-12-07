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
      // newItem.setAttribute("class", "item");
      newItem.setAttribute("href", `./product.html?id=${value[i]._id}`);
      items.appendChild(newItem);

      //ajout des articles dans les liens
      // const item = document.getElementsByClassName("item");
      const newArticleInItem = document.createElement("article");
      newArticleInItem.setAttribute("class", "article");
      newItem.appendChild(newArticleInItem);

      // //ajout des images dans les articles
      // const articleInItem = document.getElementsByClassName("article");
      const newImgInArticle = document.createElement("img");
      newImgInArticle.setAttribute("src", `${value[i].imageUrl}`);
      newImgInArticle.setAttribute("alt", `${value[i].altTxt}`);
      newArticleInItem.appendChild(newImgInArticle);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
