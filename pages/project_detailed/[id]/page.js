"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { SplitText } from "gsap/dist/SplitText"
import { ArrowLeft, ExternalLink, Github, Code, Users, Calendar, CheckCircle2 } from "lucide-react"

// Mock project data - replace with your actual data fetching logic
const PROJECT_DATA = {
  "neural-nexus": {
    title: "Neural Nexus",
    subtitle: "AI-Powered Analytics Platform",
    description:
      "Neural Nexus is a comprehensive analytics platform that leverages artificial intelligence to provide actionable insights from complex datasets. The platform features real-time data processing, interactive visualizations, and predictive modeling capabilities.",
    longDescription:
      "Neural Nexus represents the cutting edge of data analytics technology, combining powerful machine learning algorithms with intuitive user interfaces to democratize access to advanced analytics. The platform was designed to handle massive datasets while maintaining performance and responsiveness across all devices.\n\nThe project required solving complex technical challenges including real-time data processing, implementing sophisticated machine learning models, and creating an intuitive interface that makes complex data accessible to non-technical users.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    techStack: ["React", "Node.js", "TensorFlow", "Python", "MongoDB", "AWS"],
    technologies: {
      Frontend: ["React", "TypeScript", "GSAP", "D3.js", "Tailwind CSS", "Redux"],
      Backend: ["Node.js", "Express", "Python", "FastAPI", "WebSockets"],
      "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "NLTK", "Pandas"],
      Database: ["MongoDB", "Redis", "PostgreSQL"],
      DevOps: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    },
    collaborators: [
      { name: "TechNova Research", role: "AI Model Development" },
      { name: "DataViz Solutions", role: "Visualization Engineering" },
      { name: "CloudScale Systems", role: "Infrastructure & DevOps" },
    ],
    timeline: "Jan 2023 - Dec 2023",
    liveUrl: "https://example.com/neural-nexus",
    repoUrl: "https://github.com/example/neural-nexus",
    keyFeatures: [
      "Real-time data processing and analysis",
      "Interactive data visualizations with drill-down capabilities",
      "Predictive modeling with multiple algorithm options",
      "Automated report generation and scheduling",
      "Custom alert system based on data thresholds",
      "Comprehensive API for third-party integrations",
    ],
  },
}

