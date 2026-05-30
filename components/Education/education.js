"use client"

/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { MENULINKS } from "../../constants"
import {
  GraduationCap,
  School,
  BookOpen,
  MapPin,
  Sparkles,
} from "lucide-react"

const JOURNEY_STAGES = [
  {
    id: "college",
    chapter: "III",
    label: "University",
    icon: GraduationCap,
    institution: "Sahyadri College of Engineering and Management",
    location: "Mangalore, Karnataka",
    period: "2021 – Present",
    highlight: "Undergraduate · CSE Data Science",
    description:
      "Pursuing my 4th year undergraduate degree — deepening expertise in data science, software engineering, and building real-world projects alongside coursework.",
    tags: ["B.E.", "Data Science", "Engineering"],
  },
  {
    id: "puc",
    chapter: "II",
    label: "Pre-University",
    icon: BookOpen,
    institution: "Poorna-Prajna Pre-University College",
    location: "Udupi, Karnataka",
    period: "2019 – 2021",
    highlight: "Computer Science Major",
    description:
      "The chapter where programming clicked. Majored in Computer Science and discovered the craft that shaped everything that followed.",
    tags: ["PUC", "Computer Science", "Foundations"],
  },
  {
    id: "school",
    chapter: "I",
    label: "School",
    icon: School,
    institution: "Dandathirtha English Medium School",
    location: "Karnataka",
    period: "2009 – 2019",
    highlight: "Primary & Secondary Education",
    description:
      "A decade of curiosity, friendships, and fundamentals — where life was simple, good, and the learning journey quietly began.",
    tags: ["Schooling", "Foundations", "Memories"],
  },
]

