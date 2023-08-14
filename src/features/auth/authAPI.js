export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userData;
    const response = await fetch("http://localhost:5000/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Password Not match!!" });
      }
    } else {
      reject({ message: "User Not Found!!" });
    }
  });
}

export function logoutUser(id) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
