if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready();
}

function ready() {
    var removeItemBtn = document.getElementsByClassName("btn-d")
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseBtnClicked)

    for (var i = 0; i < removeItemBtn.length; i++) {
        var btn = removeItemBtn[i]
        btn.addEventListener('click', removeItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartBtn = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; addToCartBtn.length; i++) {
        var btn = addToCartBtn[i]
        btn.addEventListener('click', addToCart)
    }

}


function addToCart(event) {
    var btnClicked = event.target
    var shopItem = btnClicked.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    addCartItem(title, price, imgSrc)
    cartTotalUpdate()
}

function addCartItem(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i =0; i < cartItemNames.length; i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert('This item is already added to the cart!')
            return 
        }
    }
    var cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-d cart-quantity-btn" type="button">REMOVE</button>
</div>
</div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-d')[0].addEventListener('click', removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeItem(event) {
    var clickedBtn = event.target
    clickedBtn.parentElement.parentElement.remove()
    cartTotalUpdate()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    cartTotalUpdate()
}

function cartTotalUpdate() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var rowPrice = cartRow.getElementsByClassName('cart-price')[0]
        var rowQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(rowPrice.innerText.replace('$', ''))
        var quantity = rowQuantity.value
        total += price * quantity
    }

    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

}

function purchaseBtnClicked()
{
    alert('Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    cartTotalUpdate()
}



