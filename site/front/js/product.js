const str = window.location.href;
const url = new URL(str);
const itemId = url.searchParams.get("id");

let cartString = localStorage.getItem("tableau");

if (cartString !== null) {
  cart = JSON.parse(cartString);
} else {
  cart = [];
}

fetch(`//localhost:3000/api/products/${itemId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    let url = value.imageUrl;
    let alt = value.altTxt;

    // Affichage image produit
    let itemImage = document.getElementsByClassName("item__img")[0];
    itemImage.innerHTML = `<img src=${url} alt=${alt}></img>`;

    // Affichage nom produit
    let itemName = document.getElementById("title");
    itemName.innerHTML = value.name;

    // Affichage prix produit
    let itemPrice = document.getElementById("price");
    itemPrice.innerHTML = value.price + " ";

    // Affichage description produit
    let itemDescription = document.getElementById("description");
    itemDescription.innerHTML = value.description;

    // Affichage couleur produit
    for (let i = 0; i < value.colors.length; i++) {
      let colors = document.getElementById("colors");
      let idColor = document.createElement("option");
      idColor.innerHTML = `<option value=${value.colors[i]}>${value.colors[i]}</option>`;
      colors.appendChild(idColor);
    }

    // Action au clic
    let btn = document.getElementById("addToCart");
    btn.addEventListener("click", () => {
      // Récupération de la couleur choisie
      let colors = document.getElementById("colors");
      let itemColor = colors.value;
      console.log(itemColor);

      // Récupération de la quantité choisie
      let quantity = document.getElementById("quantity");
      let itemQuantity = quantity.value;
      console.log(itemQuantity);

      // Récupération de l'image
      let itemPhoto = url;
      console.log(itemPhoto);

      // Récupération de l'alt
      let itemAlt = alt;
      console.log(itemAlt);

      // Récupération du nom
      let name = value.name;
      console.log(name);

      // Récupération du prix
      let price = value.price;
      console.log(price);

      // Création de l'objet "selectedItem" et ajout au tableau "cart"
      let selectedItem = {
        id: itemId,
        nom: name,
        couleur: itemColor,
        quantite: Number(itemQuantity),
        photo: itemPhoto,
        alt: itemAlt,
        prix: price,
      };
      console.log(selectedItem);

      // Si (id + couleur) existe dans le panier => ajouter quantité
      // sinon ajouter nouvel objet

      let nbItemsInCart = cart.length;
      let index = -1;
      if (nbItemsInCart == 0) {
        cart.push(selectedItem);
      } else {
        for (let i = 0; i < nbItemsInCart; i++) {
          if (
            cart[i].id === selectedItem.id &&
            cart[i].couleur === selectedItem.couleur
          ) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(selectedItem);
        } else {
          cart[index].quantite += selectedItem.quantite;
        }
      }
      console.log(cart);

      // Ajout du tableau au localstorage

      let cartString = JSON.stringify(cart);
      localStorage.setItem("tableau", cartString);
      console.log(cartString);

      //   window.open("cart.html");
    });
  })

  .catch(function (err) {
    // Une erreur est survenue
  });
