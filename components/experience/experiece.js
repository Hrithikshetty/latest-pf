"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { MENULINKS } from "../../constants"
import { ChevronRight, ExternalLink, MapPin, Clock } from "lucide-react"

// Sample data - replace with your actual experience
const EXPERIENCE_DATA = [
  {
    id: "exp1",
    company: "TechNova Solutions",
    position: "Senior Frontend Developer",
    period: "2022 - Present",
    location: "San Francisco, CA",
    type: "Remote",
    description:
      "Leading the frontend development team in creating responsive and accessible web applications using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved performance by 40%.",
    technologies: ["React", "TypeScript", "Next.js", "GSAP", "Tailwind CSS"],
    logo: "TN",
  },
  {
    id: "exp2",
    company: "Digital Dynamics",
    position: "UI/UX Engineer",
    period: "2020 - 2022",
    location: "New York, NY",
    type: "Hybrid",
    description:
      "Designed and developed user interfaces for enterprise clients. Created design systems and component libraries that improved development efficiency by 30%.",
    technologies: ["Vue.js", "Figma", "SCSS", "JavaScript", "Storybook"],
    logo: "DD",
  },
  {
    id: "exp3",
    company: "Quantum Innovations",
    position: "Frontend Developer",
    period: "2018 - 2020",
    location: "Boston, MA",
    type: "On-site",
    description:
      "Developed responsive web applications and implemented animations using GSAP. Collaborated with designers to create pixel-perfect implementations of designs.",
    technologies: ["JavaScript", "HTML5", "CSS3", "GSAP", "jQuery"],
    logo: "QI",
  },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])
  const detailsRef = useRef(null)
  const [activeExp, setActiveExp] = useState(EXPERIENCE_DATA[0].id)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Initialize refs array
    cardsRef.current = cardsRef.current.slice(0, EXPERIENCE_DATA.length)

    // Main timeline for the section
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    })

    // Title animation with text reveal and glow effect
    mainTl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          // Add subtle floating animation to title
          gsap.to(titleRef.current, {
            y: "+=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        },
      },
    )

    // Staggered card animations
    mainTl.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        x: -100,
        rotateY: -10,
        scale: 0.9,
        transformOrigin: "left center",
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    // Details section animation
    mainTl.fromTo(
      detailsRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    )

    // Create hover animations for cards
    cardsRef.current.forEach((card, index) => {
      // Skip if card is null
      if (!card) return

      // Hover effect
      card.addEventListener("mouseenter", () => {
        if (card.dataset.id !== activeExp) {
          gsap.to(card, {
            backgroundColor: "rgba(147, 51, 234, 0.1)",
            x: 10,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })

      card.addEventListener("mouseleave", () => {
        if (card.dataset.id !== activeExp) {
          gsap.to(card, {
            backgroundColor: "transparent",
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {})
          card.removeEventListener("mouseleave", () => {})
        }
      })
    }
  }, [activeExp])

  // Handle card click to change active experience
  const handleCardClick = (expId) => {
    // Don't do anything if already active
    if (expId === activeExp) return

    // Animate out current details
    gsap.to(detailsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveExp(expId)

        // Reset all cards
        cardsRef.current.forEach((card) => {
          if (!card) return

          if (card.dataset.id === expId) {
            gsap.to(card, {
              backgroundColor: "rgba(147, 51, 234, 0.15)",
              x: 15,
              duration: 0.4,
              ease: "power2.out",
            })
          } else {
            gsap.to(card, {
              backgroundColor: "transparent",
              x: 0,
              duration: 0.4,
              ease: "power2.out",
            })
          }
        })

        // Animate in new details
        gsap.fromTo(
          detailsRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        )
      },
    })
  }

  // Get active experience data
  const activeExpData = EXPERIENCE_DATA.find((exp) => exp.id === activeExp)

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[2]?.ref || "experience"}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black  opacity-80 z-0"></div>

      {/* Purple accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent transparent opacity-30"></div>
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full  opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-5 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">  
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#e0c6ff]"
        >
          PROFESSIONAL EXPERIENCE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Experience cards column */}
          <div className="lg:col-span-1 space-y-4">
            {EXPERIENCE_DATA.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => (cardsRef.current[index] = el)}
                data-id={exp.id}
                onClick={() => handleCardClick(exp.id)}
                className={`p-4 sm:p-6 rounded-lg border border-[#9333ea]/20 cursor-pointer transition-all duration-300 ${
                  activeExp === exp.id ? "bg-[#9333ea]/15" : "hover:bg-[#9333ea]/5"
                }`}
                style={{
                  backdropFilter: "blur(8px)",
                  transform: activeExp === exp.id ? "translateX(15px)" : "translateX(0px)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#9333ea]/20 text-[#9333ea] font-bold text-xl">
                    {exp.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <p className="text-sm text-gray-300">{exp.position}</p>
                    <p className="text-xs text-gray-400 mt-1">{exp.period}</p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-[#9333ea] transition-transform duration-300 ${
                      activeExp === exp.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experience details */}
          <div
            ref={detailsRef}
            className="lg:col-span-2 p-6 sm:p-8 rounded-lg border border-[#9333ea]/30 relative"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20">
              <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-[#9333ea] to-transparent"></div>
              <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-[#9333ea] to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20">
              <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-[#9333ea] to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-[#9333ea] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{activeExpData.position}</h3>
              <h4 className="text-xl text-[#9333ea] font-medium mb-4">{activeExpData.company}</h4>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-[#9333ea]" />
                  <span>{activeExpData.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-[#9333ea]" />
                  <span>{activeExpData.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <ExternalLink className="w-4 h-4 text-[#9333ea]" />
                  <span>{activeExpData.type}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Responsibilities</h5>
              <p className="text-gray-200 leading-relaxed">{activeExpData.description}</p>
            </div>

            <div>
              <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Technologies</h5>
              <div className="flex flex-wrap gap-2">
                {activeExpData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-[#9333ea]/10 text-[#9333ea] border border-[#9333ea]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
