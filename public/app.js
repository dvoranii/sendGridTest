const baseUrl = "http://localhost:8000/";

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const submitBtn = document.querySelector("#submitBtn");

async function getInfo(e) {
  e.preventDefault();

  const res = await fetch(baseUrl, {
    method: "GET",
  });

  console.log(res);
}

async function postInfo(e) {
  e.preventDefault();
  if (fullName.value == "") {
    return;
  }
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: `${fullName.value}\n${email.value}`,
    }),
  });

  console.log(res);
}

submitBtn.addEventListener("click", postInfo);
