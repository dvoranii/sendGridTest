const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav__link");

const baseUrl = "http://localhost:8000/";
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");

// NAV

// Nav bar
burger.addEventListener("click", () => {
  nav.classList.toggle("nav-active");

  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
    }
  });
  // Burger animation
  burger.classList.toggle("toggle");
});

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
      parcel: {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      },
    }),
  });
}

submitBtn.addEventListener("click", postInfo);
