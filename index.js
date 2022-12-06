import menuArray from '/data.js'

let cart = []
let clientName = ''

document.addEventListener('click', e => {
    e.target.dataset.add && addItem(e.target.dataset.add)
    e.target.dataset.remove && removeItem(e.target.dataset.remove)
    e.target.id === 'order__btn' && openModal()
    e.target.dataset.icon && setReview(e.target.dataset.icon)
})

document.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('modal__form'))

    const cardName = formData.get('card-name')
    clientName = cardName

    closeModal()
    cart = []
    render()
    document.getElementById('confirmation').classList.toggle('hidden')
    setTimeout(() => {
        document.getElementById('confirmation').classList.toggle('hidden')
        document.getElementById('review').classList.toggle('hidden')
    }, 1500)
})

function addItem(id) {
    const itemObj = menuArray.filter(i => i.id.toString() === id)[0]
    !cart.includes(itemObj) && cart.push(itemObj)
    render()
    document.getElementById('order').classList.toggle('hidden')
    isDiscountAvailable() && document.getElementById('order__total-no-discount').classList.toggle('hidden')
}

function removeItem(id) {
    const idx = cart.findIndex(el => el.id.toString() === id)
    cart.splice(idx, 1)
    render()
    cart.length !== 0 && document.getElementById('order').classList.toggle('hidden')
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function setReview(icon) {
    switch (icon) {
        case 'regular-1':
            document.getElementById('solid-1').classList.toggle('hidden-icons')
            document.getElementById('regular-1').classList.toggle('hidden-icons')
            break
        case 'regular-2':
            document.getElementById('solid-1').classList.toggle('hidden-icons')
            document.getElementById('solid-2').classList.toggle('hidden-icons')
            document.getElementById('regular-1').classList.toggle('hidden-icons')
            document.getElementById('regular-2').classList.toggle('hidden-icons')
            break
        case 'regular-3':
            document.getElementById('solid-1').classList.toggle('hidden-icons')
            document.getElementById('solid-2').classList.toggle('hidden-icons')
            document.getElementById('solid-3').classList.toggle('hidden-icons')
            document.getElementById('regular-1').classList.toggle('hidden-icons')
            document.getElementById('regular-2').classList.toggle('hidden-icons')
            document.getElementById('regular-3').classList.toggle('hidden-icons')
            break
        case 'regular-4':
            document.getElementById('solid-1').classList.toggle('hidden-icons')
            document.getElementById('solid-2').classList.toggle('hidden-icons')
            document.getElementById('solid-3').classList.toggle('hidden-icons')
            document.getElementById('solid-4').classList.toggle('hidden-icons')
            document.getElementById('regular-1').classList.toggle('hidden-icons')
            document.getElementById('regular-2').classList.toggle('hidden-icons')
            document.getElementById('regular-3').classList.toggle('hidden-icons')
            document.getElementById('regular-4').classList.toggle('hidden-icons')
            break
        case 'regular-5':
            document.getElementById('solid-1').classList.toggle('hidden-icons')
            document.getElementById('solid-2').classList.toggle('hidden-icons')
            document.getElementById('solid-3').classList.toggle('hidden-icons')
            document.getElementById('solid-4').classList.toggle('hidden-icons')
            document.getElementById('solid-5').classList.toggle('hidden-icons')
            document.getElementById('regular-1').classList.toggle('hidden-icons')
            document.getElementById('regular-2').classList.toggle('hidden-icons')
            document.getElementById('regular-3').classList.toggle('hidden-icons')
            document.getElementById('regular-4').classList.toggle('hidden-icons')
            document.getElementById('regular-5').classList.toggle('hidden-icons')
            break
    }
    setTimeout(() => {
        document.getElementById('review').classList.toggle('hidden')
    }, 1500)
}

function isDiscountAvailable() {
    const isBeerIncluded = cart.filter(i => i.id === 2).length === 1 ? true : false
    if (isBeerIncluded && cart.length > 1) {
        return true
    }
    return false
}

function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(item => {
        const { name, ingredients, id, price } = item
        menuHtml += `
            <div class="item">
                <img src="./images/${name.toLowerCase()}.png" alt="" class="item__img"/>
                <span class="item__title">${name}</span>
                <span class="item__ingredients">${ingredients}</span>
                <span class="item__price">$${price}</span>
                <button class="item__btn">
                    <img src="./images/add-btn.png" alt="" class="item__btn-img" data-add="${id}">
                </button>
            </div>
            `
    })
    return menuHtml
}

