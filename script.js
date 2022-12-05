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
        setNav(false);
    }
}

function toggleNav() {
    const nav = document.getElementById("nav");
    setNav(!nav.classList.contains("open"));
}

function setNav(open) {
    const nav = document.getElementById("nav");
    const navBtn = document.getElementById("btn-nav");
    const navIcn = document.getElementById("icon-nav");
    // const topBtn = document.getElementById("btn-top");
    // const bottomBtn = document.getElementById("btn-bottom");
    if (!nav.classList.contains("toggleable")) return;
    if (open) {
        nav.classList.add("open");
        nav.classList.remove("closed");
        navBtn.classList.add("open");
        navBtn.classList.remove("closed");
        navBtn.setAttribute("title", "close navigation");
        navIcn.classList.add("open");
        navIcn.classList.remove("closed");
        // topBtn.classList.remove("hidden");
        // bottomBtn.classList.remove("hidden");
    } else {
        nav.classList.add("closed");
        nav.classList.remove("open");
        navBtn.classList.add("closed");
        navBtn.classList.remove("open");
        navBtn.setAttribute("title", "open navigation");
        navIcn.classList.add("closed");
        navIcn.classList.remove("open");
        // topBtn.classList.add("hidden");
        // bottomBtn.classList.add("hidden");
    }
}

function setHamburger(toggle) {
    const nav = document.getElementById("nav");
    const navIcn = document.getElementById("icon-nav");
    open = toggle != document.getElementById("nav").classList.contains("open");
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

    // update scroll button visibility
    updateVisibilityScrollButtons();
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

function updateVisibilityScrollButtons() {
    // const topBtn = document.getElementById("btn-top");
    // const bottomBtn = document.getElementById("btn-bottom");
    // if (window.scrollY) {
    //     topBtn.classList.remove("hidden");
    // } else {
    //     topBtn.classList.add("hidden");
    // }
    // if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
    //     bottomBtn.classList.remove("hidden");
    // } else {
    //     bottomBtn.classList.add("hidden");
    // }
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
    const colorIcn = document.getElementById("icon-color");
    if (dark) {
        root.classList.add("dark");
        root.classList.remove("light");
        colorBtn.setAttribute("title", "light color scheme");
        colorIcn.classList.add("dark");
        colorIcn.classList.remove("light");
        colorIcn.innerHTML = "◐";
    } else {
        root.classList.add("light");
        root.classList.remove("dark");
        colorBtn.setAttribute("title", "dark color scheme");
        colorIcn.classList.add("light");
        colorIcn.classList.remove("dark");
        colorIcn.innerHTML = "◑";
    }
}

function setLightbulb(toggle) {
    const root = document.documentElement;
    const colorIcn = document.getElementById("icon-color");
    dark = toggle != root.classList.contains("dark");
    if (dark) {
        colorIcn.classList.add("dark");
        colorIcn.classList.remove("light");
    } else {
        colorIcn.classList.add("light");
        colorIcn.classList.remove("dark");
    }
}
