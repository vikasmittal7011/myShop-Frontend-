export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId }, item: data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const cartItems = await fetchItemsByUser(userId);
    const items = cartItems.data;
    for (let item of items) {
      await deleteItem(item.id);
    }
    resolve({ status: "success" });
  });
}
