// Récupération du panier
let cartString = localStorage.getItem("tableau");
let cart = JSON.parse(cartString);
let messageEmptyCart = document.getElementById("cart__items");
console.log(cart);

// ******* Affichage du panier *******

function getCart() {
  // Si le panier est vide
  if (cart.length == 0) {
    const emptyCart = "<p>Votre panier est vide</p>";
    messageEmptyCart.innerHTML = emptyCart;
    // Sinon
  } else {
    for (let item in cart) {
      // Insertion élément "article"
      let itemArticle = document.createElement("article");
      document.getElementById("cart__items").appendChild(itemArticle);
      itemArticle.className = "cart__item";
      itemArticle.setAttribute("data-id", cart[item].itemId);

      // Insertion élément "div"
      let itemDivImg = document.createElement("div");
      itemArticle.appendChild(itemDivImg);
      itemDivImg.className = "cart__item__img";

      // Insertion image
      let itemImg = document.createElement("img");
      itemDivImg.appendChild(itemImg);
      itemImg.src = cart[item].photo;
      itemImg.alt = cart[item].alt;

      // // Insertion élément "div"
      let cartItemContent = document.createElement("div");
      itemArticle.appendChild(cartItemContent);
      cartItemContent.className = "cart__item__content";

      // // Insertion élément "div"
      let cartItemContentPrice = document.createElement("div");
      cartItemContent.appendChild(cartItemContentPrice);
      cartItemContentPrice.className = "cart__item__content__Price";

      // // Insertion h3
      let itemName = document.createElement("h2");
      cartItemContentPrice.appendChild(itemName);
      itemName.innerHTML = cart[item].nom;

      // // Insertion couleur
      let itemColor = document.createElement("p");
      itemName.appendChild(itemColor);
      itemColor.innerHTML = cart[item].couleur;

      // // Insertion du prix
      let itemPrice = document.createElement("p");
      cartItemContentPrice.appendChild(itemPrice);
      itemPrice.innerHTML = cart[item].prix + " €";

      // // Insertion élément "div"
      let cartItemContentSettings = document.createElement("div");
      cartItemContent.appendChild(cartItemContentSettings);
      cartItemContentSettings.className = "cart__item__content__settings";

      // Insertion élément "div"
      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      // Insertion "Qté : "
      let itemQte = document.createElement("p");
      cartItemContentSettingsQuantity.appendChild(itemQte);
      itemQte.innerHTML = "Qté : ";

      // Insertion quantité
      let itemQuantity = document.createElement("input");
      cartItemContentSettingsQuantity.appendChild(itemQuantity);
      itemQuantity.value = cart[item].quantite;
      itemQuantity.className = "itemQuantity";
      itemQuantity.setAttribute("type", "number");
      itemQuantity.setAttribute("min", "1");
      itemQuantity.setAttribute("max", "100");
      itemQuantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let cartItemContentSettingsDelete = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
      cartItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion du paragraphe "supprimer"
      let itemDelete = document.createElement("p");
      cartItemContentSettingsDelete.appendChild(itemDelete);
      itemDelete.className = "deleteItem";
      itemDelete.innerHTML = "Supprimer";
    }
  }
}

// ******* Calcul du prix *******

function calcQty() {
  // Récupération du total des quantités
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  let totalQuantity = itemQuantity.length;
  let totalQty = 0;

  for (let i = 0; i < totalQuantity; ++i) {
    totalQty += itemQuantity[i].valueAsNumber;
  }

  let itemTotalQuantity = document.getElementById("totalQuantity");
  itemTotalQuantity.innerHTML = totalQty;
  console.log(totalQty);

  // Récupération du prix total
  let totalPrice = 0;

  for (let i = 0; i < totalQuantity; i++) {
    totalPrice += itemQuantity[i].valueAsNumber * cart[i].prix;
  }

  let ordertotalPrice = document.getElementById("totalPrice");
  ordertotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}

// ******* Modification des quantités *******

