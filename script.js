/*
Natalie Clarius - Personal Website
(C) 2022 Natalie Clarius <natalie_clarius@yahoo.de>
*/

/*
=============================================
toggle nav overlay
=============================================
*/


document.addEventListener("DOMContentLoaded", update_nav_toggleability);
window.addEventListener("load", update_nav_toggleability);
window.addEventListener("resize", update_nav_toggleability);

function update_nav_toggleability() {
    const nav = document.getElementById("nav");
    if (window.matchMedia("(min-width: 801px)").matches) {
        nav.classList.remove("toggleable");
        nav.classList.remove("open");
        nav.classList.remove("closed");
    } else if (window.matchMedia("(max-width: 800px)").matches) {
        nav.classList.add("toggleable");
        if (!nav.classList.contains("open")) {
            close_nav();
        }
    }
}

function toggle_nav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    if (!nav.classList.contains("open")) {
        open_nav();
    } else if (!nav.classList.contains("closed")) {
        close_nav();
    }
}

function open_nav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    nav.classList.add("open");
    nav.classList.remove("closed");

    const nav_btn = document.getElementById("btn-nav");
    nav_btn.classList.add("open");
    nav_btn.classList.remove("closed");
    nav_btn.setAttribute("title", "close navigation");
    nav_btn.innerHTML = "&rang;";
}

function close_nav() {
    const nav = document.getElementById("nav");
    if (!nav.classList.contains("toggleable")) {
        return;
    }
    nav.classList.add("closed");
    nav.classList.remove("open");

    const nav_btn = document.getElementById("btn-nav");
    nav_btn.classList.add("closed");
    nav_btn.classList.remove("open");
    nav_btn.setAttribute("title", "open navigation");
    nav_btn.innerHTML = "&lang;";

}

/*
=============================================
highlight currently active section in navbar
and shadow header on scrolledness
=============================================
*/

document.addEventListener("DOMContentLoaded", update_scroll);
window.addEventListener("load", update_scroll);
window.addEventListener("scroll", update_scroll);
window.addEventListener("resize", update_scroll);

function update_scroll() {
    // shadow header on scrolledness
    indicate_scrolledness_header();

    // highlight each section on activeness
    document.querySelectorAll("section").forEach(section => {
        indicate_visibility_section(section);
    });
}

function indicate_scrolledness_header() {
    const header = document.getElementById("header");
    if (window.scrollY) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function indicate_visibility_section(section) {
    const id = section.getAttribute("id");
    const geo = section.getBoundingClientRect();
    if (geo.top < document.documentElement.clientHeight &&
        geo.bottom > document.getElementById("header").offsetHeight) {
        document.querySelector(`nav ul li a[href="#${id}"]`).parentElement.
        classList.add("active");
    } else {
        document.querySelector(`nav ul li a[href="#${id}"]`).parentElement.
        classList.remove("active");
    }
}

/*
=============================================
toggle light/dark mode
=============================================
*/

document.addEventListener("DOMContentLoaded", initialize_color);

function initialize_color() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        color_dark();
    } else {
        color_light();
    }
}

function toggle_color() {
    if (!document.documentElement.classList.contains("dark")) {
        color_dark();
    } else {
        color_light();
    }
}

function color_dark() {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");

    const color_btn = document.getElementById("btn-color");
    color_btn.setAttribute("title", "light color scheme");
}

function color_light() {
    const root = document.documentElement;
    root.classList.add("light");
    root.classList.remove("dark");

    const color_btn = document.getElementById("btn-color");
    color_btn.setAttribute("title", "dark color scheme");
}
