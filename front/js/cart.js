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
recapPanier()
//pour chacun des éléments dans dataPanier, la boucle va créer toutes les balises et données en commentaire de la page cart.html
//dataPanier.forEach((produit) => afficherTag(produit))

function recapPanier() {
    //let cart = JSON.parse(localStorage.getItem('cart'));
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
      tQtt_tPrice();
        /*tQuantite += kanapObject.quantite;
        tPrix += res.price * kanapObject.quantite;
    cartItem.innerHTML = htmlContent;
    totalPrice.innerHTML = tPrix;
    totalQuantity.innerHTML = tQuantite;*/
    /*let deleteItems = document.querySelectorAll(".deleteItem");
    console.log(deleteItems,"bouton supprimer")*/
  
  });
}
}

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
}

cartItem.addEventListener('input', e => {
  if (e.target.classList.contains('itemQuantity')) {
      //ciblage des produits
      const id = e.target.closest('.cart__item').dataset.id;
      const product = kanapObject.Get(id);
      //update DOM
      const newQty = e.target.valueAsNumber;
      product.qty = newQty;
      e.target.previousElementSibling.textContent = 'Qté : ' + newQty;
      renderTotals();
      //update produits local storage
      updateLocalStorage('update', id, newQty);
  }
});*/


//************Gestion du bouton supprimer************//

//selection des références des boutons 
function deleteProduct(){
let deleteItems = document.querySelectorAll(".deleteItem");
console.log(deleteItems, "btn supprimer");

/*for(let i = 0; i<deleteItems.length; i++){
  console.log("test boucle")
  //supprimer.addEventListener("click" , (e) =>{
    //event.preventDefault();
    //console.log(supprimer, " supprimer ")
}
console.log("test")
// methode filter

Array.prototype.forEach.call(deleteItems, function (supprimer) {
  console.log(supprimer, " 123456789 ")
})*/
for(let supprimer of deleteItems){
  console.log("test boucle")
  supprimer.addEventListener("click" , (e) =>{
    e.preventDefault();
    console.log(supprimer, " supprimer ")
    
   
    let slct_article = e.target.closest('.cart__item')
      console.log(slct_article, "selection")
    let id = slct_article.dataset.id
    let color = slct_article.dataset.color
    console.log(id, color, " id + color ")
    kanapAray = kanapAray.filter( el => el.id !== id && el.color !== color)
    localStorage.setItem('cart', JSON.stringify(kanapAray));  
    slct_article.remove();
    tQtt_tPrice();
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
  deleteProduct()
  console.log("blabla")
}