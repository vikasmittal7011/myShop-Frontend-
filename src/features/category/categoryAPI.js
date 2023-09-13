const API = process.env.REACT_APP_API;

export function fetchAllCategory() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "category");
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function createCategory(category) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "category", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearea " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data: data.data });
    } else {
      reject({ message: data.message });
    }
  });
}
