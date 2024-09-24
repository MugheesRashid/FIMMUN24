
    gsap.from("h4", {
        scrollTrigger: {
            trigger: "h4",
            start: "350% bottom",
            end: "350% bottom",
            scroller: ".smooth-scroll",  // Use the scroller proxy set up by Locomotive
            scrub: 2
        },
        opacity: 0
    })

    gsap.from(".about p span", {
        scrollTrigger: {
            trigger: ".page2",
            start: "65% bottom",
            end: "95% bottom",
            scroller: ".smooth-scroll",  // Use the scroller proxy set up by Locomotive
            scrub: 2
        },
        opacity: 0.1,
        duration: 5,
        stagger: 0.3
    })
      
ScrollTrigger.matchMedia({
"(min-width: 800px)": function() {
gsap.to(".sub-comm", {
scrollTrigger: {
   trigger: ".sub-comm",
   start: "top top",
   end: "400% bottom",
   pin: ".frame",
   scroller: ".smooth-scroll", 
   endTrigger: ".lasttext",
   scrub: true,
},
y: "-300%",
});
let sections = document.querySelectorAll(".sub-comm");
Shery.imageEffect(".image", {
style: 5,
slideStyle: (setScroll) => {
sections.forEach(function (section, index) {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    scroller: ".smooth-scroll",
    scrub: 1,
    onUpdate: function (prog) {
      setScroll(prog.progress + index);
    },
  });
});
},
});
const committeeLines = document.querySelectorAll(".line")

committeeLines.forEach((elem, idx) => {
 if (idx === 0) {
     gsap.from(elem, {
         scrollTrigger: {
             trigger: committeeText[idx],
             start: "top top",
             end: "75% center",
             scroller: ".smooth-scroll",
             scrub: 1,
         },
         height: 0
     })
 }
 else {
     gsap.from(elem, {
         scrollTrigger: {
             trigger: committeeText[idx],
             start: "-15% center",
             end: "80% bottom",
             scroller: ".smooth-scroll",
             scrub: 1,
         },
         height: 0
     })

 }

})
committeeDots.forEach((elem, idx) => {
 if (idx === 0 || idx === 3) {
     gsap.from(elem, {
         scrollTrigger: {
             trigger: committeeText[idx],
             start: "top center",
             end: "top center",
             scroller: ".smooth-scroll",
             scrub: 1
         },
         boxShadow: "none"
     })
 } else {
     gsap.from(elem, {
         scrollTrigger: {
             trigger: committeeText[idx],
             start: "-20% center",
             end: "-20% center",
             scroller: ".smooth-scroll",
             scrub: 1
         },
         boxShadow: "none"
     })
 }
})
gsap.to(".partners", {
scrollTrigger: {
    trigger: ".partners",
    scroller: ".smooth-scroll",
    start: "top top",
    end: "400% bottom",
    pin: ".partners",
    scrub: 1
},
x: "-100%",
})

menu.addEventListener('mouseover', ()=>{
gsap.to(".menu span", {
    y: '0%',
    duration: 0.2
 })
})
menu.addEventListener('mouseout', ()=>{
gsap.to(".menu span", {
    y: '-100%',
    duration: 0.2
 })
})

btn.forEach((elem) => {
elem.addEventListener("mouseout", () => {
    gsap.to(elem.querySelectorAll('span'), {
        y: '-9vh',
        duration: 0.3,
    });
});

elem.addEventListener("mouseover", () => {
    gsap.to(elem.querySelectorAll('span'), {
        y: 0,
        duration: 0.3,
    });
});
});

}
})

//Wasted Effort 
//  newCommitteeImg.forEach((elem, idx) => {
//     //  elem.addEventListener("mousemove", function (e) {
//     //      var dims = elem.getBoundingClientRect()

//     //      var xStart = dims.x
//     //      var xEnd = dims.x + dims.width

//     //      var zero = gsap.utils.mapRange(xStart, xEnd, 0, 1, e.clientX)
//     //      gsap.to(elem, {
//     //          x: lerp(-50, 50, zero),
//     //          duration: .3
//     //      })
//     //      gsap.to(".cursor", {
//     //          scale: 2
//     //      })
//     //  })
//     //  elem.addEventListener("mouseleave", function () {
//     //      gsap.to(elem, {
//     //          x: 0,
//     //          duration: .3
//     //      })
//     //      gsap.to(".cursor", {
//     //          scale: 1
//     //      })
//     //  })

//      if (idx === 1) {
//          gsap.to(elem, {
//              scrollTrigger: {
//                  trigger: committeeText[idx],
//                  start: "-33% top",
//                  end: "80% center",
//                  scroller: ".smooth-scroll",
//                  scrub: 1,
//              },
//              y: "-100%",
//          })
//      } else {
//          gsap.to(elem, {
//              scrollTrigger: {
//                  trigger: committeeText[idx],
//                  start: "top top",
//                  end: "bottom center",
//                  scroller: ".smooth-scroll",
//                  scrub: 1,
//              },
//              y: "-100%",
//              ease: "power1",
//          })

//      }
//      gsap.from(elem, {
//          scrollTrigger: {
//              trigger: committeeText[idx - 1],
//              start: "top top",
//              end: "bottom center",
//              scroller: ".smooth-scroll",
//              scrub: 1,
//          },
//          scale: 1.4
//      })

//  })
//  committeeImg[3].addEventListener("mousemove", function (e) {
//      var dims = committeeImg[3].getBoundingClientRect()

//      var xStart = dims.x
//      var xEnd = dims.x + dims.width

//      var zero = gsap.utils.mapRange(xStart, xEnd, 0, 1, e.clientX)
//      gsap.to(committeeImg[3], {
//          x: lerp(-50, 50, zero),
//          duration: .3
//      })
//      gsap.to(".cursor", {
//          scale: 2
//      })

//  })
//  committeeImg[3].addEventListener("mouseleave", function () {
//      gsap.to(committeeImg[3], {
//          x: 0,
//          duration: .3
//      })
//      gsap.to(".cursor", {
//          scale: 1
//      })
//  })