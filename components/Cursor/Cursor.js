import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ isDesktop }) => {
  const cursor = useRef(null);
  const follower = useRef(null);
  const isHoveringLink = useRef(false);

  useEffect(() => {
    if (!isDesktop || document.body.clientWidth <= 767) return;

    const dot = cursor.current;
    const ring = follower.current;
    if (!dot || !ring) return;

    dot.classList.remove("hidden");
    ring.classList.remove("hidden");

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

    const moveCircle = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const hover = () => {
      if (isHoveringLink.current) return;
      isHoveringLink.current = true;
      gsap.to(dot, { scale: 0.45, duration: 0.25, ease: "power2.out" });
      gsap.to(ring, { scale: 2.8, duration: 0.35, ease: "power2.out" });
    };

    const unHover = () => {
      isHoveringLink.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power2.out" });
    };

    const onMouseMove = (e) => moveCircle(e);

    const onMouseOver = (e) => {
      if (e.target?.closest?.(".link")) hover();
    };

    const onMouseOut = (e) => {
      const link = e.target?.closest?.(".link");
      if (link && !link.contains(e.relatedTarget)) unHover();
    };

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      dot.classList.add("hidden");
      ring.classList.add("hidden");
    };
  }, [isDesktop]);

  return (
    <>
      <div
        ref={cursor}
        className="bg-white rounded-full mix-blend-difference fixed left-0 top-0 w-3 h-3 select-none pointer-events-none z-[100] hidden will-change-transform"
      />
      <div
        ref={follower}
        className="bg-white/[0.04] border border-white/25 rounded-full fixed left-0 top-0 w-9 h-9 select-none pointer-events-none z-[99] hidden will-change-transform"
      />
    </>
  );
};

export default Cursor;
