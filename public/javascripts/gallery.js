gsap.registerPlugin(ScrollTrigger);  // Register ScrollTrigger plugin
         
 ScrollTrigger.matchMedia({
   "(min-width: 800px)": function() {
      let tl = gsap.timeline({
         scrollTrigger:{
         trigger:".gallery-container",
         start:"50% 50%",
         end:"170% 50%",
         scrub:2,
         pin:true,
         scroller: ".smooth-scroll"
         }
     });
     tl
     .to(".first",{
         top: "-50%",
      },'a')
      .to(".last",{
         top: "110vh",
      },'a')
      .to(".first h1",{
         top: "60%"
      },'a')
      .to(".last h1",{
         top: "-90%"
      },'a')
   }})
   ScrollTrigger.matchMedia({
      "(max-width: 480px)": function() {
         let tl = gsap.timeline({
            scrollTrigger:{
            trigger:".gallery-container",
            start:"50% 50%",
            end:"170% 50%",
            scrub:2,
            pin:true,
            scroller: ".smooth-scroll"
            }
        });
        tl
        .to(".first",{
            top: "-50%",
         },'a')
         .to(".last",{
            top: "110vh",
         },'a')
      }})