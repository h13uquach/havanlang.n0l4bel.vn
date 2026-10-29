// Shared behaviour for every page: mobile menu, home carousel, product
// option pickers and the basket. Plain JavaScript, no libraries.

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Home carousel: auto-advance every 5s, dots jump to a slide
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".carousel-dots button");
let current = 0;
function showSlide(i) {
  slides[current].classList.remove("is-active");
  dots[current].classList.remove("is-active");
  current = (i + slides.length) % slides.length;
  slides[current].classList.add("is-active");
  dots[current].classList.add("is-active");
}
if (slides.length) {
  dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
  setInterval(() => showSlide(current + 1), 5000);
}

const vnd = (n) => n.toLocaleString("vi-VN") + "₫";

// Single-choice pickers: sizes, ticket tiers, payment methods, topics, thumbnails
document.querySelectorAll("[data-pick]").forEach((group) => {
  group.addEventListener("click", (e) => {
    const item = e.target.closest("[data-option]");
    if (!item || item.classList.contains("sold-out")) return;
    group.querySelectorAll("[data-option]").forEach((el) => el.classList.remove("is-active"));
    item.classList.add("is-active");
    const big = document.querySelector(".product-main img");
    const img = item.querySelector("img");
    if (big && img) big.src = img.src;
    // Ticket tiers carry their own price
    if (item.dataset.price) document.querySelector(".product .price").textContent = vnd(Number(item.dataset.price));
  });
});

// Basket, kept in localStorage so every page shares it
const KEY = "mck-basket";
function loadBasket() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function saveBasket(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

// Product pages: add the chosen size / ticket tier and quantity
document.querySelectorAll("[data-add]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const p = JSON.parse(btn.dataset.add);
    const size = document.querySelector(".sizes .is-active");
    const tier = document.querySelector("[data-pick] [data-price].is-active");
    const item = {
      name: tier ? `${p.name} / ${tier.dataset.label.split(" / ")[0]}` : p.name,
      sub: tier ? tier.dataset.label.split(" / ").slice(1).join(" / ") : size ? "Size: " + size.textContent : p.sub,
      price: tier ? Number(tier.dataset.price) : p.price,
      img: p.img,
      qty: Number(document.querySelector(".product .qty output").value),
    };
    const items = loadBasket();
    const same = items.find((i) => i.name === item.name && i.sub === item.sub);
    if (same) same.qty += item.qty;
    else items.push(item);
    saveBasket(items);
    location.href = "checkout.html";
  });
});

// Checkout: draw the basket and keep totals in sync
const SHIPPING = 30000;
const cartBody = document.querySelector(".cart tbody");
function renderCart() {
  const items = loadBasket();
  cartBody.innerHTML = items.length
    ? items.map((it, i) => `<tr data-i="${i}"><td><div class="item"><img src="${it.img}" alt="${it.name}"><div><strong>${it.name}</strong><small>${it.sub}</small></div></div></td>
        <td><div class="qty"><button type="button" data-step="-1" aria-label="Decrease">&minus;</button><output>${it.qty}</output><button type="button" data-step="1" aria-label="Increase">+</button></div></td>
        <td>${vnd(it.price * it.qty)}</td><td><button class="remove" aria-label="Remove ${it.name}">&#x2715;</button></td></tr>`).join("")
    : '<tr><td class="empty" colspan="4">Your basket is empty.</td></tr>';
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = items.length ? SHIPPING : 0;
  document.querySelector("#subtotal").textContent = vnd(subtotal);
  document.querySelector("#shipping").textContent = vnd(shipping);
  document.querySelector("#total").textContent = vnd(subtotal + shipping);
  document.querySelector("#count").textContent = items.reduce((n, it) => n + it.qty, 0);
}
if (cartBody) {
  cartBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-i]");
    if (!row) return;
    const items = loadBasket();
    const i = Number(row.dataset.i);
    if (e.target.closest(".remove")) items.splice(i, 1);
    else if (e.target.dataset.step) items[i].qty = Math.max(1, items[i].qty + Number(e.target.dataset.step));
    else return;
    saveBasket(items);
    renderCart();
  });
  renderCart();
}

// Quantity steppers on product pages
document.querySelectorAll(".product .qty").forEach((qty) => {
  const out = qty.querySelector("output");
  qty.addEventListener("click", (e) => {
    const step = Number(e.target.dataset.step || 0);
    if (step) out.value = Math.max(1, Number(out.value) + step);
  });
});

// Demo forms: no backend, so just confirm on submit
document.querySelectorAll("form[data-demo]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(form.dataset.demo);
    form.reset();
    if (form.hasAttribute("data-clear")) {
      saveBasket([]);
      renderCart();
    }
  });
});

// Contact form: show the sent state, then reload a fresh form (default topic)
document.querySelectorAll("form[data-done]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.innerHTML = form.dataset.done;
    btn.classList.add("is-done");
    setTimeout(() => {
      form.reset(); // so Firefox doesn't restore the typed values
      location.reload();
    }, 1500);
  });
});
