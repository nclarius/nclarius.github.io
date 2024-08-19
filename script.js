/*
Natalie Clarius - Personal Website
(C) 2022-2024 Natalie Clarius <natalie_clarius@yahoo.de>
*/

/*
=============================================
toggle nav overlay
=============================================
*/

document.addEventListener("DOMContentLoaded", updateNavToggleability);
window.addEventListener("load", updateNavToggleability);
window.addEventListener("resize", updateNavToggleability);

function updateNavToggleability() {
    const nav = document.getElementById("nav");
    if (window.matchMedia("(min-width: 1001px)").matches) {
        nav.classList.remove("toggleable");
        nav.classList.remove("open");
        nav.classList.remove("closed");
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
        nav.classList.add("toggleable");
        setNav(false);
    }
}

function toggleNav() {
    const nav = document.getElementById("nav");
    setNav(!nav.classList.contains("open"));
}

function setNav(open) {
    const nav = document.getElementById("nav");
    const navIcn = document.getElementById("icon-hamburger");
    const navBtn = document.getElementById("btn-hamburger");
    const topBtn = document.getElementById("btn-top");
    const bottomBtn = document.getElementById("btn-bottom");
    if (!nav.classList.contains("toggleable")) return;
    if (open) {
        [nav, navIcn, navBtn, topBtn, bottomBtn].forEach(btn => {
            btn.classList.add("open");
            btn.classList.remove("closed");
        });
        navBtn.setAttribute("title", "Close navigation");
        updateVisibilityNavButtons(false);
    } else {
        [nav, navIcn, navBtn, topBtn, bottomBtn].forEach(btn => {
            btn.classList.add("closed");
            btn.classList.remove("open");
        });
        navBtn.setAttribute("title", "Open navigation");
    }
}

function setHamburger(toggle) {
    const nav = document.getElementById("nav");
    const navIcn = document.getElementById("icon-hamburger");
    open = toggle != nav.classList.contains("open");
    if (open) {
        navIcn.classList.add("open");
        navIcn.classList.remove("closed");
    } else {
        navIcn.classList.add("closed");
        navIcn.classList.remove("open");
    }
}

/*
=============================================
scroll to top/bottom
=============================================
*/

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
}

function scrollDown() {
    window.scrollBy({
        top: window.innerHeight - document.getElementById("header").offsetHeight,
        behavior: "smooth",
    });
}

/*
=============================================
highlight currently active section in navbar
and shadow header on scrolledness
=============================================
*/

document.addEventListener("DOMContentLoaded", updateScroll);
window.addEventListener("load", updateScroll);
window.addEventListener("scroll", updateScroll);
window.addEventListener("resize", updateScroll);
window.addEventListener('mousemove', updateMouseMove);

function updateScroll() {
    // shadow header on scrolledness
    indicateScrollednessHeader();

    // highlight each section on activeness
    document.querySelectorAll("section").forEach(indicateVisibilitySection);

    // update nav button visibility
    updateMouseMove();

    // update scroll button visibility
    updateVisibilityScrollButton();
}

function updateMouseMove() {
    // update nav button visibility
    updateVisibilityNavButtons(true);
}

function indicateScrollednessHeader() {
  const root = document.documentElement;
  if (window.scrollY) {
    root.classList.add("scrolled");
  } else {
    root.classList.remove("scrolled");
  }
}

function indicateVisibilitySection(section) {
  const li =
      document
          .querySelector(`nav ul li a[href="#${section.getAttribute("id")}"]`)
          .parentElement;
  const geo = section.getBoundingClientRect();
  const headerOffset = (window.scrollY ? 0 : 30)
  if (geo.top + headerOffset + 1 < document.documentElement.clientHeight &&
      geo.bottom + headerOffset >
          document.getElementById("header").offsetHeight + 1) {
    li.classList.add("active");
  }
  else {
    li.classList.remove("active");
  }
}

var navBtnVisibilityTimeout = window.setTimeout(2000);
function updateVisibilityNavButtons(timeout = true) {
    const navBtn = document.getElementById("btn-hamburger");
    const topBtn = document.getElementById("btn-top");
    const bottomBtn = document.getElementById("btn-bottom");
    const naviBtns = [navBtn, topBtn, bottomBtn];
    naviBtns.forEach(btn => {
        if (btn == navBtn || 
            btn == topBtn && window.scrollY || 
            btn == bottomBtn && window.scrollY + window.innerHeight < document.body.scrollHeight) {
            btn.style.opacity = "100";
        } else {
            btn.style.opacity = "0";
        }
    });
    if (timeout) {
        window.clearTimeout(navBtnVisibilityTimeout);
        navBtnVisibilityTimeout = window.setTimeout(() => {
            if (!(document.getElementById("nav").classList.contains("open") ||
                  naviBtns.some(btn => btn.matches(":hover")))) {
                naviBtns.forEach(btn => {
                            btn.style.opacity = "0";
                    }
                );
            }
        }, 2000);
    }
}

function updateVisibilityScrollButton() {
    const scrollBtn = document.getElementById("btn-scroll");
    if (window.scrollY) {
        scrollBtn.style.display = "none";
    }
}

/*
=============================================
toggle light/dark mode
=============================================
*/

document.addEventListener("DOMContentLoaded", initializeColor);

function initializeColor() {
    setColor(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function toggleColor() {
    setColor(!document.documentElement.classList.contains("dark"));
}

function setColor(dark) {
    const root = document.documentElement;
    const colorBtn = document.getElementById("btn-color");
    if (dark) {
        root.classList.add("dark");
        root.classList.remove("light");
        colorBtn.setAttribute("title", "Switch to light color scheme");
    } else {
        root.classList.add("light");
        root.classList.remove("dark");
        colorBtn.setAttribute("title", "Switch to dark color scheme");
    }
}
