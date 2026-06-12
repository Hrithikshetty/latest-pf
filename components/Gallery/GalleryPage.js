"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SubPageHeader from "../Header/SubPageHeader";
import {
  GALLERY_ITEMS,
  GALLERY_META,
  GALLERY_CATEGORIES,
} from "../../constants";
import GalleryCard from "./GalleryCard";
import styles from "./Gallery.module.scss";

export default function GalleryPage() {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxFailed, setLightboxFailed] = useState(false);

  const filtered =
    filter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(
          (i) => i.category?.toLowerCase() === filter.toLowerCase()
        );

  const openLightbox = useCallback((item) => {
    setLightboxFailed(false);
    setLightbox(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const goLightbox = useCallback(
    (dir) => {
      if (!lightbox) return;
      const idx = filtered.findIndex((i) => i.id === lightbox.id);
      const next = (idx + dir + filtered.length) % filtered.length;
      setLightboxFailed(false);
      setLightbox(filtered[next]);
    },
    [lightbox, filtered]
  );

  useEffect(() => {
    document.documentElement.classList.add("use-native-cursor");
    return () => document.documentElement.classList.remove("use-native-cursor");
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gallery-page-bg", { opacity: 0, duration: 0.45 })
        .from(
          ".gallery-page-header > *",
          { opacity: 0, y: 24, duration: 0.48, stagger: 0.06 },
          "-=0.3"
        )
        .from(
          ".gallery-filter-btn",
          { opacity: 0, y: 14, duration: 0.35, stagger: 0.04 },
          "-=0.25"
        )
        .from(
          ".gallery-page-item",
          { opacity: 0, y: 36, scale: 0.96, duration: 0.45, stagger: 0.05 },
          "-=0.15"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".gallery-page-item");
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.04,
        ease: "power3.out",
      }
    );
  }, [filter]);

  useLayoutEffect(() => {
    if (!lightbox) return;

    gsap.fromTo(
      ".gallery-lightbox-backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      ".gallery-lightbox-panel",
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    const scrollY = window.scrollY;
    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";

    const preventTouchScroll = (e) => {
      const panel = document.querySelector(".gallery-lightbox-panel");
      if (panel?.contains(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });

    return () => {
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.width = "";
      bodyStyle.overflow = "";
      htmlStyle.overflow = "";
      document.removeEventListener("touchmove", preventTouchScroll);
      window.scrollTo(0, scrollY);
    };
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goLightbox(1);
      if (e.key === "ArrowLeft") goLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goLightbox]);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="gallery-page-bg fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100vw,800px)] h-[400px] bg-purple/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-dark/20 blur-[100px] rounded-full" />
      </div>

      <SubPageHeader backHref="/#gallery" backLabel="Back" />

      <main className="relative z-10 section-container py-14 md:py-20 pb-24">
        <div className="gallery-page-header text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium text-gradient">
            {GALLERY_META.title}
          </h1>
          <p className="mt-5 text-gray-light-3 text-base md:text-lg leading-relaxed">
            {GALLERY_META.pageDescription}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 md:mb-16">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`gallery-filter-btn px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/15 text-gray-light-2 transition-all duration-300 ${styles.filterPill} ${
                filter === cat.id ? styles.active : "hover:border-purple/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className={styles.galleryGrid}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-page-item ${i % 5 === 2 ? "md:row-span-1" : ""}`}
            >
              <GalleryCard item={item} onClick={openLightbox} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-light-3 py-20 font-mono text-sm">
            No items in this category yet.
          </p>
        )}

        {filtered.length > 0 && (
          <p className={styles.lazyFooter}>{GALLERY_META.lazyFooter}</p>
        )}
      </main>

      {lightbox && (
        <div
          className={`gallery-lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-hidden ${styles.lightbox} bg-black/85`}
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[60] p-2 rounded-full border border-white/20 text-white hover:border-purple/50 transition-colors link"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goLightbox(-1);
            }}
            className="absolute left-4 sm:left-8 z-[60] p-3 rounded-full border border-white/15 hover:border-purple/40 link hidden sm:block"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goLightbox(1);
            }}
            className="absolute right-4 sm:right-8 z-[60] p-3 rounded-full border border-white/15 hover:border-purple/40 link hidden sm:block"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className={`gallery-lightbox-panel relative max-w-4xl w-full max-h-[92vh] flex flex-col ${styles.lightboxPanel}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxImageWrap}>
              {!lightboxFailed ? (
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  width={1600}
                  height={1200}
                  className={styles.lightboxImage}
                  sizes="100vw"
                  priority
                  onError={() => setLightboxFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-gray-light-2 px-8 text-center">
                  Could not load {lightbox.src}
                </div>
              )}
            </div>
            <div className="mt-6 text-center px-4">
              <span className={styles.lightboxCategory}>
                {lightbox.category
                  ? lightbox.category.charAt(0).toUpperCase() +
                    lightbox.category.slice(1).toLowerCase()
                  : "Gallery"}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mt-3">
                {lightbox.title}
              </h2>
              <p className="mt-2 text-gray-light-3 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                {lightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
