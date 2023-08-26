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

export function fetchUserOrders(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "order/" + userId);
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
    const response = await fetch(API + "user/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
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
