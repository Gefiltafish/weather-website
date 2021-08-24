console.log("Client side JS is loaded");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;
  let url = "/weather?address=" + location;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
