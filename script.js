/*
Natalie Clarius - Personal Website
(C) 2022 Natalie Clarius <natalie_clarius@yahoo.de>
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
    if (window.matchMedia("(min-width: 801px)").matches) {
        nav.classList.remove("toggleable");
        nav.classList.remove("open");
        nav.classList.remove("closed");
    } else if (window.matchMedia("(max-width: 800px)").matches) {
        nav.classList.add("toggleable");
        if (!nav.classList.contains("open")) {
            closeNav();
        }
    }
}

function toggleNav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    if (!nav.classList.contains("open")) {
        openNav();
    } else if (!nav.classList.contains("closed")) {
        closeNav();
    }
}

function openNav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    nav.classList.add("open");
    nav.classList.remove("closed");

    const navBtn = document.getElementById("btn-nav");
    navBtn.classList.add("open");
    navBtn.classList.remove("closed");
    navBtn.setAttribute("title", "close navigation");
    navBtn.innerHTML = "&rang;";
}

function closeNav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    nav.classList.add("closed");
    nav.classList.remove("open");

    const navBtn = document.getElementById("btn-nav");
    navBtn.classList.add("closed");
    navBtn.classList.remove("open");
    navBtn.setAttribute("title", "open navigation");
    navBtn.innerHTML = "&lang;";
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

function updateScroll() {
    // shadow header on scrolledness
    indicateScrollednessHeader();

    // highlight each section on activeness
    document.querySelectorAll("section").forEach((section) => {
        indicateVisibilitySection(section);
    });
}

function indicateScrollednessHeader() {
    const header = document.getElementById("header");
    if (window.scrollY) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function indicateVisibilitySection(section) {
    const li = document.querySelector(`nav ul li a[href="#${section.getAttribute("id")}"]`).parentElement;
    const geo = section.getBoundingClientRect();
    if (geo.top < document.documentElement.clientHeight && geo.bottom > document.getElementById("header").offsetHeight) {
        li.classList.add("active");
    } else {
        li.classList.remove("active");
    }
}

/*
=============================================
toggle light/dark mode
=============================================
*/

document.addEventListener("DOMContentLoaded", initializeColor);

function initializeColor() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColor(true);
    } else {
        setColor(false);
    }
}

function toggleColor() {
    if (!document.documentElement.classList.contains("dark")) {
        setColor(true);
    } else {
        setColor(false);
    }
}

function setColor(dark) {
    const root = document.documentElement;
    const colorBtn = document.getElementById("btn-color");
    if (dark) {
        root.classList.add("dark");
        root.classList.remove("light");
        colorBtn.setAttribute("title", "light color scheme");
    } else {
        root.classList.add("light");
        root.classList.remove("dark");
        colorBtn.setAttribute("title", "dark color scheme");
    }
}
