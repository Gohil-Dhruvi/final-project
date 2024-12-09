const productList = [];
const cart = [];

document.getElementById('add-product').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const brand = document.getElementById('brand').value;
    const color = document.getElementById('color').value;

    if (title && description && price && category && brand && color) {
        const product = { title, description, price, category, brand, color };
        productList.push(product);
        localStorage.setItem('productList', JSON.stringify(productList));
        renderProducts();
        alert('Product added successfully!');
    } else {
        alert('Please fill all fields.');
    }
});

function renderProducts() {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    productList.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Color:</strong> ${product.color}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function addToCart(index) {
    const product = productList[index];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.title} - $${item.price}`;
        cartContainer.appendChild(cartItem);
    });
}

window.onload = () => {
    const savedProducts = JSON.parse(localStorage.getItem('productList')) || [];
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    productList.push(...savedProducts);
    cart.push(...savedCart);

    renderProducts();
    renderCart();
};
