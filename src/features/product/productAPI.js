export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByFilters(filters) {
  let queryString = "";

  for (let key in filters) {
    queryString += `${key}=${filters[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:5000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
