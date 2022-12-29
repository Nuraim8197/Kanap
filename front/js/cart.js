let cartItem = document.querySelector("#cart__items");
let totalQuantity =document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");
let htmlContent = "";
let tPrix = 0;
let tQuantite = 0;
let kanapAray = [];
let postUrl = 'http://localhost:3000/api/products/order';
let idAray = [];
function getLocalStorage(){
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    return[];
}
else return cart
}

//pour chacun des éléments dans dataPanier, la boucle va créer toutes les balises et données en commentaire de la page cart.html
//dataPanier.forEach((produit) => afficherTag(produit))

function recapPanier() {
  kanapAray = getLocalStorage();
  for(let kanapObject of kanapAray){
  
    fetch(`http://localhost:3000/api/products/`+kanapObject.id)
  .then((response) => {
      return response.json()
  })
  .then((res) => {
       htmlContent += `<article class="cart__item" data-id="${kanapObject.id}" data-color="${kanapObject.color}">
      <div class="cart__item__img">
        <img src="${res.imageUrl}" alt="${res.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${res.name}</h2>
          <p>${kanapObject.color}</p>
          <p>${res.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapObject.quantite}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  tQuantite += kanapObject.quantite;
  tPrix += res.price * kanapObject.quantite;
  cartItem.innerHTML = htmlContent;
  totalPrice.innerHTML = tPrix;
  totalQuantity.innerHTML = tQuantite;

});
}
}
recapPanier()

// modifier quantité

function modifier(){
let qttPanier = document.querySelectorAll(".itemQuantity");
console.log(qttPanier, "quantité")
qttPanier.forEach((qtt) => {
  qtt.addEventListener('change', (eq) => {
    eq.preventDefault();
      let slct_article = eq.target.closest('.cart__item');
      let id = slct_article.dataset.id;
      let color = slct_article.dataset.color;

      let article = kanapAray.find(kanap => kanap.id == id && kanap.color == color)

      if(eq.target.value <0 && eq.target.value >100){
        var err="Veuillez choisir une quantité valide.";
        alert(err);
      }
      else{
        article.quantite = parseInt(eq.target.value);
      localStorage.setItem('cart', JSON.stringify(kanapAray));
      location.reload();  
      }
      
    }
  );
});
}
//************Gestion du bouton supprimer************//

//selection des références des boutons 
function deleteProduct(){

  let deleteItems = document.querySelectorAll(".deleteItem");
  for(let supprimer of deleteItems){
    console.log("test boucle")
    supprimer.addEventListener("click" , (e) =>{
      e.preventDefault();
      let slct_article = e.target.closest('.cart__item');
      let id = slct_article.dataset.id;
      let color = slct_article.dataset.color;
      slct_article.remove();
      kanapAray = kanapAray.filter( el => el.id !== id && el.color !== color)
      localStorage.setItem('cart', JSON.stringify(kanapAray));  
      location.reload(); 
    })
  }
  }
  
  function tQtt_tPrice(){
    for(let kanapObject of kanapAray){
      
      fetch(`http://localhost:3000/api/products/`+kanapObject.id)
      .then((response) => {
        return response.json()
    })
    .then((res) => {
          tQuantite += kanapObject.quantite;
          tPrix += res.price * kanapObject.quantite;
          cartItem.innerHTML = htmlContent;
          totalPrice.innerHTML = tPrix;
          totalQuantity.innerHTML = tQuantite;
  })
    }
  }
  
  window.onload = function(){
    deleteProduct();
    modifier();
  }

  //formulaire

  var prenom = document.querySelector("#firstName");
  function searchRegExp1(prenom) {
    let errMsgFName = document.getElementById('firstNameErrorMsg');
    var Fname = prenom.value
    let regexLettres = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
    if ( regexLettres.test(Fname) ) {
      console.log("Le mot ["+Fname+"] a été trouvé :)"); 
    } else {
      errMsgFName.innerHTML = "E R R E U R  !\nLe mot ["+Fname+"] n'est pas présent !!!!"; 
    }
  }

  var nom = document.querySelector("#lastName");
  function searchRegExp2(nom) {
    let errMsgName = document.getElementById('lastNameErrorMsg');
    var Lname = nom.value
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(Lname) ) {
      console.log("Le mot ["+Lname+"] a été trouvé :)"); 
    } else {
      errMsgName.innerHTML = "E R R E U R  !\nLe mot ["+Lname+"] n'est pas présent !!!!"; 
    }
  }

  var ville = document.querySelector("#city");
  function searchRegExp3(ville) {
    let errMsgCity = document.getElementById('cityErrorMsg');
    var ville = ville.value
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(ville) ) {
      console.log("Le mot ["+ville+"] a été trouvé :)"); 
    } else {
      errMsgCity.innerHTML = "E R R E U R  !\nLe mot ["+ville+"] n'est pas présent !!!!"; 
    }
  }

  var adresse = document.querySelector("#address");
  function searchRegExp4(adresse) {
    let errMsgAddress = document.getElementById('addressErrorMsg');
    var adresse = adresse.value
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(adresse) ) {
      console.log("Le mot ["+adresse+"] a été trouvé :)"); 
    } else {
      errMsgAddress.innerHTML = "E R R E U R  !\nLe mot ["+adresse+"] n'est pas présent !!!!"; 
    }
  }

  var email = document.querySelector("#email");
  function searchRegExp5(email) {
    var email = email.value
    let errMsgEmail = document.getElementById('emailErrorMsg');
    let regexValidEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
    let regexMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if ( regexValidEmail, regexMatchEmail.test(email) ) {
      console.log("Le mot ["+email+"] a été trouvé :)"); 
    } else {
      errMsgEmail.innerHTML = "E R R E U R  !\nLe mot ["+email+"] n'est pas présent !!!!"
    }
  }

  prenom.addEventListener("change" , (e) =>{
    searchRegExp1(prenom)
  })
  nom.addEventListener("change" , (e) =>{
    searchRegExp2(nom)
  })
  ville.addEventListener("change" , (e) =>{
    searchRegExp3(ville)
  })
  adresse.addEventListener("change" , (e) =>{
    searchRegExp4(adresse)
  })
  email.addEventListener("change" , (e) =>{
    searchRegExp5(email)
  })
  // regex 
  function commander(){
if (prenom.value == ""|| nom.value == ""|| ville.value == ""|| adresse.value == ""|| email.value == ""){
  alert("Veuillez renseigner tous les champs du formulaire")
}
else if(kanapAray === null || kanapAray.length == 0){
  alert("Votre panier est vide.");
  window.location.href = "index.html";
}
else if(confirm("Confirmez votre commande") == true) {
  let kanapAray = []
  for (let i = 0; i < kanapAray.length; i++){
    idAray.push(kanapAray[i].id);
  }

  let order = {
    contact: {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: email.value
    },
    products: idAray
};
  const options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  fetch(postUrl, options)
      .then(res => res.json())
      .then(datas => {
        console.log(datas);

        localStorage.clear();

        // SECURE ORDER ID, EXPORT TO URL
       window.location.href = "confirmation.html?orderId=" + datas.orderId;

      })
      .catch(error => {
        alert(error);
      })
  }
  }
  let getOrder = document.getElementById('order')
  getOrder.addEventListener('click', e => {
    e.preventDefault();
    commander()

  })
  
