export function setAlert(item) {
  return new Promise(async (resolve) => {
    resolve(item);
  });
}

export function removeAlert() {
  return new Promise(async (resolve) => {
    const item = {
      color: "",
      type: "",
      message: "",
    };
    resolve(item);
  });
}
