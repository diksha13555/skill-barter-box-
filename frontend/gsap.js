window.addEventListener("load", () => {
  // ===== NAVBAR TIMELINE =====
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });

  tl.from(".nav-brand .logo", { y: -50, opacity: 0 })
    .from(".tit", { y: -50, opacity: 0 }, "-=0.5")
    .from(".nav-btn", { y: -30, opacity: 0, stagger: 0.1 }, "-=0.3")
    .from(".nav-search", { x: 60, opacity: 0 }, "-=0.2");

  // ===== SCROLL-TRIGGERED TEXT ANIMATION =====
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".hero-content").forEach(el => {
    gsap.from(el, {
      scale: 0.6,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none play", // animates again when scrolling back
        markers: false // set true if you want to debug
      },
      delay: 0.2 // optional: slight delay so it starts after navbar animation
    });
  });
});
