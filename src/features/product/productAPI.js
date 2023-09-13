const API = process.env.REACT_APP_API;

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "product/" + id);
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.product });
    } else {
      reject({ data: data.message });
    }
  });
}

export function fetchRelatedProductById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "product/relatedProduct/" + id);
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.product });
    } else {
      reject({ data: data.message });
    }
  });
}

export function fetchProductByFilters(filters, sort, page, admin, search) {
  let queryString = "admin=" + admin + "&";

  for (let key in filters) {
    const categoryValues = filters[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in page) {
    queryString += `${key}=${page[key]}&`;
  }

  if (search) {
    queryString += `search=${search}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(API + "product?" + queryString);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "product", {
      method: "POST",
      body: product,
      headers: { authorization: "Bearea " + localStorage.getItem("token") },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ data: data.message });
    }
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "product/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
        authorization: "Bearea " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.product });
    } else {
      reject({ data: data.message });
    }
  });
}
