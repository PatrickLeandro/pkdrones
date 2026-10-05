document.addEventListener("DOMContentLoaded", function () {
    // The content and navigation remain usable if the animation CDN is blocked.
    if (!window.gsap || !window.ScrollTrigger ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-copy, .hero-portrait", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        clearProps: "all"
    });

    gsap.utils.toArray(".section-heading").forEach(function (heading) {
        gsap.from(heading, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            clearProps: "all",
            scrollTrigger: { trigger: heading, start: "top 90%", once: true }
        });
    });
});
