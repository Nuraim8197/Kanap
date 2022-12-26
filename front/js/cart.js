let cartItem = document.querySelector("#cart__items");
let totalQuantity =document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");
let htmlContent = "";
let tPrix = 0;
let tQuantite = 0;
let kanapAray = []

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

/*function Modif(){
input.addEventListener('change', function recapPanier(){
    const el = document.querySelector('cart__item__content__settings__quantity');
    el.dataset.quantite === 'kanapObject.quantite'
  })
}
*/
/*function modif(action, itemID, qty) {
  const itemInCart = cart.find(el => el._id == itemID);
  if (action === 'update') itemInCart.qty = qty;
  if (action === 'delete') cart.splice(cart.indexOf(itemInCart), 1);
  localStorage.setItem('Cart', JSON.stringify(cart));
}*/
// modifier quantité

function modifier(){
/*cartItem.addEventListener('input', e => {
  if (e.target.classList.contains('itemQuantity')) {*/
      //ciblage des produits
      /*const id = e.target.closest('.cart__item').dataset.id;
      const product = kanapObject.Get(id);*/
      /*const produitData = dataPanier.find((produit) => produit.addId == addId);
      produitData.quantité = Number(newValue);
      //update DOM
      const newQty = e.target.valueAsNumber;
      product.qty = newQty;
      e.target.previousElementSibling.textContent = 'Qté : ' + newQty;
      renderTotals();
      //update produits local storage
      updateLocalStorage('update', id, newQty);
  }
})*/
let qttPanier = document.querySelectorAll(".itemQuantity");
console.log(qttPanier, "quantité")
qttPanier.forEach((qtt) => {
  qtt.addEventListener('change', (eq) => {
    //let cart = JSON.parse(localStorage.getItem("panierStocké"));
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
/*function updateArticleQuantity(addId, newValue) {
  const produitData = dataPanier.find((produit) => produit.addId == addId);
  produitData.quantité = Number(newValue);
  localStorage.setItem(addId, JSON.stringify(produitData));

  let refId = produitData.addId;
  let refColor = produitData.color;
  let newId = refId.slice(0, 32);

  const spanPrice = document.querySelector("#totalPrice");
  const total = dataPrice.reduce((total, price) => total + price, 0);
  console.log("find data price", total);
  spanPrice.innerHTML = total;
  window.location.reload(true);

  recapPanier();
}*/
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

  function formulaire(){
    let contactClient = {};

    /*// on pointe les élément qui ont la classe .regex_texte
    var regexTexte = document.querySelectorAll(".regex_texte");
    // modification du type de l'input type email à text à cause d'un comportement de l'espace blanc non voulu vis à vis de la regex 
    document.querySelector("#email").setAttribute("type", "text");*/
  }
  var prenom = document.querySelector("#firstName");
  function searchRegExp1(prenom) {
    var Fname = prenom.value
    //var exp=new RegExp(prenom, "g");
    let regexLettres = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
    if ( regexLettres.test(Fname) ) {
      console.log("Le mot ["+Fname+"] a été trouvé :)"); 
    } else {
      console.log("E R R E U R  !\nLe mot ["+Fname+"] n'est pas présent !!!!"); 
    }
  }

  var nom = document.querySelector("#lastName");
  function searchRegExp2(nom) {
    var Lname = nom.value
    //var exp=new RegExp(prenom, "g");
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(Lname) ) {
      console.log("Le mot ["+Lname+"] a été trouvé :)"); 
    } else {
      console.log("E R R E U R  !\nLe mot ["+Lname+"] n'est pas présent !!!!"); 
    }
  }

  var ville = document.querySelector("#city");
  function searchRegExp3(ville) {
    var ville = ville.value
    //var exp=new RegExp(prenom, "g");
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(ville) ) {
      console.log("Le mot ["+ville+"] a été trouvé :)"); 
    } else {
      console.log("E R R E U R  !\nLe mot ["+ville+"] n'est pas présent !!!!"); 
    }
  }

  var adresse = document.querySelector("#address");
  function searchRegExp4(adresse) {
    var adresse = adresse.value
    //var exp=new RegExp(prenom, "g");
    let regexChfrLtrs = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
    if ( regexChfrLtrs.test(adresse) ) {
      console.log("Le mot ["+adresse+"] a été trouvé :)"); 
    } else {
      console.log("E R R E U R  !\nLe mot ["+adresse+"] n'est pas présent !!!!"); 
    }
  }

  var email = document.querySelector("#email");
  function searchRegExp5(email) {
    var email = email.value
    //var exp=new RegExp(prenom, "g");
    let regexValidEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
    let regexMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if ( regexValidEmail, regexMatchEmail.test(email) ) {
      console.log("Le mot ["+email+"] a été trouvé :)"); 
    } else {
      console.log("E R R E U R  !\nLe mot ["+email+"] n'est pas présent !!!!"); 
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
  
if (prenom == ""|| nom == ""|| ville == ""|| adresse == ""|| email == ""){
  alert("Veuillez renseigner tous les champs du formulaire")
}
else if(kanapAray === null || kanapAray == 0){
  alert("Votre panier est vide.");
  window.location.href = "index.html";
}
else if(confirm("Confirmez votre commande") == true) {
  let kanapAray = []
  for (let i = 0; i < kanapAray.length; i++){
    kanapObject.push(kanapAray[i].id);
  }

  let order = {
    contact: {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: email.value
    },
    products: cartItem
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
       // window.location.href = "confirmation.html?orderId=" + datas.orderId;

      })
      .catch(error => {
        alert(error);
      })
  }