function modifyQty() {
  let qtyModif = document.getElementsByClassName("itemQuantity");

  for (let j = 0; j < qtyModif.length; j++) {
    // (qtyModif.length = nb d'items différents)
    qtyModif[j].addEventListener("change", (e) => {
      e.preventDefault();

      // Récupération de la quantité initiale
      let quantityModif = cart[j].quantite;
      // Récupération de la modif
      let qtyModifValue = qtyModif[j].valueAsNumber;

      if (quantityModif == qtyModifValue) {
        return;
      } else {
        cart[j].quantite = qtyModifValue;
      }

      localStorage.setItem("tableau", JSON.stringify(cart));

      // mise à jour de la page
      location.reload();
    });
  }
}

// ******* Suppression d'un item *******

function deleteItem() {
  let deleteBtn = document.getElementsByClassName("deleteItem");

  for (let k = 0; k < cart.length; k++) {
    deleteBtn[k].addEventListener("click", (e) => {
      e.preventDefault();

      // Selection de l'item à supprimer
      let idDelete = cart[k].id;
      let colorDelete = cart[k].couleur;

      for (l = 0; l < cart.length; l++) {
        if (cart[l].id == idDelete && cart[l].couleur == colorDelete) {
          cart.splice(l, 1);
        }
      }

      localStorage.setItem("tableau", JSON.stringify(cart));

      location.reload();
    });
  }
}

//*************************************************************
//                      Formulaire
//*************************************************************

function getForm() {
  // Formalisation du formulaire
  let form = document.getElementsByClassName("cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let otherRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  // Vérif prénom
  firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Vérif nom
  lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Vérif adresse
  address.addEventListener("change", function () {
    validAddress(this);
  });

  // Vérif ville
  city.addEventListener("change", function () {
    validCity(this);
  });

  // Vérif email
  email.addEventListener("change", function () {
    validEmail(this);
  });

  // validation prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (otherRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prénom.";
    }
  };

  // validation nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (otherRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom.";
    }
  };

  // validation l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse.";
    }
  };

  // validation ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (otherRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner votre ville.";
    }
  };

  // validation email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}

// Transmission données au localstorage
function postDatas() {
  const orderBtn = document.getElementById("order");

  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (cart == null || cart == 0) {
      window.alert("Veuillez choisir au moins un produit");
      return;
    }

    if (
      firstName.value === "" ||
      lastName.value === "" ||
      address.value === "" ||
      city.value === "" ||
      email.value === ""
    ) {
      window.alert("Veuillez renseigner tous les champs");
      return;
    }

    //Récupération des données du formulaire
    let clientFirstName = document.getElementById("firstName");
    let clientLastName = document.getElementById("lastName");
    let clientAddress = document.getElementById("address");
    let clientCity = document.getElementById("city");
    let clientEmail = document.getElementById("email");

    // Création d'un tableau regroupant les items
    let order = [];
    for (let i = 0; i < cart.length; i++) {
      order.push(cart[i].id);
    }
    console.log(order);

    // Création de la commande à envoyer au server
    const orderToServer = {
      contact: {
        firstName: clientFirstName.value,
        lastName: clientLastName.value,
        address: clientAddress.value,
        city: clientCity.value,
        email: clientEmail.value,
      },
      products: order,
    };
    console.log(orderToServer);

    // Envoi de la commande au server + récupération du numéro de commande
    fetch("//localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderToServer),
    })
      .then((res) => res.json())
      .then((value) => {
        localStorage.clear();
        localStorage.setItem("orderId", value.orderId);
        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Erreur " + err.message);
      });
  });
}

function confirmation() {
  const idOfOrder = document.getElementById("orderId");
  idOfOrder.innerText = localStorage.getItem("orderId");
  localStorage.clear();
}

// Vérification de la page affichée
const url = new URL(window.location.href);
// Si page "cart.html" affichée
if (url == "http://127.0.0.1:5500/front/html/cart.html") {
  getCart();
  calcQty();
  modifyQty();
  deleteItem();
  getForm();
  postDatas();
} else {
  // Si page "confirmation.html" affichée
  confirmation();
}
