//product api call
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts(); 

// show all product in UI  
const showProducts = (products) => {
   const allProducts = products.map((pd) => pd);
  for (const product of allProducts) { 
// get product from array 
    const image = product.image;
    const div = document.createElement("div"); 
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p> Total rating: ${product.rating.count}<p> 
      <p> average rating: ${product.rating.rate} <i class="fas fa-star"></i> <p>
      <h2>Price: $ ${product.price}</h2> 
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="addCartDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = id => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal(); 
};

//grandTotal update function
 const updateTotal = () =>{
  const grandTotal = parseFloat(document.getElementById("price").innerText)+ parseFloat( document.getElementById("delivery-charge").innerText) + parseFloat( document.getElementById("total-tax").innerText); 
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
} 

//load product by id 
const addCartDetails =  productId => {
 fetch(`https://fakestoreapi.com/products/${productId}`)
 .then(res => res.json(res))
 .then(data =>  displayDetails(data) )
};
// show details url
const displayDetails = product => {
  const details = document.getElementById('cart-details');
  details.textContent = '';
  const div = document.createElement('div');
  div.classList.add("product");
  div.innerHTML = `<div class="single-product">
  <div>
    <img class="product-image" src=${product.image}></img>
  </div>
  <h3>${product.title}</h3>
  <p>Category: ${product.category}</p>
  <p>Total rating: ${product.rating.count}</p>
  <p>average rating: ${product.rating.rate} <i class="fas fa-star"></i></p>
  <h2>Price: $ ${product.price}</h2> 
  `
details.appendChild(div); 
}   
