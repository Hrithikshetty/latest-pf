"use client"

/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { MapPin, Calendar, Sparkles } from "lucide-react"

const EXPERIENCE_DATA = [
  {
    id: "bridgestone",
    company: "Bridgestone Mobility Solutions",
    position: "Associate Software Engineer",
    employmentType: "Full-time",
    period: "Jun 2025 – Present",
    duration: "1 yr",
    location: "Bengaluru, Karnataka, India",
    type: "Hybrid",
    logoSrc: "/skills/experience/bridgestone.png",
    description:
      "Building and maintaining enterprise mobility solutions across web and mobile platforms. Collaborating with cross-functional teams on scalable applications, cloud deployments, and AEM integrations.",
    technologies: [
      "Flutter",
      "Dart",
      "SCSS",
      "HTML",
      "React",
      "AWS",
      "Docker",
      "AEM",
      "Java",
      "Spring Boot",
    ],
  },
  {
    id: "winman",
    company: "Winman Software India LLP",
    position: "Software Engineer Intern",
    employmentType: "Internship",
    period: "Feb 2025 – May 2025",
    duration: "4 mos",
    location: "Mangaluru, Karnataka, India",
    type: "On-site",
    logoSrc: "/skills/experience/winman.png",
    description:
      "Contributed to software quality assurance and database operations. Performed manual testing cycles, documented defects, and supported SQL-based data validation for production workflows.",
    technologies: ["Microsoft SQL", "Manual Testing"],
  },
  {
    id: "dreamsoft",
    company: "Dreamsoft Innovations Private Limited",
    position: "Web Development Intern",
    employmentType: "Internship",
    period: "Oct 2023 – Nov 2023",
    duration: "2 mos",
    location: "Mangaluru, Karnataka, India",
    type: "On-site",
    logoSrc: "/skills/experience/dreamsoft.png",
    description:
      "Developed full-stack web features for client projects using modern JavaScript tooling. Built responsive interfaces, REST APIs, and real-time layers with MongoDB-backed persistence.",
    technologies: [
      "React",
      "Tailwind CSS",
      "WebSockets",
      "Express.js",
      "MongoDB",
      "Node.js",
    ],
  },
]

