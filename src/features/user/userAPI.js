const API = process.env.REACT_APP_API;

export function fetchUserData(token) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "user", {
      headers: { authorization: "Bearea " + token },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function fetchUserOrders() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "order/user", {
      headers: {
        authorization: "Bearea " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ ...data });
    } else {
      reject({ message: data.message });
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "user", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
        authorization: "Bearea " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.message });
    }
  });
}
