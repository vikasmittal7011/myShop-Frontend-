export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByFilters(filters, sort) {
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

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:5000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
