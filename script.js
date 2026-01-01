/* =========================
   RESUME & PROJECT OVERLAYS
========================= */
const resumeBtn = document.querySelector(".Resume");
const overlay = document.getElementById("resumeOverlay");
const page = document.getElementById("pageContent");
const projectsOverlay = document.querySelector(".projectsOverlay");
const projectBtn = document.querySelector(".Projects");
const closeProjectsBtn = document.querySelector(".closeProjects");
const closeResumeBtn = document.querySelector(".closeResume");

closeResumeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    page.classList.remove("blur");
        document.body.classList.remove("modal-open");
});

resumeBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  page.classList.add("blur")

  document.body.classList.add("modal-open");
});

projectBtn.addEventListener("click", () => {
  projectsOverlay.style.display = "flex";
  page.classList.add("blur");

  requestAnimationFrame(() => {
    projectsOverlay.classList.add("active");
  });

  document.body.classList.add("modal-open");
});

// CLOSE MODAL (fade-out)
closeProjectsBtn.addEventListener("click", () => {
  projectsOverlay.classList.remove("active");
  projectsOverlay.classList.add("closing");
  page.classList.remove("blur");


  document.body.classList.remove("modal-open");

  setTimeout(() => {
    projectsOverlay.style.display = "none";
    projectsOverlay.classList.remove("closing");
  }, 400); // must match CSS transition
});

/* =========================
   DOM CONTENT LOADED
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => observer.observe(el));


  /* =========================
     PROJECTS SLIDER + DOTS
  ========================= */
  const totalbox = document.querySelector(".totalbox");
  const cards = document.querySelectorAll(".Projects-box");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;

  cards.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      totalbox.scrollTo({
        left: index * totalbox.clientWidth,
        behavior: "smooth"
      });
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  totalbox.addEventListener("scroll", () => {
    const index = Math.round(totalbox.scrollLeft / totalbox.clientWidth);

    if (index !== currentIndex) {
      currentIndex = index;
      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }
  });

  /* =========================
     TYPING ANIMATION
  ========================= */
  const texts = ["Web Developer"];
  const typingElement = document.getElementById("typing");

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseAfterType = 1200;

  function typeLoop() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.slice(0, charIndex++);
      if (charIndex > currentText.length) {
        setTimeout(() => isDeleting = true, pauseAfterType);
      }
    } else {
      typingElement.textContent = currentText.slice(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeLoop();

  /* =========================
     NAV CLICK → SCROLL + ANIMATION REPLAY
  ========================= */
  const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    // Smooth scroll
    targetSection.scrollIntoView({ behavior: "smooth" });

    // REMOVE animation to reset
    targetSection.classList.remove("animate");

    // FORCE reflow (so animation restarts)
    void targetSection.offsetWidth;

    // ADD animation again
    setTimeout(() => {
      targetSection.classList.add("animate");
    }, 200);

    // Nav active state (optional)
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".progress span");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const value = bar.getAttribute("style").match(/\d+/)[0];
          bar.style.width = value + "%";
        });
        skillObserver.disconnect(); // animate once
      }
    });
  },
  { threshold: 0.3 }
);

skillObserver.observe(skillSection);

});
