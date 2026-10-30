/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Menu, X } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useAnimationFrame
} from 'motion/react';
import {
  STUDY_ARCHIVE,
  SCRIPTURE_EVIDENCE_LIST,
  FEATURE_PILLARS,
  StudyModule,
  FeaturePillar,
  ScriptureEvidence
} from './data/scriptureData';
import { ThrowableStudyDeck } from './components/ThrowableStudyDeck';
import { StudyReaderModal, StudyPlanModal } from './components/StudyModals';
import {
  ScrollKineticRibbon,
  ScrollWordByWordStatement,
  StickyStudyScrollCards
} from './components/PostHeroScrollEffects';
import OrbitImages from './components/OrbitImages';
import { SpiritualGoalSection } from './components/SpiritualGoalSection';
import { PastorGreetingSection } from './components/PastorGreetingSection';
import { ContactSection } from './components/ContactSection';

export interface CircularOrbitPillar {
  id: string;
  title: string;
  verseRef: string;
  image: string;
  studyId: string;
}

export const CIRCULAR_ORBIT_PILLARS: CircularOrbitPillar[] = [
  {
    id: 'confession-of-christ',
    title: 'Confession of Christ',
    verseRef: '1 John 4:2–3',
    image: '/assets/aistudio/cropped_circle_image__1__4c2928a7.png',
    studyId: 'testing-the-spirits'
  },
  {
    id: 'alignment-with-scripture',
    title: 'Alignment with Scripture',
    verseRef: 'Acts 17:11 & 2 Tim 3:16',
    image: '/assets/aistudio/cropped_circle_image__2__27130018.png',
    studyId: 'biblical-context'
  },
  {
    id: 'exaltation-of-god',
    title: 'Exaltation of God',
    verseRef: 'John 16:14 & 1 Cor 10:31',
    image: '/assets/aistudio/cropped_circle_image__3__863518da.png',
    studyId: 'holy-spirit-in-scripture'
  },
  {
    id: 'humility-and-servanthood',
    title: 'Humility & Servanthood',
    verseRef: 'Philippians 2:3–8',
    image: '/assets/aistudio/cropped_circle_image__4__21809b77.png',
    studyId: 'false-prophets-teaching'
  },
  {
    id: 'love-for-one-another',
    title: 'Love for One Another',
    verseRef: '1 John 4:7–11',
    image: '/assets/aistudio/cropped_circle_image__5__dbeb9244.png',
    studyId: 'prophecy-and-discernment'
  }
];

const ORBIT_IMAGES = CIRCULAR_ORBIT_PILLARS.map((p) => p.image);
const ORBIT_LABELS = CIRCULAR_ORBIT_PILLARS.map((p) => p.title);

