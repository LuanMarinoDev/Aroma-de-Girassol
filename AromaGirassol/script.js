function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function calcularTotal(carrinho) {
  return carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );
}

function exibirCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalValue = document.getElementById("total-value");

  cartItemsContainer.innerHTML = "";

  carrinho.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="https://via.placeholder.com/100" alt="${item.nome}">
      <div class="item-info">
        <h2>${item.nome}</h2>
        <div class="quantity">
          <button onclick="alterarQuantidade('${item.nome}', -1)">-</button>
          <span>${item.quantidade}</span>
          <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
        </div>
        <div class="price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
        <button class="remove" onclick="removerDoCarrinho('${
          item.nome
        }')">Remover</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  totalValue.textContent = `R$ ${calcularTotal(carrinho).toFixed(2)}`;
}

function alterarQuantidade(nomeProduto, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find((item) => item.nome === nomeProduto);

  if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter((item) => item.nome !== nomeProduto);
    }
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}

function removerDoCarrinho(nomeProduto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho = carrinho.filter((item) => item.nome !== nomeProduto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}

window.onload = exibirCarrinho;

function finalizarCompra() {
  localStorage.removeItem("carrinho");
  exibirCarrinho();
  alert("Compra finalizada com sucesso!");
}