const Education = () => {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const pathGlowRef = useRef(null)
  const milestonesRef = useRef([])
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".edu-header > *", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
        })

        gsap.from(progressRef.current, {
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          scaleX: 0,
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left center",
        })

        gsap.fromTo(
          pathRef.current,
          { scaleY: 0, opacity: 0.4 },
          {
            scrollTrigger: {
              trigger: sectionRef.current.querySelector(".edu-journey"),
              start: "top 70%",
              end: "bottom 35%",
              scrub: 0.8,
            },
            scaleY: 1,
            opacity: 1,
            ease: "none",
            transformOrigin: "top center",
          }
        )

        gsap.fromTo(
          pathGlowRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current.querySelector(".edu-journey"),
              start: "top 70%",
              end: "bottom 35%",
              scrub: 0.8,
            },
            scaleY: 1,
            opacity: 0.7,
            ease: "none",
            transformOrigin: "top center",
          }
        )

        milestonesRef.current.filter(Boolean).forEach((node, index) => {
          const card = node.querySelector(".edu-card")
          const badge = node.querySelector(".edu-badge")
          const icon = node.querySelector(".edu-icon-wrap")
          const tags = node.querySelectorAll(".edu-tag")

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          })

          tl.from(badge, {
            scale: 0,
            rotation: -180,
            duration: 0.55,
            ease: "back.out(2)",
          })
            .from(
              icon,
              { scale: 0, opacity: 0, duration: 0.45, ease: "back.out(1.8)" },
              "-=0.25"
            )
            .from(
              card,
              {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                y: 30,
                rotateY: index % 2 === 0 ? 8 : -8,
                duration: 0.75,
                ease: "power3.out",
                transformPerspective: 900,
              },
              "-=0.2"
            )
            .from(
              tags,
              {
                opacity: 0,
                y: 12,
                scale: 0.85,
                stagger: 0.06,
                duration: 0.4,
                ease: "power2.out",
              },
              "-=0.35"
            )

          const yearEl = node.querySelector(".edu-year")
          if (yearEl) {
            ScrollTrigger.create({
              trigger: node,
              start: "top 75%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  yearEl,
                  { opacity: 0.3, scale: 0.9 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                  }
                )
              },
            })
          }

          node.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              boxShadow: "0 24px 48px rgba(112, 0, 255, 0.15)",
              borderColor: "rgba(139, 49, 255, 0.45)",
              duration: 0.35,
              ease: "power2.out",
            })
            gsap.to(icon, { scale: 1.08, duration: 0.35, ease: "back.out(1.5)" })
          })

          node.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 0 0 rgba(112, 0, 255, 0)",
              borderColor: "rgba(139, 49, 255, 0.2)",
              duration: 0.35,
              ease: "power2.out",
            })
            gsap.to(icon, { scale: 1, duration: 0.35, ease: "power2.out" })
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className="w-full relative select-none mt-24 md:mt-32 overflow-hidden"
    >
      <img
        src="/left-pattern.svg"
        alt=""
        className="absolute hidden left-0 top-1/3 w-2/12 max-w-xs md:block opacity-25 pointer-events-none"
        loading="lazy"
        height={700}
        width={320}
      />

      <div className="section-container relative z-10 py-16 md:py-28">
        <header className="edu-header mb-10 md:mb-14 max-w-3xl">
          <p className="uppercase tracking-widest text-gray-light-1 text-sm">
            Education
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 font-medium text-gradient w-fit">
            Academic Journey
          </h2>
          <p className="text-gray-light-3 mt-4 text-base md:text-lg leading-relaxed">
            From school hallways to engineering labs — three chapters that shaped
            who I am as a developer.
          </p>
        </header>

        {/* Horizontal progress — desktop journey map */}
        <div
          ref={progressRef}
          className="hidden md:flex items-center justify-between mb-16 px-2"
        >
          {JOURNEY_STAGES.slice()
            .reverse()
            .map((stage, i, arr) => (
              <div
                key={stage.id}
                className="flex flex-col items-center flex-1 relative"
              >
                {i < arr.length - 1 && (
                  <div
                    className="absolute top-4 left-[50%] w-full h-px bg-gradient-to-r from-purple/60 to-indigo-dark/40"
                    aria-hidden
                  />
                )}
                <div className="relative z-10 w-8 h-8 rounded-full bg-purple/20 border border-purple/50 flex items-center justify-center text-xs font-mono text-indigo-light">
                  {stage.chapter}
                </div>
                <span className="text-xs text-gray-light-2 mt-2 font-mono">
                  {stage.period.split("–")[0].trim()}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-light-3 mt-0.5">
                  {stage.label}
                </span>
              </div>
            ))}
        </div>

        <div className="edu-journey relative max-w-4xl mx-auto lg:max-w-5xl">
          {/* Animated vertical path */}
          <div
            className="absolute left-[19px] md:left-7 top-0 bottom-0 w-px hidden sm:block"
            aria-hidden
          >
            <div
              ref={pathRef}
              className="absolute inset-0 w-px bg-gradient-to-b from-purple via-indigo-dark to-purple/20 origin-top"
            />
            <div
              ref={pathGlowRef}
              className="absolute inset-0 w-[3px] -left-px bg-purple/30 blur-sm origin-top"
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            {JOURNEY_STAGES.map((stage, index) => {
              const Icon = stage.icon
              return (
                <article
                  key={stage.id}
                  ref={(el) => (milestonesRef.current[index] = el)}
                  className="relative grid grid-cols-1 sm:grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-5 md:gap-8 items-start"
                >
                  {/* Timeline node */}
                  <div className="hidden sm:flex flex-col items-center pt-2 md:pt-4">
                    <div className="edu-badge relative z-10 flex flex-col items-center">
                      <div className="edu-icon-wrap w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple/15 border border-purple/40 flex items-center justify-center shadow-[0_0_24px_rgba(139,49,255,0.25)]">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-purple" />
                      </div>
                      <span className="edu-year mt-3 text-[10px] md:text-xs font-mono text-indigo-light tracking-wider">
                        Ch. {stage.chapter}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="edu-card rounded-2xl border border-purple/20 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm p-5 sm:p-6 md:p-8 relative overflow-hidden"
                    style={{ willChange: "transform" }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Mobile icon row */}
                    <div className="sm:hidden flex items-center gap-3 mb-4">
                      <div className="edu-icon-wrap w-11 h-11 rounded-xl bg-purple/15 border border-purple/35 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-purple font-medium">
                          Chapter {stage.chapter} · {stage.label}
                        </span>
                        <p className="text-xs font-mono text-gray-light-2 mt-0.5">
                          {stage.period}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-purple" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-light-2 font-medium">
                        Chapter {stage.chapter} · {stage.label}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-snug pr-2">
                      {stage.institution}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-light-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-indigo-light">
                        <span className="hidden sm:inline edu-year">
                          {stage.period}
                        </span>
                        <span className="sm:hidden">{stage.period}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-purple flex-shrink-0" />
                        {stage.location}
                      </span>
                    </div>

                    <p className="text-purple font-medium mt-3 text-sm md:text-base">
                      {stage.highlight}
                    </p>

                    <p className="text-gray-light-1 mt-4 leading-relaxed text-sm md:text-base max-w-2xl">
                      {stage.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="edu-tag px-3 py-1.5 text-xs rounded-full bg-purple/10 text-indigo-light border border-purple/25"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Journey footnote */}
          <p className="edu-header text-center text-gray-light-2 text-sm mt-14 md:mt-20 font-mono">
            2009 → Present · Building upward, one chapter at a time
          </p>
        </div>
      </div>
    </section>
  )
}

export default Education
