let p = document.querySelector('.aboutUs p')
let h1 = document.querySelector('h1')
let h2 = document.querySelector('h2')
let h4 = document.querySelector('h4')
let h5 = document.querySelector('h5')


p.innerHTML = p.textContent
.split("")
.map(word => `<span class="relative left-['-20px']">${word}</span>`)
.join("");
h2.innerHTML = h2.textContent
.split(" ")
.map(word => `<span class="relative left-['-20px']">${word}</span>`)
.join(" ");
h4.innerHTML = h4.textContent
.split(" ")
.map(word => `<span class="relative left-['-20px']">${word}</span>`)
.join(" ");
h5.innerHTML = h5.textContent
.split(" ")
.map(word => `<span class="relative left-['-20px']">${word}</span>`)
.join(" ");
window.addEventListener("load", function () {
  let tl = gsap.timeline()

gsap.matchMedia().add("(max-width: 450px)", () => {
    gsap.to('.transformingText span', {
      scrollTrigger: {
        trigger: ".Success",
        scroller: '.smooth-scroll',
        start: "top top",  
        end: "200% bottom",  
        pin: ".Success",  
        scrub: 1,
        pinSpacing: false 
      },
      y: "-18vh"
    });
  });
tl.from('p span' ,{
    delay: 1.5,
    opacity: 0,
    left: '-5px',
    duration: 0.1,
    stagger: 0.001
})
gsap.from('h2 span', {
    scrollTrigger:{
        trigger: "h2 span",
        scroller: '.smooth-scroll',
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
    },
    opacity: 0
})
gsap.from('.schoolImg', {
  scrollTrigger:{
      trigger: ".schoolImg",
      scroller: '.smooth-scroll',
      start: "-80% bottom",
      end: "top bottom",
      scrub: 1,
  },
  opacity: 0,
  scale: 0.5
})
gsap.from('h4 span', {
    scrollTrigger:{
        trigger: "h4 span",
        scroller: '.smooth-scroll',
        start: "-400% bottom",
        end: "-180% center",
        scrub: 1,
    },
    bottom: "-60px",
    opacity: 0
})
gsap.from('h5 span', {
    scrollTrigger:{
        trigger: "h5 span",
        scroller: '.smooth-scroll',
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
    },
    opacity: 0
})

gsap.matchMedia().add("(min-width: 451px)", () => {
    gsap.to('.transformingText span', {
      scrollTrigger: {
        trigger: ".Success",
        scroller: '.smooth-scroll',
        start: "top top",  // Same as above
        end: "200% bottom",
        pin: ".Success",
        scrub: 1,
      },
      y: "-60vh"
    });
  });
gsap.to('.imgs', {
    scrollTrigger:{
        trigger: ".Success",
        scroller: '.smooth-scroll',
        start: "-20% top",
        end: "200% bottom",
        scrub: 1,
    },
     y: "-100%"
})
})

