const API = process.env.REACT_APP_API;

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "product/" + id);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      resolve({ data: data.product });
    } else {
      reject({ data: data.message });
    }
  });
}

export function fetchProductByFilters(filters, sort, page) {
  let queryString = "";

  for (let key in filters) {
    const categoryValues = filters[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in page) {
    queryString += `${key}=${page[key]}&`;
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
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.product });
    } else {
      reject({ data: data.message });
    }
  });
}
