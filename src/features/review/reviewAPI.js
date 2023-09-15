const API = process.env.REACT_APP_API;

export function postReview(review) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "review", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        authorization: "Bearea " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      resolve({ data });
    } else {
      reject({ message: data.messsage });
    }
  });
}

export function fetchReviews(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "review/" + id, {
      headers: {
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

export function updateReview(update) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "cart/" + update.id, {
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
      reject({ message: data.messsage });
    }
  });
}
