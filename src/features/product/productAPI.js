// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    resolve({ data });
  });
}
