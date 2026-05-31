/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Camera, Trophy, Heart } from "lucide-react";
import styles from "./Gallery.module.scss";

const CATEGORY_ICON = {
  photos: Camera,
  achievements: Trophy,
  memories: Heart,
};

function formatCategory(category) {
  if (!category) return "Gallery";
  const key = category.toLowerCase();
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export default function GalleryCard({ item, onClick, className = "" }) {
  const [failed, setFailed] = useState(false);
  const cardRef = useRef(null);
  const categoryKey = item.category?.toLowerCase();
  const Icon = CATEGORY_ICON[categoryKey] || Camera;
  const categoryLabel = formatCategory(item.category);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || !onClick) return;

    const enter = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6,
        rotateX: -y * 6,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };

    const leave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", enter);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, [onClick]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onClick?.(item)}
      className={`gallery-card group relative w-full text-left overflow-hidden rounded-2xl border border-purple/20 bg-[#0e0c12] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={styles.imageFrame}>
        {!failed ? (
          <Image
            src={item.src}
            alt={item.title}
            fill
            className={`${styles.galleryImageCover} transition-transform duration-700 ease-out group-hover:scale-110`}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 z-[1]">
            <Icon className="w-8 h-8 text-purple/80" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest text-gray-light-2 text-center">
              Image unavailable
            </span>
          </div>
        )}

        <span className={styles.categoryBadge}>
          <Icon className="w-3 h-3 shrink-0" strokeWidth={2.5} />
          {categoryLabel}
        </span>

        <div className={styles.cardOverlay} aria-hidden />
        <div className={styles.cardCaption}>
          <h3 className="text-white font-semibold text-sm sm:text-base leading-snug drop-shadow-md">
            {item.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
