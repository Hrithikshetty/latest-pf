import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const VIBE_LINES = [
  {
    quote:
      "I turn messy ideas into apps people actually love opening — not just deploying.",
    note: "Professional on the outside. Slightly chaotic on the inside.",
  },
  {
    quote:
      "Coffee in. Commits out. Confidence quietly loading…",
    note: "The unofficial developer workflow.",
  },
  {
    quote:
      "Your project deserves more than “it works on my machine.”",
    note: "Let’s build something you’re proud to show off.",
  },
  {
    quote:
      "Still scrolling? Respect. The good stuff is right below.",
    note: "Experience → Education → Projects. Worth the trip.",
  },
];

const Hero = () => {
  const [lottie, setLottie] = useState(null);
  const [vibeIndex, setVibeIndex] = useState(0);

  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const lottieDesktopRef = useRef(null);
  const lottieAnimRef = useRef(null);
  const scrollCueRef = useRef(null);
  const quoteMainRef = useRef(null);
  const quoteNoteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.from(".hero-vibe-card", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay: 2,
          ease: "power3.out",
        });

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);
    return () => typed.destroy();
  }, [typedElementRef]);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (!lottie) return;

    if (!lottieDesktopRef.current) return;

    lottieAnimRef.current = lottie.loadAnimation({
      container: lottieDesktopRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../public/lottie/lottie.json"),
    });

    return () => lottieAnimRef.current?.destroy();
  }, [lottie]);

  useEffect(() => {
    const mm = window.matchMedia("(max-width: 767px)");
    if (!mm.matches) return;

    const cycle = setInterval(() => {
      const main = quoteMainRef.current;
      const note = quoteNoteRef.current;
      if (!main || !note) return;

      gsap.to([main, note], {
        opacity: 0,
        y: -8,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setVibeIndex((i) => (i + 1) % VIBE_LINES.length);
          gsap.fromTo(
            [main, note],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
          );
        },
      });
    }, 5500);

    return () => clearInterval(cycle);
  }, []);

  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const vibe = VIBE_LINES[vibeIndex];

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className="w-full flex md:items-center py-8 md:py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-0 md:min-h-screen relative mb-10 md:mb-24"
      style={{ opacity: 0 }}
    >
      <style global jsx>
        {`
          .typed-cursor {
            font-size: 1.25rem;
          }
          @media (min-width: 640px) {
            .typed-cursor {
              font-size: 1.5rem;
            }
          }
          @media (min-width: 768px) {
            .typed-cursor {
              font-size: 2rem;
            }
          }
        `}
      </style>

      <div className="flex flex-col w-full pt-28 sm:pt-32 md:pt-0 select-none md:max-w-none">
        <div className="flex flex-col gap-6 sm:gap-7 max-w-xl md:max-w-none">
          <h5
            className={`${styles.intro} font-mono font-medium text-indigo-light staggered-reveal`}
          >
            Hi, my name is
          </h5>

          <h1
            className={`${styles.heroName} text-white text-5xl sm:text-6xl font-semibold leading-[1.15]`}
          >
            <span className={`relative ${styles.emphasize} staggered-reveal`}>
              Hrithik
            </span>
            <span className="staggered-reveal"> shetty</span>
          </h1>

          <p className="min-h-[3.5rem] sm:min-h-[4rem] md:min-h-0">
            <span
              ref={typedElementRef}
              className="staggered-reveal block text-xl sm:text-2xl md:text-3xl text-gray-light-3 font-mono leading-relaxed"
            />
          </p>
        </div>

        <div className="staggered-reveal mt-10 sm:mt-12 max-w-xl md:max-w-none">
          <Profiles />
        </div>

        <div className={`staggered-reveal ${styles.heroActions}`}>
          <Button href={`#${MENULINKS[4].ref}`} classes="link" type="primary">
            Let&apos;s Talk
          </Button>
          <Button href={`/resume`} classes="link" type="primary">
            View Resume
          </Button>
        </div>

        {/* Mobile — personality, not tech laundry list */}
        <div className="md:hidden mt-16 sm:mt-20 max-w-xl mx-auto w-full">
          <div className={`hero-vibe-card ${styles.vibeCard}`}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-light font-medium mb-6">
              A little vibe check
            </p>
            <p
              ref={quoteMainRef}
              className="text-[1.15rem] sm:text-xl text-gray-light-1 leading-[1.65] font-medium"
            >
              &ldquo;{vibe.quote}&rdquo;
            </p>
            <p
              ref={quoteNoteRef}
              className="mt-6 text-sm text-gray-light-3 leading-relaxed border-l-2 border-purple/40 pl-4"
            >
              {vibe.note}
            </p>
          </div>

          <button
            type="button"
            ref={scrollCueRef}
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 w-full mt-12 mb-4 group outline-none focus-visible:ring-2 focus-visible:ring-purple/40 rounded-lg"
            aria-label="See my journey below"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-light-2 group-hover:text-indigo-light transition-colors">
              See my journey
            </span>
            <ChevronDown
              className="w-5 h-5 text-purple/90"
              strokeWidth={2}
            />
          </button>
        </div>

      <div
        ref={lottieDesktopRef}
        className="hidden lg:block absolute w-4/12 bottom-1.5 right-52 2xl:right-16 pointer-events-none min-h-[200px]"
        aria-hidden
      />
      </div>
    </section>
  );
};

export default Hero;