function CompanyLogo({ src, alt, size = "md", wide = false, className = "" }) {
  const sizes = {
    sm: wide ? "h-11 w-[3.25rem] p-1.5" : "h-11 w-11 p-2",
    md: wide ? "h-14 w-[4.5rem] sm:h-16 sm:w-[5.25rem] p-2" : "h-14 w-14 sm:h-16 sm:w-16 p-2.5",
    lg: wide ? "h-20 w-[5.5rem] sm:h-24 sm:w-[6.75rem] p-2.5" : "h-20 w-20 sm:h-24 sm:w-24 p-3",
  }

  return (
    <div
      className={`flex-shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${sizes[size]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={96}
        height={96}
        className="max-h-full max-w-full w-auto h-auto object-contain object-center"
        sizes="(max-width: 768px) 44px, 96px"
      />
    </div>
  )
}

const Experience = () => {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const indicatorRef = useRef(null)
  const cardsRef = useRef([])
  const detailRef = useRef(null)
  const detailContentRef = useRef(null)
  const detailLogoRef = useRef(null)
  const glowRef = useRef(null)
  const [activeId, setActiveId] = useState(EXPERIENCE_DATA[0].id)
  const activeIndex = EXPERIENCE_DATA.findIndex((e) => e.id === activeId)
  const activeExp = EXPERIENCE_DATA[activeIndex] ?? EXPERIENCE_DATA[0]
  const isAnimatingRef = useRef(false)

  const moveIndicator = useCallback((index, animate = true) => {
    const card = cardsRef.current[index]
    const rail = railRef.current
    const indicator = indicatorRef.current
    if (!card || !rail || !indicator) return

    const railRect = rail.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const y = cardRect.top - railRect.top + cardRect.height / 2

    if (animate) {
      gsap.to(indicator, {
        y,
        duration: 0.55,
        ease: "power3.inOut",
      })
    } else {
      gsap.set(indicator, { y })
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".exp-header-reveal", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 48,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        })

        gsap.from(".exp-rail-card", {
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -60,
          rotateY: -12,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          transformPerspective: 800,
        })

        gsap.from(detailRef.current, {
          scrollTrigger: {
            trigger: detailRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 80,
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
        })

        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, sectionRef)

    const t = setTimeout(() => moveIndicator(0, false), 150)

    return () => {
      ctx.revert()
      clearTimeout(t)
    }
  }, [moveIndicator])

  useLayoutEffect(() => {
    const onResize = () => {
      const i = EXPERIENCE_DATA.findIndex((e) => e.id === activeId)
      if (i >= 0) moveIndicator(i, false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeId, moveIndicator])

  const animateDetailIn = useCallback(() => {
    const content = detailContentRef.current
    const logo = detailLogoRef.current
    if (!content) return

    const blocks = content.querySelectorAll(".detail-animate")
    const tags = content.querySelectorAll(".exp-tag")

    gsap.fromTo(
      logo,
      { scale: 0.85, opacity: 0, rotate: -6 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" }
    )

    gsap.fromTo(
      blocks,
      { opacity: 0, y: 28, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      }
    )

    gsap.fromTo(
      tags,
      { opacity: 0, scale: 0.8, y: 16 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: "back.out(1.4)",
        delay: 0.25,
      }
    )
  }, [])

  const selectExperience = useCallback(
    (id, index) => {
      if (id === activeId || isAnimatingRef.current) return
      isAnimatingRef.current = true

      moveIndicator(index)

      const content = detailContentRef.current
      const detail = detailRef.current

      gsap.to(content, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          setActiveId(id)
          gsap.fromTo(
            detail,
            { boxShadow: "0 0 0 rgba(147, 51, 234, 0)" },
            {
              boxShadow: "0 24px 80px rgba(112, 0, 255, 0.18)",
              duration: 0.5,
              ease: "power2.out",
            }
          )
          requestAnimationFrame(() => {
            gsap.fromTo(
              content,
              { opacity: 0, y: -16, scale: 0.99 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => {
                  animateDetailIn()
                  isAnimatingRef.current = false
                },
              }
            )
          })
        },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.to(card, {
          x: i === index ? 8 : 0,
          duration: 0.4,
          ease: "power2.out",
        })
      })
    },
    [activeId, animateDetailIn, moveIndicator]
  )

  useLayoutEffect(() => {
    animateDetailIn()
  }, [animateDetailIn])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full relative select-none mt-24 md:mt-36 overflow-hidden"
    >
      <img
        src="/right-pattern.svg"
        alt=""
        className="absolute hidden right-0 top-1/3 w-2/12 max-w-xs lg:block opacity-30 pointer-events-none"
        loading="lazy"
        height={700}
        width={320}
      />

      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[420px] rounded-full bg-indigo-dark/20 blur-[120px] pointer-events-none opacity-0"
        aria-hidden
      />

      <div className="section-container relative z-10 py-16 md:py-28">
        <header className="exp-header-reveal mb-12 md:mb-16 max-w-3xl">
          <p className="uppercase tracking-widest text-gray-light-1 text-sm">
            Experience
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mt-2 font-medium text-gradient w-fit">
            Where I&apos;ve Worked
          </h2>
          <p className="text-gray-light-3 mt-4 text-base md:text-lg leading-relaxed">
            Roles across enterprise mobility and full-stack web — with the
            stacks I used in each.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* Left rail — company picker */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div
              ref={railRef}
              className="relative flex flex-col gap-3 md:gap-4 lg:pl-5"
            >
              <div
                ref={indicatorRef}
                className="absolute left-0 w-1 h-10 rounded-full bg-gradient-to-b from-purple to-indigo-dark -translate-y-1/2 pointer-events-none hidden lg:block shadow-[0_0_20px_rgba(139,49,255,0.8)]"
                aria-hidden
              />

              {EXPERIENCE_DATA.map((exp, index) => {
                const isActive = activeId === exp.id
                return (
                  <button
                    key={exp.id}
                    type="button"
                    ref={(el) => (cardsRef.current[index] = el)}
                    onClick={() => selectExperience(exp.id, index)}
                    onMouseEnter={() => {
                      if (!isActive) {
                        gsap.to(cardsRef.current[index], {
                          backgroundColor: "rgba(147, 51, 234, 0.08)",
                          duration: 0.25,
                        })
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isActive) {
                        gsap.to(cardsRef.current[index], {
                          backgroundColor: "rgba(255,255,255,0.02)",
                          duration: 0.25,
                        })
                      }
                    }}
                    className={`exp-rail-card exp-rail-item w-full text-left rounded-2xl border p-4 sm:p-5 flex items-center gap-4 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-purple/50 ${
                      isActive
                        ? "border-purple/50 bg-[#9333ea]/12 shadow-[inset_0_0_0_1px_rgba(139,49,255,0.15)]"
                        : "border-white/10 bg-white/[0.02] hover:border-purple/30"
                    }`}
                    style={{
                      transform: isActive ? "translateX(8px)" : undefined,
                    }}
                  >
                    <CompanyLogo
                      src={exp.logoSrc}
                      alt={`${exp.company} logo`}
                      size="sm"
                      wide={exp.id === "dreamsoft"}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white text-sm sm:text-base truncate">
                        {exp.company}
                      </p>
                      <p className="text-gray-light-3 text-xs sm:text-sm mt-0.5 line-clamp-1">
                        {exp.position}
                      </p>
                      <p className="text-gray-light-2 text-xs mt-2 font-mono">
                        {exp.period}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-purple scale-125 shadow-[0_0_12px_#8b31ff]"
                          : "bg-gray-dark-2"
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div
              ref={detailRef}
              className="relative rounded-2xl border border-purple/25 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-dark/15 blur-2xl rounded-full pointer-events-none" />

              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-purple/80 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-purple/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-px h-16 bg-gradient-to-t from-purple/60 to-transparent" />
                <div className="absolute bottom-0 left-0 h-px w-16 bg-gradient-to-r from-purple/60 to-transparent" />
              </div>

              <div
                ref={detailContentRef}
                className="relative p-6 sm:p-8 md:p-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
                  <div ref={detailLogoRef} className="detail-animate">
                    <CompanyLogo
                      src={activeExp.logoSrc}
                      alt={`${activeExp.company} logo`}
                      size="lg"
                      wide={activeExp.id === "dreamsoft"}
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="detail-animate">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                        {activeExp.position}
                      </h3>
                      <p className="text-lg sm:text-xl text-purple font-medium mt-2">
                        {activeExp.company}
                      </p>
                      <p className="text-gray-light-3 text-sm mt-1">
                        {activeExp.employmentType}
                      </p>
                    </div>

                    <div className="detail-animate flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-light-3">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple flex-shrink-0" />
                        {activeExp.period}
                        <span className="text-gray-light-2">
                          · {activeExp.duration}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple flex-shrink-0" />
                        {activeExp.location}
                        <span className="text-gray-light-2">
                          · {activeExp.type}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-animate mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-purple" />
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-light-2 font-medium">
                      Overview
                    </span>
                  </div>
                  <p className="text-gray-light-1 leading-relaxed text-base md:text-lg max-w-3xl">
                    {activeExp.description}
                  </p>
                </div>

                <div className="detail-animate mt-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-light-2 font-medium block mb-4">
                    Technologies & Tools
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {activeExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="exp-tag px-4 py-2 text-sm rounded-full bg-purple/10 text-indigo-light border border-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
