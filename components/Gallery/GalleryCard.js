/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Camera, Trophy, Heart } from "lucide-react";

const CATEGORY_ICON = {
  photos: Camera,
  achievements: Trophy,
  memories: Heart,
};

export default function GalleryCard({ item, onClick, className = "" }) {
  const [failed, setFailed] = useState(false);
  const cardRef = useRef(null);
  const Icon = CATEGORY_ICON[item.category] || Camera;

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || !onClick) return;

    const enter = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
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
      className={`gallery-card group relative w-full text-left overflow-hidden rounded-2xl border border-purple/20 bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        {!failed ? (
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple/20 via-black to-indigo-dark/30 p-6">
            <Icon className="w-8 h-8 text-purple/80" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest text-gray-light-2 text-center">
              Add image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-light block mb-1.5">
            {item.category}
          </span>
          <h3 className="text-white font-semibold text-sm sm:text-base leading-snug">
            {item.title}
          </h3>
          <p className="text-gray-light-3 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {item.caption}
          </p>
        </div>
      </div>
    </button>
  );
}
