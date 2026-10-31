const cols = document.querySelectorAll(".grid .col");
const CLASS1 = "animate-col";
const CLASS2 = "animate-caption";

cols.forEach(function(col) {
    col.addEventListener("click", function() {
        this.classList.toggle(CLASS1);
        if (this.classList.contains(CLASS2)) {
            this.classList.remove(CLASS2);
        }
    });

    col.addEventListener("transitionstart", function() {
        this.style.zIndex = 2;
    });

    col.addEventListener("transitionend", function() {
        if (col.classList.contains(CLASS1)) {
            col.classList.add(CLASS2);
        } else {
            col.style.zIndex = "auto";
        }
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const checklist = new Checklist("form");
});

class Checklist {
    constructor(qs) {
        this.el = document.querySelector(qs);
        this.el.addEventListener("change", this.checkForSelected.bind(this));
        this.init();
    }
    init() {
        const inputs = this.el.querySelectorAll("input");
        Array.from(inputs).forEach(el => {
            el.checked = false;
        });
    }
    checkForSelected(e) {
        const tar = e.target;
        const isTop = tar.hasAttribute("data-top");

        this.updateChecks(tar.name, isTop);
    }
    updateChecks(name, isTop) {
        if (name) {
            const topCheck = this.el.querySelector(`[name="${name}"][data-top]`);
            const checkItems = this.el.querySelectorAll(`[name="${name}"]:not([data-top])`);
            const checked = Array.from(checkItems).filter(el => el.checked);
            const notAllChecked = checked.length < checkItems.length;

            if (isTop) {
                Array.from(checkItems).forEach(el => {
                    el.checked = notAllChecked;
                });
            } else {
                topCheck.checked = !notAllChecked;
                topCheck.indeterminate = checked.length > 0 && notAllChecked;
            }
        }
    }
}

const nav = document.getElementById("nav");

for (const link of nav.getElementsByTagName("a")) {
    link.onmousemove = e => {
        const rect = link.getBoundingClientRect(),
            img = link.querySelector("img");
        img.style.left = `${e.clientX - rect.left}px`;
        img.style.top = `${e.clientY - rect.top}px`;
    }
}


window.onmousemove = e => {
    const percent = e.clientY / window.innerHeight;

    nav.animate({
        transform: `translateY(${percent * nav.offsetHeight * -1}px)`
    }, {
        fill: "forwards",
        duration: 4000
    })
}