function getCartHtml() {
    let cartHtml = ``
    cart.forEach(item => {
        const { name, id, price } = item
        cartHtml += `
            <div class="order__item">
                <span class="order__item-name">${name}</span>
                <button class="order__remove" data-remove="${id}">remove</button>
                <span class="order__item-price">$${price}</span>
            </div>
            `
    })
    return cartHtml
}

function getHtml() {
    let menuHtml = getMenuHtml()
    let cartHtml = getCartHtml()

    const initialTotal = cart.reduce((prev, current) => prev + current.price, 0)
    let finalTotal = isDiscountAvailable() ? (initialTotal * 0.85).toFixed(1) : initialTotal

    let htmlString = `
        <div class="items">
            ${menuHtml}
        </div>
        <div class="order hidden" id="order">
            <h2 class="order__title">Your order</h2>
            <div class="order__items">
                 ${cartHtml}
            </div>
            <div class="order__summary">
                <span class="order__total">Total</span>
                <span class="order__total-no-discount hidden" id="order__total-no-discount">$${initialTotal}</span>
                <span class="order__total-amount">$${finalTotal}</span>
            </div>
            <button class="order__btn" id="order__btn">Complete order</button>
        </div> 
        <div class="modal" id="modal">
            <p class="modal__title">Enter card details</p>
            <form class="modal__form" id="modal__form">
                <input 
                    type="text" 
                    aria-label="Card name" 
                    placeholder="Enter your card name" 
                    required 
                    class="modal__input"
                    name="card-name"
                    title="Insert only letters or spaces."
                    pattern="^[a-zA-Z ]+$"
                />
                <input 
                    type="text" 
                    aria-label="Card number" 
                    placeholder="Enter your card number" 
                    required 
                    class="modal__input"
                    name="card-number"
                    title="Insert only numbers."
                    pattern="^[0-9]+$"
                />
                <input 
                    type="text" 
                    aria-label="Card CVV" 
                    placeholder="Enter CVV" 
                    required 
                    class="modal__input"
                    name="card-cvv"
                    title="Insert only numbers."
                    pattern="^[0-9]+$"
                />
                <button class="modal__btn" type="submit">Pay</button>
            </form>
        </div>
        <div class="confirmation hidden" id="confirmation">
            <span class="confirmation-msg">Thanks, ${clientName}! Your order is on its way!</span>
        </div>
        <div class="review hidden" id="review">
            <i class="fa-solid fa-star hidden-icons" id="solid-1"></i>
            <i class="fa-solid fa-star hidden-icons" id="solid-2"></i>
            <i class="fa-solid fa-star hidden-icons" id="solid-3"></i>
            <i class="fa-solid fa-star hidden-icons" id="solid-4"></i>
            <i class="fa-solid fa-star hidden-icons" id="solid-5"></i>
            <i class="fa-regular fa-star" id="regular-1" data-icon="regular-1"></i>
            <i class="fa-regular fa-star" id="regular-2" data-icon="regular-2"></i>
            <i class="fa-regular fa-star" id="regular-3" data-icon="regular-3"></i>
            <i class="fa-regular fa-star" id="regular-4" data-icon="regular-4"></i>
            <i class="fa-regular fa-star" id="regular-5" data-icon="regular-5"></i>
        </div> 
        `
    return htmlString
}

function render() {
    document.getElementById('root').innerHTML = getHtml()
}

render()