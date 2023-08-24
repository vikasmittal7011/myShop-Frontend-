const API = process.env.REACT_APP_API;

export function makeOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(API + "order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
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

  return new Promise(async (resolve) => {
    const response = await fetch(API + "order?" + queryString);
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
