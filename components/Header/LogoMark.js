"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./LogoMark.module.scss";

export default function LogoMark({ href = "/", className = "" }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const letterRef = useRef(null);
  const glowRef = useRef(null);
  const scanRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const letter = letterRef.current;
    const glow = glowRef.current;
    const scan = scanRef.current;
    if (!root || !ring || !letter) return;

    const onEnter = () => {
      gsap.to(ring, { rotation: "+=180", duration: 0.55, ease: "power3.out" });
      gsap.to(letter, {
        scale: 1.12,
        duration: 0.35,
        ease: "back.out(2)",
      });
      gsap.to(glow, {
        scale: 1.35,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(letter, {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(glow, {
        scale: 1,
        opacity: 0.65,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    const ctx = gsap.context(() => {
      gsap.to(ring, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      gsap.to(glow, {
        opacity: 0.85,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        scan,
        { y: "-120%", opacity: 0.6 },
        {
          y: "120%",
          duration: 2.8,
          repeat: -1,
          ease: "none",
          repeatDelay: 1.2,
        }
      );

      gsap.from(letter, {
        scale: 0,
        rotation: -120,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.8)",
        delay: 0.05,
      });
    }, root);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <Link
      ref={rootRef}
      href={href}
      className={`link ${styles.logo} ${className}`}
      aria-label="Hrithik Shetty — Home"
    >
      <span className={styles.orbit} aria-hidden>
        <span ref={ringRef} className={styles.ring} />
        <span className={styles.ringInner} />
      </span>

      <span ref={glowRef} className={styles.glow} aria-hidden />

      <span className={styles.core}>
        <span ref={scanRef} className={styles.scan} aria-hidden />
        <span ref={letterRef} className={styles.letter}>
          <span className={styles.letterFront}>H</span>
          <span className={styles.letterGhost} aria-hidden>
            H
          </span>
        </span>
      </span>

      <span className={`${styles.spark} ${styles.spark1}`} aria-hidden />
      <span className={`${styles.spark} ${styles.spark2}`} aria-hidden />
      <span className={`${styles.spark} ${styles.spark3}`} aria-hidden />
    </Link>
  );
}