export default function App() {
  // Motion preference & scroll state
  const [motionOk, setMotionOk] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [viewportH, setViewportH] = useState<number>(900);
  const [viewportW, setViewportW] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  // Interactive application state
  const [activeDeckIndex, setActiveDeckIndex] = useState<number>(0);
  const [throwTriggerCount, setThrowTriggerCount] = useState<number>(0);
  const [selectedStudy, setSelectedStudy] = useState<StudyModule | null>(null);
  const [studyPlanModalOpen, setStudyPlanModalOpen] = useState<boolean>(false);
  const [activePillarForModal, setActivePillarForModal] = useState<FeaturePillar | null>(null);

  // Examine the Evidence search & selection state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('1-john-4-1');

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const statementSectionRef = useRef<HTMLElement | null>(null);

  // Smooth global page scroll progress bar
  const { scrollYProgress } = useScroll();
  const smoothPageProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001
  });

  // Detect prefers-reduced-motion and bind scroll/resize listeners
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mq.matches;
    setMotionOk(!isReduced);
    setViewportH(window.innerHeight || 900);
    setViewportW(window.innerWidth || 1200);
    setScrollY(window.scrollY || 0);

    let rafId = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          ticking = false;
          setScrollY(window.scrollY);
        });
      }
    };
    const onResize = () => {
      setViewportH(window.innerHeight || 900);
      const w = window.innerWidth || 1200;
      setViewportW(w);
      if (w >= 768) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Lock body scroll and support Escape key when mobile menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [mobileNavOpen]);

  // One-way IntersectionObserver for non-hero entry reveals (fires once, never un-reveals)
  useEffect(() => {
    if (!motionOk) return;
    const elements = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [motionOk]);

  // Responsive sizing calibrated for mobile (<768), tablet (<1024), and desktop
  const isMobile = viewportW < 768;
  const isTablet = viewportW < 1024;

  // Scroll progress for the consolidated Hero section (Doors -> Video -> Rotated Ellipse -> Orbit Carousel)
  const { scrollYProgress: rawHeroProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring physics so even a small touch scroll on mobile glides smoothly
  const heroProgress = useSpring(rawHeroProgress, {
    stiffness: isMobile ? 75 : 120,
    damping: isMobile ? 24 : 28,
    mass: isMobile ? 0.48 : 0.5,
    restDelta: 0.0001
  });

  // Phase 1: Doors parting & initial title travel outward (0.00 -> 0.16)
  const panelLeftX = useTransform(heroProgress, [0, 0.14], ['0%', '-106%']);
  const panelRightX = useTransform(heroProgress, [0, 0.14], ['0%', '106%']);
  const doorsOpacity = useTransform(heroProgress, [0, 0.13, 0.15], [1, 1, 0]);

  const titleLeftShift = useTransform(heroProgress, [0, 0.12], ['0vw', '-14vw']);
  const titleRightShift = useTransform(heroProgress, [0, 0.12], ['0vw', '14vw']);
  const titleScale = useTransform(heroProgress, [0, 0.12], [1, 1.15]);
  const initialTitleOpacity = useTransform(heroProgress, [0, 0.10, 0.15], [1, 1, 0]);

  const dotLeftX = useTransform(heroProgress, [0, 0.14], ['0vw', '-38vw']);
  const dotLeftY = useTransform(heroProgress, [0, 0.14], ['0vh', '-34vh']);
  const dotRightX = useTransform(heroProgress, [0, 0.14], ['0vw', '38vw']);
  const dotRightY = useTransform(heroProgress, [0, 0.14], ['0vh', '34vh']);
  const initialDotsOpacity = useTransform(heroProgress, [0, 0.10, 0.14], [1, 1, 0]);

  const videoScale = useTransform(heroProgress, [0, 0.15, 0.95], [1.18, 1.0, 1.0]);
  const duotoneOverlayOpacity = useTransform(heroProgress, [0, 0.15], [0, 0.22]);

  // Video Callout when video is first uncovered before the ellipse expands
  const videoCalloutOpacity = useTransform(heroProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);

  // Phase 2: Expanding Rotated Elliptical Portal Layer (0.17 -> 0.95)
  const ellipseRx = useTransform(heroProgress, [0.17, 0.28, 0.90, 0.98], ['0%', '55%', '55%', '55%']);
  const ellipseRy = useTransform(heroProgress, [0.17, 0.28, 0.90, 0.98], ['0%', '55%', '55%', '55%']);
  const ellipseClipPath = useMotionTemplate`ellipse(${ellipseRx} ${ellipseRy} at 50% 50%)`;
  const ellipseContainerOpacity = useTransform(heroProgress, [0.16, 0.18, 0.95, 1.0], [0, 1, 1, 0]);

  // Typography inside the ellipse: Blur & opacity choreography
  const ellipseTextKeyframes = isMobile
    ? [0.20, 0.25, 0.28, 0.33, 0.88, 0.93, 0.97]
    : [0.20, 0.27, 0.33, 0.40, 0.82, 0.90, 0.95];
  const ellipseTextOpacity = useTransform(
    heroProgress,
    ellipseTextKeyframes,
    [0, 1, 1, 0, 0, 1, 0]
  );
  const ellipseTextBlurVal = useTransform(
    heroProgress,
    ellipseTextKeyframes,
    [15, 0, 0, 15, 15, 0, 0]
  );
  const ellipseFilterText = useMotionTemplate`blur(${ellipseTextBlurVal}px)`;
  const ellipseTextY = useTransform(
    heroProgress,
    ellipseTextKeyframes,
    [20, 0, 0, 20, 20, 0, 0]
  );

  // Phase 3: Orbit carousel morphing inside the ellipse
  const targetRadius = isMobile
    ? 350
    : isTablet
    ? 330
    : 460;
  const initialItemSize = isMobile ? 95 : isTablet ? 72 : 92;
  const focusedItemSize = isMobile ? 125 : isTablet ? 175 : 230;
  const initialRx = isMobile ? 275 : isTablet ? 240 : 330;
  const initialRy = isMobile ? 165 : isTablet ? 100 : 140;

  const orbitMorphKeyframes = isMobile
    ? [0.26, 0.33, 0.88, 0.94]
    : [0.26, 0.37, 0.82, 0.90];

  // Scroll-driven item size transformation (zooming up as the user scrolls in)
  const orbitItemSize = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [initialItemSize, focusedItemSize, focusedItemSize, initialItemSize]
  );
  // Scroll-driven track expansion transformation (Position 1 ellipse -> Position 2 large circle)
  const orbitRx = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [initialRx, targetRadius, targetRadius, initialRx]
  );
  const orbitRy = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [initialRy, targetRadius, targetRadius, initialRy]
  );
  const orbitRotation = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [-15, 0, 0, -15]
  );
  // On mobile (<768px), shift the stage from -7vw (Position 1: centered ring) to -120vw (Position 2: 1 image visible) via media query
  const orbitTx = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [0, isMobile ? 0 : -targetRadius, isMobile ? 0 : -targetRadius, 0]
  );
  const focusStrength = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [0, 1, 1, 0]
  );

  // Scroll-driven zoom / scale for the entire hero orbit stage
  const orbitStageScale = useTransform(
    heroProgress,
    orbitMorphKeyframes,
    [isMobile ? 0.90 : 0.85, isMobile ? 2.45 : 1.05, isMobile ? 2.45 : 1.05, isMobile ? 0.90 : 0.88]
  );

  // Mobile scroll-driven transition:
  // Position 1 (0.17 -> 0.26): shifted slightly left (-7vw) at 0.90x scale on a 100vw stage so all orbiting images frame the title symmetrically
  // Position 2 (0.33 -> 0.88): zoomed in (2.45x) and shifted left (-120vw) so all 5 focused orbiting images are viewed clearly one by one before zooming/blurring out
  const mobileScrollZoom = useTransform(
    heroProgress,
    [0.26, 0.33, 0.88, 0.94],
    [0.90, 2.45, 2.45, 0.90]
  );
  const mobileOrbitLeft = useTransform(
    heroProgress,
    [0.26, 0.33, 0.88, 0.94],
    ['-7vw', '-120vw', '-120vw', '-7vw']
  );
  const mobileMedallionZoom = useTransform(
    heroProgress,
    [0.26, 0.33, 0.88, 0.94],
    [1.0, 1.24, 1.24, 1.0]
  );
  // 0px blur while orbiting so all 5 images are seen clearly; blurs out only after the 5th image has been shown (0.90 -> 0.97)
  const mobileOrbitBlurVal = useTransform(
    heroProgress,
    [0, 0.90, 0.97],
    [0, 0, 16]
  );
  const mobileOrbitBlur = useMotionTemplate`blur(${mobileOrbitBlurVal}px)`;
  const mobileOrbitOpacity = useTransform(
    heroProgress,
    [0.16, 0.20, 0.91, 0.97],
    [0, 1, 1, 0]
  );

  const orbitProgress = useMotionValue(0);
  const prevHeroProgress = useRef(0);

  useAnimationFrame((_time, delta) => {
    const pos = heroProgress.get();
    const scrollDelta = pos - prevHeroProgress.current;
    prevHeroProgress.current = pos;
    const dt = Math.min(delta, 50) / 1000;
    let frameSpeed = 0;

    if (isMobile) {
      // On mobile: advance ~94 units across (0.30 -> 0.86) so all 5 images (0, 20, 40, 60, 80) pass through the focal point clearly while zoomed in before any blur at 0.90
      if (pos > 0.30 && pos < 0.86) {
        frameSpeed = scrollDelta * 168;
      } else {
        frameSpeed = dt * 2.5;
      }
    } else {
      if (pos > 0.30 && pos < 0.85) {
        frameSpeed = scrollDelta * 220;
      } else {
        frameSpeed = dt * 2.5;
      }
    }

    orbitProgress.set(orbitProgress.get() + frameSpeed);
  });

  // Statement fold circular medallion drift bound to scrollY (rotation kept strictly at 0deg so God's sacred name יהוה stays straight)
  const statementOffset = Math.max(0, scrollY - viewportH * 1.2);
  const circleDriftY = motionOk ? Math.min(statementOffset * -0.11, 0) : 0;
  const numeralDriftY = motionOk ? statementOffset * 0.07 : 0;

  // Filtered Scripture Evidence rows for the table
  const filteredEvidenceList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SCRIPTURE_EVIDENCE_LIST;
    const matches = SCRIPTURE_EVIDENCE_LIST.filter(
      (item) =>
        item.reference.toLowerCase().includes(q) ||
        item.kjvText.toLowerCase().includes(q) ||
        item.theme.toLowerCase().includes(q) ||
        item.greekKey.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q) || q.includes(k))
    );
    return matches.length > 0 ? matches : SCRIPTURE_EVIDENCE_LIST;
  }, [searchQuery]);

  const activeEvidence: ScriptureEvidence = useMemo(() => {
    return (
      filteredEvidenceList.find((item) => item.id === selectedEvidenceId) ||
      filteredEvidenceList[0] ||
      SCRIPTURE_EVIDENCE_LIST[0]
    );
  }, [filteredEvidenceList, selectedEvidenceId]);

  const activeDeckStudy = STUDY_ARCHIVE[activeDeckIndex] || STUDY_ARCHIVE[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0A0C0E] text-[#EDE7DC] font-sora selection:bg-[#E8913C] selection:text-[#0A0C0E] ${
        motionOk ? 'motion-ok' : ''
      }`}
    >
      {/* =====================================================================
          FIXED 58PX NAVIGATION BAR (3-Zone Contract, 14px Blur, Hairline Bottom)
      ====================================================================== */}
      <header
        className="site-header fixed top-0 inset-x-0 z-[100] h-[58px] bg-[#0A0C0E]/90 hairline-b flex items-center"
      >
        <div
          className="header-bar w-full h-full max-w-[1380px] mx-auto px-6 flex items-center justify-between gap-8"
          style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
        >
          {/* Zone 1: Display wordmark at 15px with trailing period in amber */}
          <a
            href="#portal-hero"
            onClick={(e) => {
              e.preventDefault();
              setMobileNavOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 font-syne font-extrabold text-[15px] tracking-[-0.025em] text-[#EDE7DC] whitespace-nowrap shrink-0 group"
          >
            <img
              src="/assets/aistudio/testthespirit.org-512x512_b34cce9b.png"
              alt="Test the Spirit Logo"
              className="w-6 h-6 object-contain rounded-sm shrink-0"
            />
            <span>TEST THE SPIRIT<span className="text-[#E8913C]">.</span></span>
          </a>

          {/* Zone 2: 8 single-line uppercase links at 10.5px turning amber on hover */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', id: 'portal-hero' },
              { label: 'Mission', id: 'statement-fold' },
              { label: 'Spiritual Goal', id: 'spiritual-goal' },
              { label: 'Pastor Shahid', id: 'pastor-greeting' },
              { label: 'Bible Studies', id: 'study-archive' },
              { label: 'Discernment', id: 'pillars-roster' },
              { label: 'Scripture', id: 'scripture-evidence' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="label-caps text-[#9EA5A8] hover:text-[#E8913C] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Desktop pill button + Mobile hamburger toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActivePillarForModal(FEATURE_PILLARS[0]);
                setStudyPlanModalOpen(true);
              }}
              className="hidden sm:inline-block px-4 py-1.5 rounded-full bg-transparent hairline-border label-caps text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              GET STARTED
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation-drawer"
              className="mobile-menu-btn md:hidden w-10 h-10 flex items-center justify-center rounded-lg hairline-border bg-[#101317]/90 text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer relative z-[110]"
            >
              {mobileNavOpen ? (
                <X className="w-5 h-5 text-[#E8913C] shrink-0" />
              ) : (
                <Menu className="w-5 h-5 text-[#EDE7DC] shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Modal Overlay */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-nav-drawer fixed inset-x-0 top-[58px] bottom-0 z-[105] bg-[#0A0C0E]/98 backdrop-blur-2xl hairline-t overflow-y-auto p-5 sm:p-6 flex flex-col justify-between md:hidden"
            >
              <div className="mobile-nav-body space-y-3">
                <div className="mobile-nav-header flex items-center justify-between pb-2.5 hairline-b">
                  <span className="label-caps text-[#E8913C]">
                    NAVIGATION DIRECTORY
                  </span>
                  <span className="label-caps text-[#6C7378]">
                    BEREAN ARCHIVE
                  </span>
                </div>

                <nav aria-label="Mobile Navigation" className="mobile-nav-list grid grid-cols-1 gap-2">
                  {[
                    { label: 'Home', id: 'portal-hero', desc: 'Interactive Discernment Orbit' },
                    { label: 'Mission', id: 'statement-fold', desc: '1 Thessalonians 5:21' },
                    { label: 'Spiritual Goal', id: 'spiritual-goal', desc: 'Romans 7 & 8 · United in Elohim' },
                    { label: 'Pastor Shahid', id: 'pastor-greeting', desc: '“Shalom in the Messiah”' },
                    { label: 'Bible Studies', id: 'study-archive', desc: '06 Foundational Volumes' },
                    { label: 'Discernment', id: 'pillars-roster', desc: 'Berean Standard Pillars' },
                    { label: 'Scripture', id: 'scripture-evidence', desc: 'Manuscript Evidence' },
                    { label: 'Contact', id: 'contact', desc: 'Direct Ministerial Inbox' }
                  ].map((link, idx) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileNavOpen(false);
                        scrollToSection(link.id);
                      }}
                      className="mobile-nav-link flex items-center justify-between p-3 rounded-lg hairline-border hover:border-[#E8913C] bg-[#101317] transition-colors group"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="mobile-nav-link-title font-syne font-bold text-sm text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors">
                          {link.label}
                        </div>
                        <div className="mobile-nav-link-desc label-caps text-[#9EA5A8] text-[9.5px] mt-0.5 truncate">
                          {link.desc}
                        </div>
                      </div>
                      <span className="mobile-nav-link-index label-caps text-[#E8913C] text-[11px] shrink-0">
                        0{idx + 1} →
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mobile-nav-footer pt-4 mt-4 hairline-t space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    setActivePillarForModal(FEATURE_PILLARS[0]);
                    setStudyPlanModalOpen(true);
                  }}
                  className="mobile-nav-cta w-full py-3.5 rounded-full bg-[#E8913C] text-[#0A0C0E] font-syne font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow-md"
                >
                  GET STARTED · STUDY PLAN
                </button>

                <div className="mobile-nav-socials flex items-center justify-center gap-6 pt-1 text-[#9EA5A8]">
                  <a
                    href="https://www.youtube.com/@testthespirit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Channel"
                    className="p-2 hover:text-[#E8913C] transition-colors"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/holy.zion1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 hover:text-[#E8913C] transition-colors"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/shahid.hanif777/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 hover:text-[#E8913C] transition-colors"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@shahidhanif474/video/7544945748958285078"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-2 hover:text-[#E8913C] transition-colors"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thin 1px Amber Scroll Progress Rule on Bottom Hairline of Header */}
        {motionOk && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: smoothPageProgress, transformOrigin: '0% 50%' }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E8913C]"
          />
        )}
      </header>

      <main>
        {/* =====================================================================
            SECTION 1: UNIFIED PORTAL HERO WITH SCROLL-EXPANDING ORBIT STAGE
            (Doors Part -> Video Revealed -> Rotated Elliptical Study Orbit all on Hero Page)
        ====================================================================== */}
        <section
          id="portal-hero"
          ref={heroSectionRef}
          aria-label="Test the Spirit Hero and Orbital Study Exploration"
          className="relative h-[650vh] bg-[#0A0C0E]"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden isolate hero-sticky-frame">
            {/* Layer 1 (Back): Looping Hero Video - always running, revealed as doors part */}
            <motion.div
              className="absolute inset-0 z-[10] flex items-center justify-center bg-[#0A0C0E]"
              style={{
                scale: videoScale,
                willChange: 'transform'
              }}
            >
              <video
                src="/assets/aistudio/5e2c97c8-fc7e-427f-b53b-7f25c799d445_cc6c68f9.mp4"
                poster="/assets/aistudio/file_0000000012ac8211860ec8fae52f06e3_ad643363.png"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center block sm:hidden"
              />
              <video
                src="/assets/aistudio/gemini_generated_video_e00cb7d9_4f498c19.mp4"
                poster="/assets/aistudio/file_0000000012ac8211860ec8fae52f06e3_ad643363.png"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center hidden sm:block"
              />
            </motion.div>

            {/* Layer 2: Subtle duotone wash blending #E8913C and #2E6B72 at mix-blend-mode: overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-[15]"
              style={{
                background: 'linear-gradient(135deg, #E8913C 0%, #2E6B72 100%)',
                mixBlendMode: 'overlay',
                opacity: duotoneOverlayOpacity
              }}
            />

            {/* Layer 3: Measured radial veil darkening outer edges */}
            <div
              className="pointer-events-none absolute inset-0 z-[20]"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(10,12,14,0) 42%, rgba(10,12,14,0.82) 100%)'
              }}
            />

            {/* Video Revealed Interstitial Callout (shines once doors part, before ellipse opens) */}
            <motion.div
              className="pointer-events-none absolute z-[22] left-6 sm:left-14 bottom-14 sm:bottom-20 max-w-xl"
              style={{
                opacity: videoCalloutOpacity
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span className="label-caps text-[#E8913C]">1 JOHN 4:1 · TRY THE SPIRITS</span>
              </div>
              <h2 className="font-syne font-extrabold text-2xl sm:text-4xl text-[#EDE7DC] leading-tight select-none">
                BELIEVE NOT EVERY SPIRIT<span className="text-[#E8913C]">.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#9EA5A8] select-none">
                Scroll further to unveil the interactive Scripture Discernment Orbit
              </p>
            </motion.div>

            {/* Layer 4: Initial Doors that part outward on initial scroll (0.00 -> 0.16) */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 left-0 w-[51vw] bg-[#0A0C0E] border-r border-[rgba(237,231,220,0.13)] z-[30]"
              style={{
                x: panelLeftX,
                opacity: doorsOpacity,
                willChange: 'transform, opacity'
              }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 right-0 w-[51vw] bg-[#0A0C0E] border-l border-[rgba(237,231,220,0.13)] z-[30]"
              style={{
                x: panelRightX,
                opacity: doorsOpacity,
                willChange: 'transform, opacity'
              }}
            />

            {/* Layer 5: Initial Center glowing accent dots (travel outward then fade) */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[32] w-2 h-2 rounded-full bg-[#E8913C]"
              style={{
                x: dotLeftX,
                y: dotLeftY,
                opacity: initialDotsOpacity
              }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[32] w-2 h-2 rounded-full bg-[#2E6B72]"
              style={{
                x: dotRightX,
                y: dotRightY,
                opacity: initialDotsOpacity
              }}
            />

            {/* Layer 6: Initial Portal Title on closed doors (splits apart and fades out) */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[22%] sm:top-[16%] z-[33] flex flex-col items-center justify-center px-4 sm:px-6"
              style={{
                opacity: initialTitleOpacity
              }}
            >
              <h1
                className="font-syne font-extrabold uppercase text-[#EDE7DC] flex items-center justify-center gap-2 sm:gap-5 whitespace-nowrap select-none"
                style={{
                  fontSize: 'clamp(1.35rem, 5.5vw, 4.25rem)',
                  letterSpacing: '-0.02em'
                }}
              >
                <motion.span style={{ x: titleLeftShift, scale: titleScale, willChange: 'transform' }}>
                  TEST THE
                </motion.span>
                <motion.span style={{ x: titleRightShift, scale: titleScale, willChange: 'transform' }}>
                  SPIRIT<span className="text-[#E8913C]">.</span>
                </motion.span>
              </h1>
              <p className="mt-2 sm:mt-3 text-[10.5px] sm:text-sm text-[#9EA5A8] tracking-wide text-center uppercase max-w-xs sm:max-w-none">
                Examine Every Teaching · Search the Scriptures · Hold Fast to the Truth
              </p>
            </motion.div>

            {/* Layer 7: Expanding Rotated Elliptical Portal Layer Unveiling the OrbitImages Stage (0.17 -> 0.95) */}
            <motion.div
              className="absolute z-[35] flex items-center justify-center overflow-hidden hero-ellipse-layer"
              style={{
                clipPath: ellipseClipPath,
                rotate: -15,
                width: '150vw',
                height: '150vh',
                left: '-25vw',
                top: '-25vh',
                opacity: ellipseContainerOpacity
              }}
            >
              {/* Warm Bone Canvas inside the Elliptical Portal */}
              <div className="absolute inset-0 bg-[#EDE7DC]" />
              <div
                className="relative flex flex-col items-center justify-center"
                style={{ width: '100vw', height: '100vh', transform: 'rotate(15deg)' }}
              >
                <motion.div
                  style={{
                    scale: orbitStageScale,
                    ['--mobile-orbit-zoom' as any]: mobileScrollZoom,
                    ['--mobile-orbit-left' as any]: mobileOrbitLeft,
                    ['--mobile-item-zoom' as any]: mobileMedallionZoom,
                    ['--mobile-orbit-blur' as any]: mobileOrbitBlur,
                    ['--mobile-orbit-opacity' as any]: mobileOrbitOpacity,
                    transformOrigin: 'center center',
                    willChange: 'transform, filter, opacity'
                  }}
                  className="w-[90vw] max-w-[1200px] aspect-square relative z-0 hero-orbit-stage"
                >
                  <OrbitImages
                    images={ORBIT_IMAGES}
                    labels={ORBIT_LABELS}
                    shape="ellipse"
                    direction="normal"
                    duration={40}
                    fill={true}
                    showPath={false}
                    responsive={true}
                    baseWidth={800}
                    progressOverride={orbitProgress}
                    radiusXOverride={orbitRx}
                    radiusYOverride={orbitRy}
                    itemSizeOverride={orbitItemSize}
                    rotationOverride={orbitRotation}
                    translateXOverride={orbitTx}
                    focusStrength={focusStrength}
                    onSelectIndex={(idx: number) => {
                      const chosenPillar = CIRCULAR_ORBIT_PILLARS[idx];
                      const chosen =
                        (chosenPillar && STUDY_ARCHIVE.find((s) => s.id === chosenPillar.studyId)) ||
                        STUDY_ARCHIVE[idx] ||
                        STUDY_ARCHIVE[0];
                      if (chosen) setSelectedStudy(chosen);
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Layer 8: Foreground Typography & Callouts inside the Elliptical Portal */}
            <div className="absolute inset-0 z-[45] pointer-events-none">
              {/* Center Title inside the Orbit Ring */}
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                <motion.div
                  className="flex flex-col items-center whitespace-nowrap pointer-events-auto text-center"
                  style={{
                    filter: ellipseFilterText,
                    opacity: ellipseTextOpacity,
                    transform: 'translateZ(0)'
                  }}
                >
                  <div className="flex items-baseline text-[#0A0C0E] leading-none mb-1">
                    <span className="font-syne font-extrabold text-[22px] sm:text-[34px] md:text-[50px] tracking-[-0.03em] text-[#0A0C0E]">
                      Test the Spirit<span className="text-[#E8913C]">.</span>
                    </span>
                  </div>
                  <span className="font-sora text-[11px] sm:text-[16px] md:text-[22px] tracking-[0.08em] uppercase text-[#2E6B72] mt-0.5 sm:mt-1 font-semibold">
                    Search the Scriptures
                  </span>
                </motion.div>
              </div>

              {/* Top-Right Scripture Callout */}
              <motion.div
                className="hidden sm:flex absolute top-16 sm:top-24 right-4 sm:right-[6vw] md:right-[140px] flex-col items-start text-left pointer-events-auto"
                style={{ y: ellipseTextY, filter: ellipseFilterText, opacity: ellipseTextOpacity }}
              >
                <span className="font-syne font-extrabold text-[20px] sm:text-[28px] md:text-[36px] leading-none mb-1 sm:mb-2 text-[#0A0C0E]">
                  1 JOHN 4:1
                </span>
                <span className="label-caps text-[#0A0C0E]/80 text-[9px] sm:text-[10.5px] leading-tight sm:leading-[18px] text-left">
                  TRY THE SPIRITS
                  <br />
                  WHETHER OF GOD
                </span>
              </motion.div>

              {/* Bottom-Left Archive Count Callout */}
              <motion.div
                className="absolute bottom-6 sm:bottom-10 md:bottom-16 left-4 sm:left-8 md:left-16 flex flex-col items-start text-[#0A0C0E] pointer-events-auto"
                style={{ y: ellipseTextY, filter: ellipseFilterText, opacity: ellipseTextOpacity }}
              >
                <span className="font-syne font-extrabold text-[22px] sm:text-[32px] md:text-[40px] leading-none mb-0.5 sm:mb-1 text-[#0A0C0E] tabular-nums">
                  05 SEALS
                </span>
                <span className="label-caps text-[#2E6B72] text-[9px] sm:text-[10.5px]">DOCTRINAL DISCERNMENT</span>
              </motion.div>

              {/* Bottom-Right Verse & Dual Action Buttons */}
              <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-[6vw] md:right-[8vw] flex flex-col items-start z-10 pointer-events-auto">
                <motion.p
                  className="hidden sm:block label-caps text-[#0A0C0E] leading-[18px] mb-4 text-left w-[240px]"
                  style={{ y: ellipseTextY, filter: ellipseFilterText, opacity: ellipseTextOpacity }}
                >
                  “PROVE ALL THINGS; HOLD FAST THAT WHICH IS GOOD.” — 1 THESSALONIANS 5:21
                </motion.p>
                <motion.div
                  className="flex gap-2 pointer-events-auto items-center"
                  style={{ y: ellipseTextY, filter: ellipseFilterText, opacity: ellipseTextOpacity }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection('study-archive')}
                    className="rounded-full bg-[#0A0C0E] text-[#EDE7DC] hover:text-[#E8913C] px-3.5 py-2 sm:px-5 sm:py-2.5 label-caps text-[10px] sm:text-[10.5px] transition-all cursor-pointer border border-[#0A0C0E] whitespace-nowrap shrink-0"
                  >
                    EXPLORE ARCHIVE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (STUDY_ARCHIVE[0]) setSelectedStudy(STUDY_ARCHIVE[0]);
                    }}
                    aria-label="Open Vol. 01 Study Guide"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#0A0C0E] flex items-center justify-center text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-all cursor-pointer shrink-0"
                  >
                    <span className="font-syne font-bold text-xs sm:text-sm">→</span>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Layer 9: Persistent Corner Metadata */}
            <div className="pointer-events-none absolute top-[64px] sm:top-[74px] left-4 sm:left-6 right-4 sm:right-6 z-[48] flex items-center justify-between text-[9.5px] sm:text-[10.5px]">
              <div className="label-caps text-[#9EA5A8]">
                <span className="text-[#E8913C]">1 JOHN 4:1</span> · TRY THE SPIRITS
              </div>
              <div className="label-caps text-[#9EA5A8] hidden sm:block">
                SCRIPTURE BANNER · <span className="text-[#2E6B72]">1 THESSALONIANS 5:21</span>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 z-[48] flex items-center justify-between text-[9.5px] sm:text-[10.5px]">
              <div className="label-caps text-[#6C7378] truncate max-w-[200px] sm:max-w-none">
                LED BY PASTOR SHAHID HANIF
              </div>
              <div className="label-caps text-[#E8913C] shrink-0">
                SCROLL ↓
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCROLL-LINKED KINETIC SCRIPTURE TICKER
        ====================================================================== */}
        <ScrollKineticRibbon scrollY={scrollY} motionOk={motionOk} />

        {/* =====================================================================
            SECTION 2: STATEMENT FOLD (Word-by-Word Scroll Illumination & Parallax)
        ====================================================================== */}
        <section
          id="statement-fold"
          ref={statementSectionRef}
          className="relative min-h-screen bg-[#0A0C0E] overflow-hidden flex items-center py-28 px-6"
        >
          {/* Floating Circular Medallion off the right edge - kept straight and upright so God's sacred name (יהוה) never rotates or tilts */}
          <div
            aria-hidden="true"
            className="statement-medallion-parallax pointer-events-none absolute -right-24 sm:-right-16 top-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full overflow-hidden opacity-45 drop-shadow-[0_24px_48px_rgba(0,0,0,0.85)]"
            style={{
              transform: `translate3d(0, ${circleDriftY.toFixed(1)}px, 0)`,
              willChange: 'transform'
            }}
          >
            <img
              src="/assets/aistudio/cropped_circle_image__3__863518da.png"
              alt="Exaltation of God Tetragrammaton Seal"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10 w-full max-w-[1380px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <motion.div
                initial={motionOk ? { opacity: 0, y: 40 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-9 space-y-8"
              >
                {/* Small uppercase label */}
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                  <span className="label-caps text-[#9EA5A8]">
                    THE MISSION · DISCERNMENT THROUGH SCRIPTURE · 1 THESSALONIANS 5:21
                  </span>
                </div>

                {/* Scroll-Scrubbed Word-by-Word Statement */}
                <ScrollWordByWordStatement motionOk={motionOk} />

                {/* Mission paragraphs & pastoral attribution */}
                <motion.div
                  initial={motionOk ? { opacity: 0, y: 28 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 hairline-t max-w-3xl"
                >
                  <p className="text-sm text-[#9EA5A8] leading-relaxed">
                    Examine every spiritual teaching. Search the Scriptures. Hold fast to sound
                    biblical doctrine, and anchor your faith in the living Word of God. Study
                    biblical context and private interpretations in light of eternal Scripture.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-[#EDE7DC] leading-relaxed">
                      “Led by Pastor Shahid Hanif”
                    </p>
                    <div className="label-caps text-[#2E6B72]">
                      GROUNDED IN SCRIPTURE · GUIDED BY TRUTH
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Outlined index numeral with counter-parallax drift */}
              <div
                className="statement-numeral-parallax lg:col-span-3 flex lg:justify-end will-change-transform"
                style={{
                  transform: `translate3d(0, ${numeralDriftY.toFixed(1)}px, 0)`
                }}
              >
                <span
                  aria-hidden="true"
                  className="outlined-numeral leading-none"
                  style={{ fontSize: 'clamp(5rem, 11vw, 9.5rem)' }}
                >
                  01
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2B: OUR SPIRITUAL GOAL (Romans 7 & 8 · United in Elohim)
        ====================================================================== */}
        <SpiritualGoalSection
          motionOk={motionOk}
          onOpenStudyGuide={(study) => setSelectedStudy(study)}
          availableStudies={STUDY_ARCHIVE}
        />

        {/* =====================================================================
            SECTION 2C: PASTORAL ADDRESS (Pastor Shahid Hanif · "Shalom in the Messiah")
        ====================================================================== */}
        <PastorGreetingSection
          motionOk={motionOk}
          onNavigateToContact={() => scrollToSection('contact')}
        />

        {/* =====================================================================
            SECTION 3: BIBLICAL STUDY ARCHIVE ("Explore the Word" + Throwable Deck + Sticky Scroll Stack)
        ====================================================================== */}
        <section
          id="study-archive"
          className="bg-[#101317] hairline-t py-24 sm:py-32 px-6"
        >
          <div className="max-w-[1380px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Headline, Lede, Active Study Details, and Two Buttons */}
              <motion.div
                initial={motionOk ? { opacity: 0, y: 40 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
                  <span className="label-caps text-[#9EA5A8]">
                    BIBLICAL STUDY ARCHIVE · 06 VOLUMES
                  </span>
                </div>

                <h2
                  className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-[1.08]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  EXPLORE THE WORD<span className="text-[#E8913C]">.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#9EA5A8] leading-relaxed max-w-xl">
                  Flip through our six foundational study sleeves—from{' '}
                  <span className="text-[#EDE7DC]">Testing the Spirits</span> and{' '}
                  <span className="text-[#EDE7DC]">False Prophets &amp; False Teaching</span> to{' '}
                  <span className="text-[#EDE7DC]">The Holy Spirit in Scripture</span>,{' '}
                  <span className="text-[#EDE7DC]">Prophecy &amp; Discernment</span>,{' '}
                  <span className="text-[#EDE7DC]">Biblical Context</span>, and{' '}
                  <span className="text-[#EDE7DC]">Christian Apologetics</span>.
                </p>

                {/* Currently Top-of-Deck Study Preview Box */}
                <div className="p-5 bg-[#0A0C0E] hairline-border space-y-2 max-w-xl">
                  <div className="flex items-center justify-between">
                    <span className="label-caps text-[#E8913C]">
                      ACTIVE SLEEVE · 0{activeDeckIndex + 1} / 0{STUDY_ARCHIVE.length}
                    </span>
                    <span className="label-caps text-[#2E6B72]">
                      {activeDeckStudy.keyVerseRef}
                    </span>
                  </div>
                  <div className="font-syne font-bold text-xl text-[#EDE7DC]">
                    {activeDeckStudy.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#9EA5A8] leading-relaxed">
                    “{activeDeckStudy.keyVerseKJV}”
                  </p>
                </div>

                {/* Two Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(activeDeckStudy)}
                    className="px-6 py-3 rounded-full bg-transparent border border-[#E8913C] label-caps text-[#E8913C] hover:text-[#EDE7DC] hover:border-[#EDE7DC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    OPEN STUDY GUIDE (VOL. 0{activeDeckIndex + 1})
                  </button>
                  <button
                    type="button"
                    onClick={() => setThrowTriggerCount((c) => c + 1)}
                    className="px-6 py-3 rounded-full bg-transparent hairline-border label-caps text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    NEXT
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Physical Throwable Study Deck */}
              <motion.div
                initial={motionOk ? { opacity: 0, y: 48, scale: 0.96 } : false}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <ThrowableStudyDeck
                  items={STUDY_ARCHIVE}
                  activeIndex={activeDeckIndex}
                  onActiveIndexChange={setActiveDeckIndex}
                  onOpenStudy={(study) => setSelectedStudy(study)}
                  throwTriggerCount={throwTriggerCount}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3B: FULL-VIEWPORT HORIZONTAL SCROLL REEL (THE SIX STUDY VOLUMES)
        ====================================================================== */}
        <StickyStudyScrollCards
          studies={STUDY_ARCHIVE}
          onSelectStudy={(study) => setSelectedStudy(study)}
          motionOk={motionOk}
        />

        {/* =====================================================================
            SECTION 4: HAIRLINE ROSTER ("Three Feature Cards" & Study Directory)
        ====================================================================== */}
        <section id="pillars-roster" className="bg-[#0A0C0E] hairline-t py-24 px-6">
          <div className="max-w-[1380px] mx-auto">
            <motion.div
              initial={motionOk ? { opacity: 0, y: 36 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-end justify-between gap-4 mb-12"
            >
              <div>
                <div className="label-caps text-[#E8913C] mb-2">
                  THREE FEATURE PILLARS · BEREAN STANDARD
                </div>
                <h2
                  className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
                >
                  DISCERNMENT PILLARS<span className="text-[#E8913C]">.</span>
                </h2>
              </div>
              <span className="label-caps text-[#6C7378]">
                SELECT ANY PILLAR TO OPEN THE BEREAN CHECKLIST
              </span>
            </motion.div>

            {/* Staggered Scroll-Revealed Hairline Rows */}
            <div className="hairline-t">
              {FEATURE_PILLARS.map((pillar, idx) => (
                <motion.button
                  key={pillar.id}
                  type="button"
                  initial={motionOk ? { opacity: 0, y: 28 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.09,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => {
                    setActivePillarForModal(pillar);
                    setStudyPlanModalOpen(true);
                  }}
                  className="group w-full text-left py-7 px-2 hairline-b flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#101317] transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
                    <span className="label-caps text-[#E8913C] w-40 shrink-0">
                      PILLAR 0{idx + 1} · {pillar.scriptureAnchor}
                    </span>
                    <span className="font-syne font-bold text-2xl sm:text-3xl text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors tracking-[-0.02em]">
                      {pillar.title}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9EA5A8] max-w-md md:mx-auto">
                    {pillar.description}
                  </p>

                  <div className="label-caps text-[#2E6B72] group-hover:text-[#E8913C] shrink-0 md:text-right tabular-nums">
                    0{pillar.principles.length} CRITERIA →
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Complete 6-Study Archive Quick Roster */}
            <div className="mt-16">
              <div className="label-caps text-[#6C7378] mb-4">
                COMPLETE STUDY ARCHIVE INDEX (06 VOLUMES)
              </div>
              <div className="hairline-t">
                {STUDY_ARCHIVE.map((study, idx) => (
                  <motion.button
                    key={study.id}
                    type="button"
                    initial={motionOk ? { opacity: 0, y: 24 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.06,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => setSelectedStudy(study)}
                    className="group w-full text-left py-4 px-2 hairline-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#101317] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={study.image}
                        alt={study.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 object-cover hairline-border shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="label-caps text-[#2E6B72] block">
                          VOL. 0{idx + 1} · {study.category}
                        </span>
                        <span className="font-syne font-bold text-lg text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors">
                          {study.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 sm:justify-end">
                      <span className="text-xs text-[#9EA5A8] hidden lg:inline max-w-sm truncate">
                        {study.cardSnippet}
                      </span>
                      <span className="label-caps text-[#E8913C] shrink-0 tabular-nums">
                        {study.keyVerseRef} →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: EXAMINE THE EVIDENCE & FEATURED SCRIPTURES TABLE
        ====================================================================== */}
        <section id="scripture-evidence" className="bg-[#101317] hairline-t py-24 px-6">
          <div className="max-w-[1380px] mx-auto">
            {/* Header & Search Input */}
            <motion.div
              initial={motionOk ? { opacity: 0, y: 36 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12"
            >
              <div className="lg:col-span-7">
                <div className="label-caps text-[#E8913C] mb-2">
                  FEATURED SCRIPTURES &amp; BIBLICAL PROOF
                </div>
                <h2
                  className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(1.75rem, 3.4vw, 3rem)' }}
                >
                  EXAMINE THE EVIDENCE<span className="text-[#E8913C]">.</span>
                </h2>
              </div>

              <div className="lg:col-span-5">
                <label htmlFor="evidence-search" className="block label-caps text-[#9EA5A8] mb-2">
                  SEARCH SCRIPTURE REFERENCE OR DOCTRINAL KEYWORD
                </label>
                <div className="flex items-center bg-[#0A0C0E] hairline-border focus-within:border-[#E8913C] px-3.5 py-2.5">
                  <Search className="w-4 h-4 text-[#E8913C] shrink-0 mr-3" />
                  <input
                    id="evidence-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a biblical question or Scripture reference..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="label-caps text-[#9EA5A8] hover:text-[#E8913C] ml-2 cursor-pointer"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Visual Manuscript Strip */}
            <motion.div
              initial={motionOk ? { opacity: 0, y: 28 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-12"
            >
              <button
                type="button"
                onClick={() => setSelectedEvidenceId('galatians-1-8-9')}
                className={`group relative h-24 overflow-hidden bg-[#0A0C0E] border text-left p-2.5 flex items-end cursor-pointer ${
                  activeEvidence.id === 'galatians-1-8-9'
                    ? 'border-[#E8913C]'
                    : 'border-[rgba(237,231,220,0.13)] hover:border-[#2E6B72]'
                }`}
              >
                <img
                  src="/assets/aistudio/evidence_book_thumb.png"
                  alt="Open Bible Manuscript"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform"
                />
                <span className="relative z-10 label-caps text-[#EDE7DC] bg-[#0A0C0E]/85 px-2 py-0.5">
                  GAL 1:8–9
                </span>
              </button>

              {['1-john-4-1', '1-thess-5-16-21', 'acts-17-11'].map((id) => {
                const ev = SCRIPTURE_EVIDENCE_LIST.find((x) => x.id === id)!;
                const isSel = activeEvidence.id === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedEvidenceId(id)}
                    className={`h-24 bg-[#0A0C0E] border p-3 flex flex-col justify-between text-left transition-colors cursor-pointer ${
                      isSel
                        ? 'border-[#E8913C]'
                        : 'border-[rgba(237,231,220,0.13)] hover:border-[#2E6B72]'
                    }`}
                  >
                    <span className="label-caps text-[#2E6B72]">FEATURED</span>
                    <span className="font-syne font-bold text-sm text-[#EDE7DC]">
                      {ev.shortLabel}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSelectedEvidenceId('isaiah-8-20')}
                className={`group relative h-24 overflow-hidden bg-[#0A0C0E] border text-left p-2.5 flex items-end cursor-pointer ${
                  activeEvidence.id === 'isaiah-8-20'
                    ? 'border-[#E8913C]'
                    : 'border-[rgba(237,231,220,0.13)] hover:border-[#2E6B72]'
                }`}
              >
                <img
                  src="/assets/aistudio/evidence_scroll_thumb.png"
                  alt="Ancient Torah Scroll"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform"
                />
                <span className="relative z-10 label-caps text-[#EDE7DC] bg-[#0A0C0E]/85 px-2 py-0.5">
                  ISA 8:20
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvidenceId('2-timothy-3-16-17')}
                className={`h-24 bg-[#0A0C0E] border p-3 flex flex-col justify-between text-left transition-colors cursor-pointer ${
                  activeEvidence.id === '2-timothy-3-16-17'
                    ? 'border-[#E8913C]'
                    : 'border-[rgba(237,231,220,0.13)] hover:border-[#2E6B72]'
                }`}
              >
                <span className="label-caps text-[#E8913C]">KJV TYPOGRAPHY</span>
                <span className="font-syne font-bold text-sm text-[#EDE7DC]">
                  2 Timothy 3:16–17
                </span>
              </button>
            </motion.div>

            {/* Table with Uppercase Headers over a Hairline */}
            <div className="mb-10">
              <div className="hidden md:grid md:grid-cols-12 gap-4 pb-3 hairline-b label-caps text-[#6C7378]">
                <div className="col-span-3">SCRIPTURE REFERENCE</div>
                <div className="col-span-3">DOCTRINAL MANDATE</div>
                <div className="col-span-3">LEXICAL KEY</div>
                <div className="col-span-2">BOOK CONTEXT</div>
                <div className="col-span-1 text-right">EXEGESIS</div>
              </div>

              <div className="divide-y divide-[rgba(237,231,220,0.13)] hairline-b">
                {filteredEvidenceList.map((item, idx) => {
                  const isSelected = activeEvidence.id === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={motionOk ? { opacity: 0, y: 20 } : false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.55,
                        delay: idx * 0.06,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      onClick={() => setSelectedEvidenceId(item.id)}
                      className={`w-full text-left py-4 px-2 grid grid-cols-2 md:grid-cols-12 gap-y-2 gap-x-4 items-center transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#0A0C0E]' : 'hover:bg-[#0A0C0E]/60'
                      }`}
                    >
                      <div className="col-span-1 md:col-span-3 flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#E8913C]' : 'bg-[#2E6B72]'
                          }`}
                        />
                        <span className="font-syne font-bold text-base sm:text-lg text-[#EDE7DC]">
                          {item.reference}
                        </span>
                      </div>

                      <div className="col-span-1 md:col-span-3 text-xs sm:text-sm text-[#9EA5A8] md:text-left text-right">
                        {item.theme}
                      </div>

                      <div className="col-span-1 md:col-span-3 text-xs text-[#6C7378]">
                        {item.greekKey.split('—')[0]}
                      </div>

                      <div className="col-span-1 md:col-span-2 label-caps text-[#9EA5A8] md:text-left text-right">
                        {item.bookContext.split('·')[0]}
                      </div>

                      <div className="col-span-2 md:col-span-1 md:text-right label-caps text-[#E8913C]">
                        {isSelected ? 'ACTIVE' : 'VIEW →'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Active Scripture Exegesis & KJV Panel */}
            <motion.div
              key={activeEvidence.id}
              initial={motionOk ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0A0C0E] hairline-border p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="label-caps text-[#E8913C]">{activeEvidence.reference}</span>
                  <span className="text-[#6C7378]">/</span>
                  <span className="label-caps text-[#2E6B72]">{activeEvidence.bookContext}</span>
                </div>
                <blockquote className="font-syne font-semibold text-lg sm:text-2xl text-[#EDE7DC] leading-snug">
                  “{activeEvidence.kjvText}”
                </blockquote>
              </div>

              <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-[rgba(237,231,220,0.13)] lg:pl-8">
                <div>
                  <div className="label-caps text-[#2E6B72] mb-1">ORIGINAL LANGUAGE KEY</div>
                  <div className="text-xs sm:text-sm text-[#EDE7DC]">{activeEvidence.greekKey}</div>
                </div>
                <div>
                  <div className="label-caps text-[#E8913C] mb-1">PASTORAL EXEGESIS</div>
                  <p className="text-xs sm:text-sm text-[#9EA5A8] leading-relaxed">
                    {activeEvidence.commentary}
                  </p>
                </div>
                <div className="pt-2 hairline-t label-caps text-[#6C7378]">
                  CROSS-REFERENCES: {activeEvidence.crossReferences.join(' · ')}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5B: CONTACT US & DIRECT MINISTERIAL INBOX (Formcarry Integration)
        ====================================================================== */}
        <ContactSection motionOk={motionOk} />

        {/* =====================================================================
            SECTION 6: CLOSE & CROPPED FULL-WIDTH WORDMARK
        ====================================================================== */}
        <section className="relative bg-[#0A0C0E] hairline-t pt-20 overflow-hidden">
          <div className="max-w-[1380px] mx-auto px-6">
            {/* Final Call to Action Split Row with Illuminated Open Bible */}
            <motion.div
              initial={motionOk ? { opacity: 0, y: 40 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 hairline-b"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                  <span className="label-caps text-[#E8913C]">FINAL CALL TO ACTION</span>
                </div>
                <h2
                  className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-[1.06]"
                  style={{ fontSize: 'clamp(2rem, 4.2vw, 3.75rem)' }}
                >
                  TEST EVERY SPIRIT<span className="text-[#E8913C]">.</span>
                  <br />
                  STAND IN TRUTH<span className="text-[#2E6B72]">.</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#9EA5A8] max-w-lg leading-relaxed">
                  Return to Scripture. Examine the context. Seek truth with humility. Grounded in
                  Scripture. Guided by Truth. Led by Pastor Shahid Hanif.
                </p>
              </div>

              {/* Opposite Edge: Illuminated Open Bible Thumbnail + Two Buttons */}
              <div className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-6">
                <div className="w-44 h-28 overflow-hidden hairline-border bg-[#101317]">
                  <img
                    src="/assets/aistudio/cta_open_bible.png"
                    alt="Illuminated open Holy Bible"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-right"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePillarForModal(FEATURE_PILLARS[0]);
                      setStudyPlanModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border border-[#E8913C] label-caps text-[#E8913C] hover:text-[#EDE7DC] hover:border-[#EDE7DC] transition-colors cursor-pointer text-center justify-center flex items-center"
                  >
                    BEGIN YOUR SCRIPTURE STUDY
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('study-archive')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent hairline-border label-caps text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer text-center justify-center flex items-center"
                  >
                    EXPLORE ARCHIVE
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Hairline Footer Strip */}
            <div className="py-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/nav_cross_logo.png"
                  alt="Cross Emblem"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-5 w-auto object-contain opacity-80"
                />
                <span className="label-caps text-[#9EA5A8]">
                  GROUNDED IN SCRIPTURE · GUIDED BY TRUTH
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                {[
                  { label: 'Spiritual Goal', id: 'spiritual-goal' },
                  { label: 'Bible Studies', id: 'study-archive' },
                  { label: 'Scripture', id: 'scripture-evidence' },
                  { label: 'About', id: 'statement-fold' },
                  { label: 'Contact', id: 'contact' }
                ].map((nav) => (
                  <a
                    key={nav.label}
                    href={`#${nav.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(nav.id);
                    }}
                    className="label-caps text-[#6C7378] hover:text-[#E8913C] transition-colors whitespace-nowrap shrink-0"
                  >
                    {nav.label}
                  </a>
                ))}
              </div>

              <div className="label-caps text-[#6C7378]">
                PASTOR SHAHID HANIF
              </div>
            </div>

            {/* Copyright & Social Strip (Positioned directly above TEST THE SPIRIT text) */}
            <div className="py-5 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <p className="text-xs sm:text-sm text-[#9EA5A8] tracking-wide text-center sm:text-left">
                © 2024 - 2025. All Rights Reserved - Shahid Hanif | Test The Spirit
              </p>

              <div className="flex items-center gap-4">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@testthespirit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel Test the Spirit"
                  className="text-[#9EA5A8] hover:text-[#E8913C] hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/holy.zion1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page Holy Zion"
                  className="text-[#9EA5A8] hover:text-[#E8913C] hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/shahid.hanif777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile Shahid Hanif"
                  className="text-[#9EA5A8] hover:text-[#E8913C] hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@shahidhanif474/video/7544945748958285078"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Video Shahid Hanif"
                  className="text-[#9EA5A8] hover:text-[#E8913C] hover:scale-110 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Full-Width Wordmark Translated Down Slightly so the Page Edge Crops It */}
          <div
            aria-hidden="true"
            className="w-full overflow-hidden select-none pointer-events-none pt-2"
          >
            <motion.div
              initial={motionOk ? { y: '52%', opacity: 0.3 } : false}
              whileInView={{ y: '24%', opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne font-extrabold uppercase text-[#EDE7DC] text-center whitespace-nowrap leading-[0.82] tracking-[-0.035em] translate-y-[24%]"
              style={{ fontSize: 'clamp(3.2rem, 11.2vw, 11.5rem)' }}
            >
              TEST THE SPIRIT<span className="text-[#E8913C]">.</span>
            </motion.div>
          </div>
        </section>
      </main>


      {/* Interactive Study Guide & Berean Framework Modals */}
      <StudyReaderModal
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
        onSelectStudy={(nextStudy) => setSelectedStudy(nextStudy)}
      />

      <StudyPlanModal
        isOpen={studyPlanModalOpen}
        initialPillar={activePillarForModal}
        onClose={() => setStudyPlanModalOpen(false)}
        onOpenStudy={(study) => setSelectedStudy(study)}
      />
    </div>
  );
}
