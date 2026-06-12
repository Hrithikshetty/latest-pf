export const ANIM = {
  ease: "power3.out",
  easeIn: "power2.in",
  revealDuration: 0.42,
  revealStagger: 0.07,
  revealY: 20,
  fadeDuration: 0.5,
  scrollStart: "top 85%",
  toggleActions: "play none none reverse",
};

export const revealFrom = {
  opacity: 0,
  y: ANIM.revealY,
  duration: ANIM.revealDuration,
  stagger: ANIM.revealStagger,
  ease: ANIM.ease,
};

export function scrollRevealConfig(trigger, start = ANIM.scrollStart) {
  return {
    trigger,
    start,
    toggleActions: ANIM.toggleActions,
  };
}
