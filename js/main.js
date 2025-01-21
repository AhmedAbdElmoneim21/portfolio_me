const tabs = document.querySelectorAll("[data-target]");
const tabContent = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContent.forEach((tabContents) => {
      tabContents.classList.remove("skills-active");
    });
    target.classList.add("skills-active");

    tabs.forEach((tab) => {
      tab.classList.remove("skills-active");
    });
    tab.classList.add("skills-active");
  });
});
// ................................................//
let mixerPortfolio = mixitup(".work-container", {
  selectors: {
    target: ".work-card",
  },
  animation: {
    duration: 300,
  },
});
// ................................................//
const linkWork = document.querySelectorAll(".work-item");

function activeWork() {
  linkWork.forEach((l) => l.classList.remove("active-work"));
  this.classList.add("active-work");
}
linkWork.forEach((l) => l.addEventListener("click", activeWork));

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("work-button")) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
}
document
  .querySelector(".portfolio-popup-close")
  .addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  document.querySelector(".pp-thumbnail img").src =
    portfolioItem.querySelector(".work-img").src;
  document.querySelector(".portfolio-popup-subtitle").innerHTML =
    portfolioItem.querySelector(".work-title").innerHTML;

  document.querySelector(".portfolio-popup-body").innerHTML =
    portfolioItem.querySelector(".portofoli-item-details").innerHTML;
}
// ................................................//
const inputs = document.querySelectorAll(".input");

function focusFun() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function funBlur() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}
inputs.forEach((input) => {
  input.addEventListener("focus", focusFun);
  input.addEventListener("blur", funBlur);
});
// ................................................//
const navMenu = document.getElementById("slidebar"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-slidebar");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-slidebar");
  });
}
// ................................................//
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
      return;
    }
    document
      .querySelector(".nav-menu a[href*=" + sectionId + "]")
      .classList.remove("active-link");
  });
}

const sr = ScrollReveal({
  origin: "top",
  distance: "100px",
  duration: 1500,
  delay: 200,
  reset: true,
});
/* Animations repeat */
sr.reveal(`.home`);
sr.reveal(
  `#about, .services-section, .qualification, #Certificates, #skills, #work, .contact`,
  {
    origin: "bottom",
    // interval: 500,
  }
);

const app = document.querySelector(".home-title");
const typewriter = new Typewriter(".home-title", {
  loop: true,
});
typewriter.typeString("Hi, I'm Ahmed").pauseFor(2500).start();

const up = document.querySelector(".up");
window.onscroll = function () {
  this.scrollY >= 600 ? up.classList.add("asd") : up.classList.remove("asd");
};
up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const btn = document.querySelector(".btn-share");
const title = window.document.title;
const url = window.document.location.href;
btn.addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: `${title}`,
        url: `${url}`,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  }
});

// let swiper = new Swiper(".Certificates-container", {
//   spaceBetween: 24,
//   grabCursor: true,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

let loading = document.getElementById("loading");

setTimeout(load, 1500);
function load() {
  window.onload = loading.style.display = "none";
}
// window.onload = function() {
//   document.getElementById('audio').onplay()
// }

const audio = document.getElementById("pap");
const body = document.body;
//     function beepSound () {
//       audio.play()
// }
// beepSound()

body.onclick = function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

const namee = document.getElementById("name").value;

const emaile = document.getElementById("email").value;

const phonee = document.getElementById("phone").value;

const messagee = document.getElementById("message").value;

const firebaseConfig = {
  apiKey: "AIzaSyAfJzc6w5jzoHg9lyiYngvfwyWB_pKW8D8",
  authDomain: "contact-form-7bed6.firebaseapp.com",
  databaseURL: "https://contact-form-7bed6-default-rtdb.firebaseio.com",
  projectId: "contact-form-7bed6",
  storageBucket: "contact-form-7bed6.appspot.com",
  messagingSenderId: "1046621602443",
  appId: "1:1046621602443:web:f1a6c01de47199d63d0a8e",
  measurementId: "G-60NNRRFV01",
};
firebase.initializeApp(firebaseConfig);
let contactDB = firebase.database().ref("contact");





$(document).ready(function(){
  $('.work-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      arrows: true
  });
});