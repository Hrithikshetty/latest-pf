"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";
import styles from "./Resume.module.scss";

const RESUME_URL = "/resume.pdf";
const RESUME_FILENAME = "Hrithik_Shetty_Resume.pdf";
const LOAD_TIMEOUT_MS = 1800;

export default function ResumePage() {
  const pageRef = useRef(null);
  const viewerRef = useRef(null);
  const loaderFillRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [pdfMissing, setPdfMissing] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("use-native-cursor");
    return () => document.documentElement.classList.remove("use-native-cursor");
  }, []);

  const finishLoading = useCallback(() => {
    setLoading((prev) => (prev ? false : prev));
    if (loaderFillRef.current) {
      gsap.to(loaderFillRef.current, { width: "100%", duration: 0.35 });
    }
  }, []);

  useEffect(() => {
    if (loaderFillRef.current) {
      gsap.to(loaderFillRef.current, {
        width: "70%",
        duration: LOAD_TIMEOUT_MS / 1000,
        ease: "power1.inOut",
      });
    }

    const timeout = setTimeout(finishLoading, LOAD_TIMEOUT_MS);

    fetch(RESUME_URL, { method: "HEAD" })
      .then((res) => {
        if (res.status === 404) setPdfMissing(true);
      })
      .catch(() => {});

    return () => clearTimeout(timeout);
  }, [finishLoading]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".resume-orb", {
        x: "+=24",
        y: "+=18",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".resume-orb", { opacity: 0, scale: 0.6, duration: 1.2 })
        .from(
          ".resume-toolbar-item",
          { opacity: 0, y: -14, duration: 0.5, stagger: 0.05 },
          "-=0.8"
        )
        .from(
          ".resume-hero-block > *",
          { opacity: 0, y: 24, duration: 0.65, stagger: 0.08 },
          "-=0.35"
        )
        .from(
          ".resume-stat",
          { opacity: 0, scale: 0.9, y: 16, duration: 0.5, stagger: 0.07 },
          "-=0.25"
        )
        .from(
          viewerRef.current,
          { opacity: 0, y: 36, scale: 0.96, duration: 0.85 },
          "-=0.2"
        );

      gsap.to(".resume-shine", {
        x: "240%",
        duration: 2,
        repeat: -1,
        ease: "none",
        repeatDelay: 2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const openNewTab = useCallback(() => {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={`resume-orb ${styles.orb} ${styles.orb1}`} aria-hidden />
      <div className={`resume-orb ${styles.orb} ${styles.orb2}`} aria-hidden />

      <header className={styles.toolbar}>
        <div className={`section-container ${styles.toolbarInner}`}>
          <Link
            href="/"
            className="resume-toolbar-item flex items-center gap-2 text-sm font-mono text-gray-light-2 hover:text-indigo-light transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline">Back</span>
          </Link>

          <div className={`resume-toolbar-item ${styles.toolbarActions}`}>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className={`${styles.toolbarBtn} hidden sm:inline-flex`}
              aria-label={expanded ? "Exit focus mode" : "Focus mode"}
            >
              {expanded ? (
                <Minimize2 />
              ) : (
                <Maximize2 />
              )}
              <span className="hidden md:inline">Focus</span>
            </button>
            <button
              type="button"
              onClick={openNewTab}
              className={styles.toolbarBtn}
            >
              <ExternalLink />
              <span className="hidden sm:inline">Open</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className={`${styles.toolbarBtn} ${styles.downloadBtn} relative overflow-hidden`}
            >
              <span
                className="resume-shine absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full pointer-events-none"
                aria-hidden
              />
              <Download className="relative z-10" />
              <span className="relative z-10">Download</span>
            </button>
          </div>
        </div>
      </header>

      <main
        className={`relative z-10 section-container transition-all duration-500 ${
          expanded ? "py-3 sm:py-4 pb-8" : "py-7 sm:py-10 md:py-12 pb-12"
        }`}
      >
        {!expanded && (
          <div className="resume-hero-block text-center max-w-2xl mx-auto mb-7 sm:mb-10">
            <div className="resume-hero-badge flex justify-center mb-4">
              <span className={styles.heroBadge}>
                <Sparkles className="w-3.5 h-3.5 text-purple" />
                Resume · PDF
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-medium text-gradient leading-tight">
              Hrithik Shetty
            </h1>
            <p className="mt-3 sm:mt-4 text-gray-light-3 text-sm sm:text-base leading-relaxed px-1">
              The story on paper — scroll the preview, grab the file, or open
              full-screen in one tap.
            </p>
            <div className={styles.statRow}>
              <div className={`resume-stat ${styles.statPill}`}>
                <strong>Format</strong>
                PDF
              </div>
              <div className={`resume-stat ${styles.statPill}`}>
                <strong>Ready</strong>
                Download
              </div>
              <div className={`resume-stat ${styles.statPill}`}>
                <strong>View</strong>
                Any device
              </div>
            </div>
            <div className={`${styles.quickActions} sm:hidden`}>
              <button
                type="button"
                onClick={openNewTab}
                className={`${styles.toolbarBtn} justify-center`}
              >
                <ExternalLink />
                Open
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className={`${styles.toolbarBtn} ${styles.downloadBtn} justify-center`}
              >
                <Download />
                Save
              </button>
            </div>
          </div>
        )}

        <div className={styles.viewerOuter}>
          <div ref={viewerRef} className={styles.viewerShell}>
            <div className={styles.viewerChrome}>
              <div className="flex gap-1.5 shrink-0" aria-hidden>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <span className="flex-1 text-center text-[10px] sm:text-xs font-mono text-gray-light-2 tracking-wider truncate px-2 min-w-0">
                hrithik_shetty_resume.pdf
              </span>
              <span className="text-[10px] font-mono text-gray-light-2 opacity-50 shrink-0 hidden sm:inline">
                Live
              </span>
            </div>

            <div className={styles.iframeWrap}>
              <div
                className={`${styles.loader} ${!loading ? styles.hidden : ""}`}
                aria-live="polite"
                aria-busy={loading}
              >
                <div className={styles.loaderRing} />
                <div className={styles.loaderTrack}>
                  <div ref={loaderFillRef} className={styles.loaderFill} />
                </div>
                <p className="text-[10px] font-mono text-gray-light-2 uppercase tracking-[0.2em]">
                  Loading preview…
                </p>
              </div>

              {pdfMissing ? (
                <div className={styles.pdfFallback}>
                  <FileText className="w-10 h-10 text-purple opacity-80" />
                  <p className="text-gray-light-2 font-mono text-sm leading-relaxed">
                    Add your file at{" "}
                    <code className="text-indigo-light">public/resume.pdf</code>
                  </p>
                  <div className={styles.mobileActionRow}>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className={`${styles.toolbarBtn} ${styles.downloadBtn} w-full justify-center`}
                    >
                      <Download />
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={openNewTab}
                      className={`${styles.toolbarBtn} w-full justify-center`}
                    >
                      <ExternalLink />
                      Open file
                    </button>
                  </div>
                </div>
              ) : (
                <iframe
                  title="Hrithik Shetty Resume"
                  src={`${RESUME_URL}#view=FitH&toolbar=0`}
                  className={styles.pdfFrame}
                  onLoad={finishLoading}
                />
              )}
            </div>
          </div>
        </div>

        <p className="mt-5 sm:mt-7 text-center text-[11px] sm:text-xs text-gray-light-2 font-mono leading-relaxed px-2">
          Over the PDF? Use{" "}
          <button
            type="button"
            onClick={openNewTab}
            className="text-indigo-light hover:underline"
          >
            Open
          </button>{" "}
          for the best mobile experience.
        </p>
      </main>
    </div>
  );
}
