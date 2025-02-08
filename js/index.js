document.addEventListener("DOMContentLoaded", function () {
    // POPUP
    const popup = document.getElementById("popup-container");
    const closeBtn = document.getElementById("close-popup");

    if (popup && closeBtn) { // Verifica se os elementos existem
        if (!sessionStorage.getItem("popupShown")) {
            popup.style.display = "flex"; 
            //sessionStorage.setItem("popupShown", "true");
        }

        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });

        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }

    // ANIMAÇÕES COM GSAP
    gsap.registerPlugin(ScrollTrigger);
    var timeL = gsap.timeline();

    timeL
        .from(".menu-1, .menu-2, .menu-3, .menu-4", {
            opacity: 0,
            duration: 0.8,
            x: 50,
            y: -200,
            stagger: 0.2,
        })
        .from(".container-item div", {
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            x: -300,
        }, "-=0.5")
        .from(".container-item img", {
            opacity: 0,
            duration: 1,
            y: 100,
        }, "-=0.5");

    gsap.from("#section-01 div", {
        duration: 1,
        x: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#section-01",
            start: "top 80%",
        }
    });

    gsap.from("#section-02 div", {
        duration: 1,
        x: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#section-02",
            start: "top 80%",
        }
    });

    gsap.from("#section-03 div", {
        duration: 1.5,
        delay: 0.2,
        x: -200,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#section-03",
            start: "top 80%",
        }
    });
});
