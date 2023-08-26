const API = process.env.REACT_APP_API;

export function fetchAllBrand() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "brand");
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function createBrand(brand) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "brand", {
      method: "POST",
      body: JSON.stringify(brand),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.data });
    } else {
      reject({ message: data.message });
    }
  });
}
