const API = process.env.REACT_APP_API;

export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.messsage });
    }
  });
}

export function fetchItemsByUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(API + "cart/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

//TOOD
export function updateItem(update) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.messsage });
    }
  });
}

//TOOD
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

//TOOD
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
