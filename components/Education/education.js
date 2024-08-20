import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS } from "../../constants";

const Education = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Define animations for the Education section
    const revealTimeline = gsap.timeline({ defaults: { ease: "none" } });

    // Animate the section title
    revealTimeline.from(titleRef.current, {
      opacity: 0,
      x: "-100vw", // Move from full left
      duration: 1.5,
      ease: "power3.out",
    });

    // Animate the education items
    revealTimeline.from(
      sectionRef.current.querySelectorAll(".education-item"),
      { opacity: 0, y: 100, duration: 1, stagger: 0.5 },
      "<"
    );

    // Setup ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90%",
      end: "bottom",
      scrub: 1,
      animation: revealTimeline,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);


{/* <section
      ref={sectionRef}
      id={MENULINKS[4].ref}
      className="mt-30 w-full relative select-none bg-black pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
    ></section> */}



  return (
  
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className="flex flex-col justify-center p-52 relative bg-background text-foreground"
    >
      <span
        ref={titleRef}
        className="text-6xl font-bold mb-10 block text-center transform-gpu"
      >
        EDUCATION
      </span>
      <div className="bg-background text-foreground p-6 sm:p-10">
        <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-[#9333ea] grid gap-10">
          <div className="grid gap-1 text-sm relative education-item">
            <div className="aspect-square w-3 bg-[#9333ea] rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">Sahyadri College of Engineering and Mangement, Mangalore</div>
            <div className="text-muted-foreground">2021 - Present</div>
            <div className="text-muted-foreground">
              Pursuing 4th Year of My Undergraduate degree in CSE - Data Science.
            </div>
          </div>
          <div className="grid gap-1 text-sm relative education-item">
            <div className="aspect-square w-3 bg-[#9333ea] rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">Poorna-Prajna Pre-University College, Udupi</div>
            <div className="text-muted-foreground">2019 - 2021</div>
            <div className="text-muted-foreground">
              Majored in Computer Science, it is the Place Where i Started Learning Programming.
            </div>
          </div>
          <div className="grid gap-1 text-sm relative education-item">
            <div className="aspect-square w-3 bg-[#9333ea] rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">Dandathirtha Engligh Medium School</div>
            <div className="text-muted-foreground">2009 - 2019</div>
            <div className="text-muted-foreground"> 
              here, I can Just say Life was Good When i was here.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
