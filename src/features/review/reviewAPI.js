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

export function fetchReviews(id, page) {
  let queryString = `_page=${page._page}&_limit=${page._limit}`;

  return new Promise(async (resolve, reject) => {
    const response = await fetch(API + "review/" + id + "?" + queryString, {
      headers: {
        authorization: "Bearea " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    const totalReviews = +response.headers.get("X-Total-Count");

    if (data.success) {
      resolve({ data: { reviews: data.reviews, totalReviews: +totalReviews } });
    } else {
      reject({ message: data.message });
    }
  });
}
