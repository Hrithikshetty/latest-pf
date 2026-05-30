"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
      : GALLERY_ITEMS.filter((i) => i.category === filter);

  const openLightbox = useCallback((item) => {
    setLightboxFailed(false);
    setLightbox(item);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
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

      tl.from(".gallery-page-bg", { opacity: 0, duration: 1 })
        .from(
          ".gallery-page-header > *",
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.12 },
          "-=0.6"
        )
        .from(
          ".gallery-filter-btn",
          { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        )
        .from(
          ".gallery-page-item",
          { opacity: 0, y: 60, scale: 0.94, duration: 0.65, stagger: 0.08 },
          "-=0.2"
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
        duration: 0.5,
        stagger: 0.06,
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

      <header className="relative z-20 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="section-container py-6 flex items-center justify-between">
          <Link
            href="/#gallery"
            className="link flex items-center gap-2 text-sm font-mono text-gray-light-2 hover:text-indigo-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link href="/" className="link opacity-90 hover:opacity-100">
            <span className="font-mono text-sm text-gray-light-1">HS</span>
          </Link>
        </div>
      </header>

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

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
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
      </main>

      {lightbox && (
        <div
          className={`gallery-lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 ${styles.lightbox} bg-black/85`}
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
            className="gallery-lightbox-panel relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-purple/30 bg-black">
              {!lightboxFailed ? (
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain sm:object-cover"
                  sizes="100vw"
                  priority
                  onError={() => setLightboxFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple/25 to-black font-mono text-sm text-gray-light-2 px-8 text-center">
                  Add image at {lightbox.src}
                </div>
              )}
            </div>
            <div className="mt-6 text-center px-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-purple mb-2">
                {lightbox.category}
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
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
