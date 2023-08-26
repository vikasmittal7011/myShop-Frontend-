const API = process.env.REACT_APP_API;
const token = localStorage.getItem("token");

export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        authorization: "Bearea " + token,
        "content-type": "application/json",
      },
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
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart", {
      headers: {
        authorization: "Bearea " + token,
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

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

export function deleteItem(itemId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart/" + itemId, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.messsage });
    }
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart/clear-cart/" + userId, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.messsage });
    }
  });
}
