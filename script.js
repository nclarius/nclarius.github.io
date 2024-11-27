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
trigger scroll effects
=============================================
*/

document.addEventListener("DOMContentLoaded", updateScroll);
window.addEventListener("load", updateScroll);
window.addEventListener("scroll", updateScroll);
window.addEventListener("resize", updateScroll);
window.addEventListener('mousemove', updateMouseMove);

function updateScroll() {
  // shadow header on scrolledness
  indicateScrolledness();

  // adjust size of headings
  adjustHeadersize()

  // highlight each section on activeness
  document.querySelectorAll("section").forEach(indicateVisibilitySection);

  // update nav button visibility
  updateMouseMove();

  // update scroll button visibility
  updateVisibilityScrollButton();

  // disable hover effects while scrolling
  suppressPointerEvents();
}

function updateMouseMove() {
  // update nav button visibility
  updateVisibilityNavButtons(true);
}

function indicateScrolledness() {
  const headerMaxHeight = window.innerWidth > 1000  ? 300
                            : window.innerWidth > 600 ? 200
                                                        : 60;
  const headerMinHeight = window.innerWidth > 1000 ? 80 : 60;
  const headerHeightDiff = headerMaxHeight - headerMinHeight;
  const header = document.getElementById("header");
  console.log(headerHeightDiff, window.scrollY);
  if (window.scrollY > headerHeightDiff) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function adjustHeadersize() {
  // header
  const headerMinHeight = window.innerWidth > 1000 ? 80 : 60;
  const headerMaxHeight = window.innerWidth > 1000  ? 300
                          : window.innerWidth > 600 ? 200
                                                    : 60;
  const headerHeight =
      Math.max(headerMinHeight, headerMaxHeight - window.scrollY);
  // headings div
  const headings = document.getElementById("headings");
  headings.style.top = window.scrollY + "px";
  headings.style.height = headerHeight + "px";
  // nav
  const nav = document.getElementById("nav");
  nav.style.top = headerHeight + "px";
  // heading
  const headingMinHeight = window.innerWidth > 1000  ? 1.75
                           : window.innerWidth > 600 ? 1.25
                                                     : 1.25;
  const headingMaxHeight = window.innerWidth > 1000  ? 3
                           : window.innerWidth > 600 ? 2
                                                     : 1.25;
  const heading = document.getElementById("heading");
  heading.style.fontSize =
      Math.max(headingMinHeight, headingMaxHeight - window.scrollY / 100) +
      "em";
  // subheading
  const subheadingMinHeight = window.innerWidth > 1000  ? 1.25
                              : window.innerWidth > 600 ? 1
                                                        : 0;
  const subheadingMaxHeight = window.innerWidth > 1000  ? 1.5
                              : window.innerWidth > 600 ? 1.25
                                                        : 0;
  const subheading = document.getElementById("subheading");
  subheading.style.fontSize =
      Math.max(subheadingMinHeight,
               subheadingMaxHeight - window.scrollY / 100) +
      "em";
  subheading.style.marginTop = "0px";
  subheading.style.alignSelf = "start";
}

function indicateVisibilitySection(section) {
  const li =
      document
          .querySelector(`nav ul li a[href="#${section.getAttribute("id")}"]`)
          .parentElement;
  const geo = section.getBoundingClientRect();
  if (geo.top + 1 < document.documentElement.clientHeight &&
      geo.bottom > document.getElementById("header").offsetHeight + 1) {
    li.classList.add("active");
  } else {
    li.classList.remove("active");
  }
}

var navBtnVisibilityTimeout = window.setTimeout(2000);
function updateVisibilityNavButtons(timeout = true) {
    const navBtn = document.getElementById("btn-hamburger");
    const topBtn = document.getElementById("btn-top");
    const bottomBtn = document.getElementById("btn-bottom");
    const naviBtns = [ navBtn, topBtn, bottomBtn ];
    naviBtns.forEach(btn => {
      if (btn == navBtn || btn == topBtn && window.scrollY ||
          btn == bottomBtn && window.scrollY + window.innerHeight <
                                  document.body.scrollHeight) {
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
          naviBtns.forEach(btn => { btn.style.opacity = "0"; });
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

var pointerEventsTimeout = setTimeout(0);
function suppressPointerEvents() {
    clearTimeout(pointerEventsTimeout);
    document.body.style.pointerEvents = "none";
    pointerEventsTimeout = setTimeout(() => {
        document.body.style.pointerEvents = "auto";
    }, 250);
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

/*
=============================================
set updated date
=============================================
*/

document.addEventListener("DOMContentLoaded", setUpdatedDate);
function setUpdatedDate() {
    var date = new Date(document.lastModified).toISOString();
    var dateStr = date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4);
    document.getElementById("footer-updated").innerHTML = "Last updated: " + dateStr;
  }
