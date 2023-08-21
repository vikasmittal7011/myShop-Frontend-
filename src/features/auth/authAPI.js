const API = process.env.REACT_APP_API;

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "auth", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function logoutUser(id) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
