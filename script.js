/*Products data*/

const products = [
  { id: 1, name: "Sneakers",     price: 2500, stock: 5,  image: "images/sneakers.jpg"},
  { id: 2, name: "Backpack",     price: 1800, stock: 0,  image: "images/backpack.jpg"},
  { id: 3, name: "Water Bottle", price: 450,  stock: 12, image: "images/Waterbottle.jpg"},
  { id: 4, name: "Notebook",     price: 150,  stock: 30, image: "images/Notebook.jpg"},
  { id: 5, name: "Headphones",   price: 3200, stock: 2,  image: "images/Headphones.jpg"},
];

// 2. Grab elements
const productsEl = document.getElementById("products");
const selectedEl = document.getElementById("selected");
const priceFilter = document.getElementById("priceFilter");
const stockFilter = document.getElementById("stockFilter");
const resetBtn = document.getElementById("resetBtn");

let selectedId = null; // only one product can be selected at a time

// 3. Apply both filters and return the matching products
function getFilteredProducts() {
  return products.filter(function (p) {
    // price filter
    let priceOk = true;
    if (priceFilter.value !== "all") {
      const range = priceFilter.value.split("-");
      priceOk = p.price >= Number(range[0]) && p.price < Number(range[1]);
    }

    // stock filter
    let stockOk = true;
    if (stockFilter.value === "in") stockOk = p.stock > 0;
    if (stockFilter.value === "out") stockOk = p.stock === 0;

    return priceOk && stockOk;
  });
}

// 4. Build the product cards
function renderProducts() {
  const list = getFilteredProducts();
  productsEl.innerHTML = "";

  if (list.length === 0) {
    productsEl.innerHTML = "<p class='empty'>No products match your filters.</p>";
    return;
  }

  list.forEach(function (p) {
    const card = document.createElement("article");
    card.className = "card" + (p.id === selectedId ? " active" : "");

    const inStock = p.stock > 0;
    card.innerHTML =
      '<img src="' + p.image + '" alt="' + p.name + '">' +
      "<h3>" + p.name + "</h3>" +
      '<p class="price">KES ' + p.price.toLocaleString() + "</p>" +
      '<span class="badge ' + (inStock ? "in" : "out") + '">' +
        (inStock ? p.stock + " in stock" : "Out of stock") +
      "</span>";

    card.addEventListener("click", function () {
      selectedId = p.id;
      renderProducts();
      renderSelected();
    });

    productsEl.appendChild(card);
  });
}

// 5. Show the selected product's details
function renderSelected() {
  const p = products.find(function (item) { return item.id === selectedId; });
  if (!p) {
    selectedEl.classList.add("hidden");
    return;
  }
  selectedEl.classList.remove("hidden");
  selectedEl.innerHTML =
    '<img src="' + p.image + '" alt="' + p.name + '">' +
    "<div><h2>" + p.name + "</h2>" +
    "<p>Price: KES " + p.price.toLocaleString() + "</p>" +
    "<p>" + (p.stock > 0 ? p.stock + " available" : "Currently out of stock") + "</p></div>";
}

// 6. Events
priceFilter.addEventListener("change", renderProducts);
stockFilter.addEventListener("change", renderProducts);
resetBtn.addEventListener("click", function () {
  priceFilter.value = "all";
  stockFilter.value = "all";
  selectedId = null;
  renderProducts();
  renderSelected();
});

// 7. First render
renderProducts();
