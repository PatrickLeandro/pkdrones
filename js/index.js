   
    let i = 0;
    let message = ' ';
    
    typing();

    function typing(){

        
        if(i < message.length){
            document.getElementById('text').innerHTML += message.charAt(i);
            i++;
            setTimeout(typing, 200);

        } 
        // if (i >= 16) {
        //     document.getElementById('text').innerHTML= '  ';
        //     i = 0;

        // }  
        
        
    }
    


        document.addEventListener('DOMContentLoaded', () => {
            var timeL = gsap.timeline()

            timeL
            .from(".menu-1", {
                opacity: 0,
                duration: 1,
                x: 50,
                y: -200,
                delay: 0.3
            })
            .from(".menu-2", {
                opacity: 0,
                duration: 1,
                x: 50,
                y: -200,
            }, "-=0.8")
            .from(".menu-3", {
                opacity: 0,
                duration: 1,
                x: 50,
                y: 200,
            }, "-=0.8")
            .from(".menu-4", {
                opacity: 0,
                duration: 1,
                x: 50,
                y: 200,
            }, "-=0.8")

            .from(".container-item div", {
                opacity: 0,
                duration: 1,
                stagger: {each: 0.4},
                x: -500,
            }, "-=0.8")

            .from(".container-item img", {
                opacity: 0,
                duration: 1,
                y: 140,
            }, "-=0.8")

            gsap.registerPlugin(ScrollTrigger);

gsap.from("#section-01 div",{
    duration: 1,
    x: -300,
    opacity: 0,
    stagger: {each: 0.2},
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#section-01",

    }
});

gsap.from("#section-02 div",{
    duration: 1,
    x: -300,
    opacity: 0,
    stagger: {each: 0.2},
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#section-01",

    }
});

gsap.from("#section-03 div",{
    duration: 3,
    delay: 0.5,
    x: -300,
    opacity: 0,
    stagger: {each: 0.5},
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#section-02",

    }
});
})

        