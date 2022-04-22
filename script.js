// Selection of a preference of heart icon ----♥----;
let y = 1; 

function heartPreference(){
    if (y == 1) {
        heartSelect();
    } else {
        heartDeselect();
    }
}
function heartSelect(){
    let preference = document.getElementById('preference');
    preference.src='./img/heartfull.png';
    y--;
}
function heartDeselect(){
    let preference = document.getElementById('preference');
    preference.src='./img/heartlinear.png';
    y++;
}
// ---------------------------------------------------------------------------
// Arrays of shopping basket, they'll be filled when the user chose his order.
let prices = [];
let recipes = [];
let amount = [];
load();
// This function add the choices of the user to the arrays "let prices = []" and "let recipes= []"
function addRecipe(rc, pr){
    let food = document.getElementById(rc).innerHTML;       
    let priceString = document.getElementById(pr).innerHTML;
    let priceNumber = parseFloat(priceString);      
    let index = recipes.indexOf(food);                      
    condition(index, priceNumber, food);
}
function condition(index, priceNumber, food){
    if (index == -1){                                       
        recipes.push(food);                                 
        prices.push(priceNumber); 
        amount.push(1);                                      
        save();
        render();                                                 
    } else {
        let amountElem = amount[index];
        let substElem = amountElem +1;
        amount.splice(index, 1, substElem);
        save();
        render();
    } 
}
// These functions save permanently the choices of the user in the Arrays and load them at the beginning
function save(){
    let recipesAsText = JSON.stringify(recipes);
    localStorage.setItem('recipes', recipesAsText);
    let pricesAsText = JSON.stringify(prices);
    localStorage.setItem('prices', pricesAsText);
    let amountAsText = JSON.stringify(amount);
    localStorage.setItem('amount', amountAsText);
}
function load() {
    let recipesAsText = localStorage.getItem('recipes');
    let pricesAsText = localStorage.getItem('prices');
    let amountAsText = localStorage.getItem('amount');
    if(recipesAsText && pricesAsText){
        recipes = JSON.parse(recipesAsText);
        prices = JSON.parse(pricesAsText);
        amount = JSON.parse(amountAsText);
    }
}
// this function write the order of the user inside the shopping basket
function render(){
    // let basketContent = document.getElementById('basketContent');
    let basketContent = document.getElementById('basketContent');
    basketContent.innerHTML='';
    if(recipes.length > 0){
        basketContent.style.paddingTop = '12px';
        for(let i = 0; i < recipes.length; i++){
            const price = prices[i]*amount[i];
            const formattedPrice = price.toFixed(2).replace('.', ',');
            basketContent.innerHTML += `
            
                <div class="basket-box border-top">
                    <div class="basket-elem"><p class="text-amount"><b>${amount[i]}</b></p></div>
                    <div class="basket-elem"><h3>${recipes[i]}</h3></div>
                    <div class="basket-elem"><p class="text-price">${formattedPrice} €</p></div>
                </div>
                <div class="basket-box">
                    <div class="basket-chose-box">
                        <img onclick="addPortion(${amount[i]}, ${i})" class="plus-icon" src="./img/plus-solid.svg">
                    </div>
                    <div class="basket-chose-box">
                        <img onclick="deletePortion(${amount[i]}, ${i})" class="plus-icon" src="./img/minus-solid.svg">
                    </div>
                </div>
            
            `;
        } renderSum();
    } else {
        emptyCorb();
    } 
    countPurchase();
   
}
// Remove one portion from the icon minus in the shopping-corb 
function deletePortion(quantity, position){
    console.log(quantity);
    console.log(position);
    if(quantity > 1){
        amount.splice(position, 1, quantity-1)
        save();
        render();
    } else {
        amount.splice(position, 1);
        recipes.splice(position, 1);
        prices.splice(position, 1);
        save();
        render();
    } 
}
// add one portion from the icon plus in the shopping corb
function addPortion(quantity, position){
    amount.splice(position, 1, quantity+1);
    save();
    render();
}
// this function write the last part of the shopping corb, where the sum of our purchase is calculated
function renderSum(){
    let basketMenu = document.getElementById('basketMenu');
    basketMenu.innerHTML= '';
    let sum = 0;
    for(let i=0; i < recipes.length; i++){
        let purchase = prices[i]*amount[i];
        sum = sum + purchase;
    }
    let formattedSum = sum.toFixed(2).replace('.', ',');
    let gesamt = sum + 1.5;
    let formattedGesamt = gesamt.toFixed(2).replace('.', ',');
    basketMenu.innerHTML += `
        <div class="basket-item border-top">
            <p>Zwischensumme</p>
            <p>${formattedSum} €</p> 
        </div>
        <div class="basket-item">
            <p>Lieferkosten</p>
            <p>1,50 €</p> 
        </div>
        <div class="basket-item">
            <p><b>Gesamt</b></p>
            <p><b>${formattedGesamt} €</b></p> 
        </div>
        <div id="buttonBox" class="button-box"><a href="success.html"><button class="button-purchase text-footer">Bezahlen</button></a></div>
    `;
}
function emptyCorb(){
    let basketMenu = document.getElementById('basketMenu');
    basketMenu.innerHTML = '';
    let basketContent = document.getElementById('basketContent');
    basketContent.style.paddingTop = '150px';
    basketContent.innerHTML += `
    <div class="basket-elem">
        <img class="basket-img" src="./img/basket-shopping-solid.svg" alt="">
    </div>
    <div class="basket-elem"><h3>Fülle deinen Warenkorb</h3></div>
    <div class="basket-elem"><p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p></div>
    `;
}
// Function Shopping Cart sticking
window.onscroll = function(){
    let shoppingBasket = document.getElementById('shoppingBasket');
    if (window.scrollY > 0) {
        shoppingBasket.style = 'top:0';
    } else {
        shoppingBasket.style = 'top:100px';
    } 
}
// Show shopping basket in the mobile view
function showPurchase(){
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.classList.add('shopping-basket-full-view');
    let basketTitle = document.getElementById('basketTitle');
    basketTitle.style = 'opacity: 100%';
    let closureX = document.getElementById('closureX');
    closureX.style = 'display:unset';
}
// -------------------------------------------------------------------
// Close the shopping basket in the mobile view
function closePurchase(){
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.classList.remove('shopping-basket-full-view');
    let basketTitle = document.getElementById('basketTitle');
    // basketTitle.style = 'opacity: 0';
    let closureX = document.getElementById('closureX');
    closureX.style = 'display:none';
}
// Button shopping-basket in the mobile view: count of the elements inside the container showed in the text inside the blue button
function countPurchase() {
    let sumPurchase = 0;
    for(let i = 0; i<amount.length; i++) {
        sumPurchase = sumPurchase + amount[i];
    }
    let countPurchase = document.getElementById('countPurchase');
    countPurchase.innerHTML = `(${sumPurchase}) Warenkorb`;
}

// ----------------------------------------------------------------------------------------------------------------------------
// Function dialog window
function openDialog(){
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('d-none');
}

function closeDialog(){
    let dialog = document.getElementById('dialog');
    dialog.classList.add('d-none');
}





