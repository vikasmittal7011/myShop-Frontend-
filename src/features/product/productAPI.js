export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    resolve({ data });
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
    const response = await fetch(
      "http://localhost:5000/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrand() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/brand");
    const data = await response.json();
    resolve({ data });
  });
}