export default function ProjectDetails() {
  const router = useRouter()
  const { slug } = useParams()
  const projectSlug = Array.isArray(slug) ? slug[0] : slug

  // Get project data based on slug
  const project = PROJECT_DATA[projectSlug]

  // Refs for animations
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const imageRef = useRef(null)
  const descriptionRef = useRef(null)
  const techStackRef = useRef(null)
  const featuresRef = useRef(null)
  const collaboratorsRef = useRef(null)
  const galleryRef = useRef(null)
  const ctaRef = useRef(null)

  // State for active image in gallery
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

    // If project doesn't exist, redirect to projects page
    if (!project) {
      router.push("/projects")
      return
    }

    // Main timeline
    const mainTl = gsap.timeline()

    // Header animations with text splitting for character animation
    const titleSplit = new SplitText(".project-title", { type: "chars,words" })
    const subtitleSplit = new SplitText(".project-subtitle", { type: "chars,words" })

    mainTl
      .from(titleSplit.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .from(
        subtitleSplit.chars,
        {
          opacity: 0,
          y: 20,
          stagger: 0.01,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .from(
        ".back-button",
        {
          x: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      )
      .from(
        ".project-meta",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )

    // Hero image reveal with mask effect
    mainTl.fromTo(
      imageRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        scale: 1.1,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.3",
    )

    // Scroll-based animations

    // Description section
    gsap.from(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    })

    // Tech stack section with staggered cards
    gsap.from(".tech-card", {
      scrollTrigger: {
        trigger: techStackRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)",
    })

    // Features section with line drawing effect
    gsap.from(".feature-item", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out",
    })

    // Collaborators section
    gsap.from(".collaborator-card", {
      scrollTrigger: {
        trigger: collaboratorsRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
    })

    // Gallery section
    gsap.from(".gallery-preview", {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.out",
    })

    // CTA section
    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
    })

    // Cleanup
    return () => {
      if (titleSplit) titleSplit.revert()
      if (subtitleSplit) subtitleSplit.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [project, router, projectSlug])

  // Handle gallery navigation
  const changeImage = (index) => {
    // Don't animate if it's already the active image
    if (index === activeImage) return

    // Animate out current image
    gsap.to(".gallery-main-image", {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveImage(index)
        // Animate in new image
        gsap.fromTo(
          ".gallery-main-image",
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        )
      },
    })
  }

  // If project doesn't exist, show loading or empty state
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => router.push("/projects")}
            className="px-4 py-2 bg-[#9333ea] rounded-md hover:bg-[#7928ca] transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-[#1a0b2e] opacity-80 z-0"></div>
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9333ea] to-transparent opacity-30 z-0"></div>
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9333ea] to-transparent opacity-30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back button */}
        <button
          onClick={() => router.push("/projects")}
          className="back-button flex items-center gap-2 text-[#9333ea] hover:text-[#a855f7] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        {/* Project header */}
        <header ref={headerRef} className="mb-12 md:mb-16">
          <h1 className="project-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#e0c6ff]">
            {project.title}
          </h1>
          <h2 className="project-subtitle text-xl sm:text-2xl md:text-3xl text-[#9333ea] font-medium mb-8">
            {project.subtitle}
          </h2>

          {/* Project meta info */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="project-meta flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-[#9333ea]" />
              <span>{project.timeline}</span>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-meta flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#9333ea]" />
                <span>Live Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-meta flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-[#9333ea]" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Hero image */}
        <div
          ref={imageRef}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-16 md:mb-24 rounded-lg overflow-hidden"
        >
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Project description */}
        <section ref={descriptionRef} className="mb-16 md:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 inline-block relative">
            Project Overview
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#9333ea]"></span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-gray-200 space-y-4">
              {project.longDescription.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-1 bg-[#9333ea]/5 border border-[#9333ea]/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#9333ea]" />
                <span>Tech Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-[#9333ea]/10 text-[#9333ea] border border-[#9333ea]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key features */}
        <section ref={featuresRef} className="mb-16 md:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 inline-block relative">
            Key Features
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#9333ea]"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="feature-item flex items-start gap-3 p-4 rounded-lg border border-[#9333ea]/10 bg-[#9333ea]/5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#9333ea] mt-0.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section ref={techStackRef} className="mb-16 md:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 inline-block relative">
            Technologies
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#9333ea]"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(project.technologies).map(([category, techs], idx) => (
              <div
                key={idx}
                className="tech-card p-6 rounded-lg border border-[#9333ea]/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent backdrop-blur-sm"
              >
                <h4 className="text-lg font-semibold mb-4 text-[#9333ea]">{category}</h4>
                <ul className="space-y-2">
                  {techs.map((tech, techIdx) => (
                    <li key={techIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea]"></span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborators */}
        <section ref={collaboratorsRef} className="mb-16 md:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 inline-block relative">
            Collaborators
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#9333ea]"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.collaborators.map((collaborator, idx) => (
              <div
                key={idx}
                className="collaborator-card p-6 rounded-lg border border-[#9333ea]/20 bg-[#9333ea]/5 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#9333ea]" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{collaborator.name}</h4>
                  <p className="text-gray-400">{collaborator.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project gallery */}
        <section ref={galleryRef} className="mb-16 md:mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 inline-block relative">
            Project Gallery
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#9333ea]"></span>
          </h3>

          {/* Main gallery image */}
          <div className="gallery-preview relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
            <Image
              src={project.images[activeImage] || "/placeholder.svg"}
              alt={`${project.title} screenshot ${activeImage + 1}`}
              fill
              className="gallery-main-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {project.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => changeImage(idx)}
                className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  activeImage === idx ? "ring-2 ring-[#9333ea] scale-105" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section
          ref={ctaRef}
          className="text-center py-12 px-4 sm:px-6 rounded-lg border border-[#9333ea]/20 bg-gradient-to-br from-[#9333ea]/10 to-transparent"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Interested in this project?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out the live demo or explore the source code to see how this project was built.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#9333ea] hover:bg-[#7928ca] rounded-md transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Live Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent border border-[#9333ea] hover:bg-[#9333ea]/10 rounded-md transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
