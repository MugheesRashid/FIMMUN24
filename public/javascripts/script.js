gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", function () {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
        let tl = gsap.timeline();

        tl.to("h1 span", { left: "20px", opacity: 1, delay: 0.4, duration: 1.4, stagger: 0.3 })
            .to(".dot", { delay: -1, opacity: 1 })
            .to(".loader", { opacity: 0, duration: 0.5 })  
            .add(() => {
                document.querySelector(".loader").style.display = "none"; 
                sessionStorage.setItem("hasVisited", "true");  
            })
            .from("h2 span", { delay: -5,bottom: "-70px", opacity: 0, duration: 1.1, stagger: 0.3 }, "a")
            .from("nav", { opacity: 0, duration: 1 }, "a")
            .to(".IntroPage", { delay: -2,backgroundColor: "transparent", duration: 0.5 })
            .to(".blackPage", { delay: -2,backgroundColor: "rgba(0, 0, 0, 0)", duration: 0.3 });
            setTimeout(() => {
                video.play().catch(error => console.log('Video autoplay prevented: ', error));
            }, 4500);

    } else {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".blackPage").style.backgroundColor = "rgba(0,0,0,0)";
        setTimeout(() => {
            video.play().catch(error => console.log('Video autoplay prevented: ', error));
        }, 500);
    }
});
function setCursor(type) {
    const cursor = document.querySelector(".cursor");
    cursor.classList.remove("cursor1", "cursor2");
    cursor.classList.add(type);
}
//Declaration
const muteButton = document.getElementById("muteButton");
const video = document.getElementById("introVideo")
const mutePath = document.getElementById("mutePath");
const btn = document.querySelectorAll(".btn")
const committeeImg = document.querySelectorAll(".img")
const committeeText = document.querySelectorAll(".sub-comm")
const committeeDots = document.querySelectorAll(".dotted")
const newCommitteeImg = [committeeImg[0], committeeImg[1], committeeImg[2]]
const lerp = (x, y, z) => x * (1 - z) + y * z;



    //Text Cutting
    const h1 = document.querySelector("h1");
    h1.innerHTML = h1.textContent
        .split(" ")
        .map(word => `<span class="relative left-['-20px']">${word}</span>`)
        .join(" ");

    const h2 = document.querySelector("h2");
    h2.innerHTML = h2.textContent
        .split("")
        .map(char => `<span class="relative">${char}</span>`)
        .join("");

    const p1 = document.querySelector(".about p")
    p1.innerHTML = p1.textContent
        .split(" ")
        .map(word => `<span class='opacity-100'>${word}</span>`)
        .join(" ")

    //Splitting Complete

    document.querySelector(".blackPage").addEventListener("click", () => {
        setTimeout(() => {
            video.paused ? video.play() : video.pause();
        }, 300)
    });

    const setVideoSource = () => {
        video.src = window.innerWidth <= 400 ? './media/flagVertical.mp4' : './media/flagHorizontal.mp4';
        video.load();
    };

    setVideoSource();
    video.muted = true;

    muteButton.addEventListener("click", () => {
        video.muted = !video.muted;
        muteButton.classList.add("clicked");
        setTimeout(() => muteButton.classList.remove("clicked"), 500);
        mutePath.setAttribute("d", video.muted ?
            "M9 5v14l-5-5H2V10h2l5-5zm7 4v6m-2-4l4 4m0-8l-4 4" :
            "M12 3.75v16.5M6 9.75l12 4.5m0-4.5l-12 4.5"
        );
    });

    window.addEventListener('resize', setVideoSource);

    const cursor = document.querySelector(".cursor");

    window.addEventListener("mousemove", (e) => {
        cursor.style.opacity = 1;
        gsap.to(".cursor", {
            top: e.clientY - 30,
            left: e.clientX - 40
        })
    });

    window.onload = function () {
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    Shery.makeMagnet(".btn", {
        ease: "back.out",
        duration: 0.2,
    });


//   //Wasted Effort

//    menuCloseBtn.addEventListener("mousemove", function (e) {
//      var dims = menu.getBoundingClientRect()

//      var xStart = dims.x
//      var xEnd = dims.x + dims.width

//     var zero = gsap.utils.mapRange(xStart, xEnd, 0, 1, e.clientX)
//     gsap.to(".cursor", {
//      scale: 2,
//      opacity: 0.2,
//      duration: 0.2
//     })
//      gsap.to(".closeMenu", {
//          x: lerp(-50, 50, zero),
//          duration: .3
//      })
//   })
//   menuCloseBtn.addEventListener("mouseout", function (e) {
//     gsap.to(".cursor", {
//      scale: 1,
//      opacity: 1,
//      duration: 0.2
//     })
//      gsap.to(".closeMenu", {
//          x: 0,
//          duration: .3
//      })
//   })
