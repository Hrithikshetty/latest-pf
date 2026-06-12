import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import { ANIM, revealFrom } from "../../utils/animations";

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 45,
  startDelay: 500,
  backSpeed: 40,
  backDelay: 5000,
  loop: true,
};

const Hero = () => {
  const [lottie, setLottie] = useState(null);

  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const lottieDesktopRef = useRef(null);
  const lottieAnimRef = useRef(null);
  const scrollCueRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: ANIM.ease } })
        .to(sectionRef.current, { opacity: 1, duration: ANIM.fadeDuration })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          revealFrom,
          "<0.1"
        );
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
    if (!lottie || !lottieDesktopRef.current) return;

    lottieAnimRef.current = lottie.loadAnimation({
      container: lottieDesktopRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../public/lottie/lottie.json"),
    });

    return () => lottieAnimRef.current?.destroy();
  }, [lottie]);

  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className="w-full flex md:items-center py-8 md:py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-0 md:min-h-screen relative mb-10 md:mb-24"
      style={{ opacity: 0 }}
    >
      <style global jsx>
        {`
          .hero-typed-line .typed-cursor {
            display: inline;
            font-size: inherit;
            line-height: inherit;
            font-weight: inherit;
            font-family: inherit;
            color: inherit;
            vertical-align: baseline;
            margin-left: 0.05em;
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

          <p className="hero-typed-line min-h-[3.5rem] sm:min-h-[4rem] md:min-h-0 text-xl sm:text-2xl md:text-3xl text-gray-light-3 font-mono leading-relaxed">
            <span ref={typedElementRef} className="staggered-reveal inline" />
          </p>
        </div>

        <div className="staggered-reveal mt-10 sm:mt-12 max-w-xl md:max-w-none">
          <Profiles />
        </div>

        <div className={`staggered-reveal ${styles.heroActions}`}>
          <Button href={`#${MENULINKS[5].ref}`} classes="link" type="primary">
            Let&apos;s Talk
          </Button>
          <Button href={`/resume`} classes="link" type="primary">
            View Resume
          </Button>
        </div>

        <button
          type="button"
          ref={scrollCueRef}
          onClick={scrollToNext}
          className="md:hidden flex flex-col items-center gap-2 w-full mt-14 mb-4 group outline-none focus-visible:ring-2 focus-visible:ring-purple/40 rounded-lg"
          aria-label="See my journey below"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-light-2 group-hover:text-indigo-light transition-colors">
            See my journey
          </span>
          <ChevronDown className="w-5 h-5 text-purple/90" strokeWidth={2} />
        </button>

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
