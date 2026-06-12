"use client";

/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Images } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_META } from "../../constants";
import GalleryCard from "./GalleryCard";
import styles from "./Gallery.module.scss";

const PREVIEW_COUNT = 4;

const Gallery = () => {
  const sectionRef = useRef(null);
  const previewItems = GALLERY_ITEMS.slice(0, PREVIEW_COUNT);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-home-header > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      });

      gsap.from(".gallery-preview-item", {
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".gallery-preview-grid"),
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 32,
        scale: 0.95,
        duration: 0.48,
        stagger: 0.07,
        ease: "power3.out",
      });

      gsap.from(".gallery-cta-wrap", {
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".gallery-cta-wrap"),
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: "power2.out",
      });

      sectionRef.current
        .querySelectorAll(".gallery-preview-item")
        .forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? 8 : -8,
            duration: 2.2 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="w-full relative select-none mt-24 md:mt-32 overflow-hidden"
    >
      <img
        src="/right-pattern.svg"
        alt=""
        className="absolute hidden right-0 top-1/4 w-2/12 max-w-xs lg:block opacity-30 pointer-events-none"
        loading="lazy"
        height={700}
        width={320}
      />

      <div className="section-container py-16 md:py-28 relative z-10">
        <header className="gallery-home-header max-w-3xl mb-12 md:mb-16">
          <p className="uppercase tracking-widest text-gray-light-1 text-sm flex items-center gap-2">
            <Images className="w-4 h-4 text-purple" />
            Gallery
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 font-medium text-gradient w-fit">
            {GALLERY_META.headline}
          </h2>
          <p className="text-gray-light-3 mt-4 text-base md:text-lg leading-relaxed">
            {GALLERY_META.tagline}
          </p>
        </header>

        <div className={`gallery-preview-grid ${styles.previewGrid}`}>
          {previewItems.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-preview-item ${i === 1 ? "lg:translate-y-8" : ""} ${i === 3 ? "lg:-translate-y-4" : ""}`}
            >
              <GalleryCard item={item} />
            </div>
          ))}
        </div>

        <div className="gallery-cta-wrap flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mt-14 md:mt-20 pt-12 border-t border-white/[0.08]">
          <p className="text-gray-light-2 text-sm max-w-md leading-relaxed">
            {GALLERY_ITEMS.length}+ frames waiting in the full gallery — photos,
            trophies, and memories.
          </p>
          <Link href="/gallery" className={`${styles.enterBtn} link w-fit`}>
            Enter full gallery
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
