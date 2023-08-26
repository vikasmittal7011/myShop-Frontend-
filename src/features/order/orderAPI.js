const API = process.env.REACT_APP_API;
const token = localStorage.getItem("token");

export function makeOrder(order) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
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

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "order/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
        authorization: "Bearea " + token,
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject(data.message);
    }
  });
}

export function fetchAllOrders(page, sort) {
  let queryString = "";

  for (let key in page) {
    queryString += `${key}=${page[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "order?" + queryString, {
      headers: { authorization: "Bearea " + token },
    });
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    if (data.success) {
      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    } else {
      reject({ message: data.message });
    }
  });
}
