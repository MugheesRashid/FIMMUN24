
const menu = document.querySelector(".menu")
const menuCloseBtn = document.querySelector(".closeBtn")

Shery.mouseFollower();
menuCloseBtn.addEventListener("click", function () {
    gsap.to(".fullMenu", {
        display: "none",
    })
})
Shery.makeMagnet(".navLink", {
    ease: "back.out",
    duration: 0.2,
});
Shery.makeMagnet(".menu", {
    ease: "back.out",
    duration: 0.2,
});
Shery.makeMagnet(".logo", {
    ease: "back.out",
    duration: 0.2,
});
Shery.makeMagnet(".closeMenu", {
    ease: "back.out",
    duration: 0.2,
});
Shery.makeMagnet(".btn", {
    ease: "back.out",
    duration: 0.2,
});
Shery.makeMagnet(".btn2", {
    ease: "back.out",
    duration: 0.2,
});
menu.addEventListener("click", function () {
    gsap.to(".fullMenu", {
        display: "block",
    })
})
function disableScroll() {
    locoScroll.stop();
    ScrollTrigger.disable();
    document.body.style.overflow = 'hidden';
  }
  
  function enableScroll() {
    locoScroll.start();
    ScrollTrigger.enable();
    document.body.style.overflow = 'auto';
  }
  
document.querySelector(".menu").addEventListener("click", disableScroll);
document.querySelector(".closeBtn").addEventListener("click", enableScroll);