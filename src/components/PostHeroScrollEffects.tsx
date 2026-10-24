import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { StudyModule } from '../data/scriptureData';

interface ScrollKineticRibbonProps {
  scrollY: number;
  motionOk: boolean;
}

export function ScrollKineticRibbon({ scrollY, motionOk }: ScrollKineticRibbonProps) {
  const shiftLeft = motionOk ? -(scrollY * 0.18) % 900 : 0;
  const shiftRight = motionOk ? ((scrollY * 0.14) % 900) - 450 : 0;

  const itemsRow1 = [
    'PROVE ALL THINGS · 1 THESSALONIANS 5:21',
    'HOLD FAST THAT WHICH IS GOOD',
    'TRY THE SPIRITS WHETHER THEY ARE OF GOD · 1 JOHN 4:1',
    'SEARCH THE SCRIPTURES DAILY · ACTS 17:11',
    'ALL SCRIPTURE IS GIVEN BY INSPIRATION OF GOD · 2 TIMOTHY 3:16'
  ];

  return (
    <div className="relative z-20 bg-[#0A0C0E] hairline-y overflow-hidden py-3.5 select-none">
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        style={{
          transform: `translate3d(${shiftLeft.toFixed(1)}px, 0, 0)`
        }}
      >
        {[...itemsRow1, ...itemsRow1, ...itemsRow1].map((text, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="label-caps text-[#9EA5A8]">{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-10 whitespace-nowrap mt-2 pt-2 hairline-t will-change-transform"
        style={{
          transform: `translate3d(${shiftRight.toFixed(1)}px, 0, 0)`
        }}
      >
        {[...itemsRow1, ...itemsRow1, ...itemsRow1].map((text, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="font-syne font-bold text-xs tracking-tight text-[#EDE7DC]/70 uppercase">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScrollWordByWordStatementProps {
  motionOk: boolean;
}

const STATEMENT_WORDS: { text: string; highlight?: 'amber' | 'teal' }[] = [
  { text: '“Prove' },
  { text: 'all' },
  { text: 'things;' },
  { text: 'hold', highlight: 'amber' },
  { text: 'fast', highlight: 'amber' },
  { text: 'that', highlight: 'amber' },
  { text: 'which', highlight: 'amber' },
  { text: 'is', highlight: 'amber' },
  { text: 'good”', highlight: 'amber' },
  { text: '—' },
  { text: 'examine' },
  { text: 'every' },
  { text: 'teaching' },
  { text: 'by' },
  { text: 'the' },
  { text: 'written' },
  { text: 'Word,' },
  { text: 'search' },
  { text: 'biblical' },
  { text: 'context' },
  { text: 'daily,', highlight: 'teal' },
  { text: 'and' },
  { text: 'stand' },
  { text: 'unshaken' },
  { text: 'in' },
  { text: 'apostolic' },
  { text: 'truth.' }
];

export function ScrollWordByWordStatement({ motionOk }: ScrollWordByWordStatementProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'end 0.35']
  });

  return (
    <h2
      ref={containerRef}
      className="font-syne font-bold text-[#EDE7DC] leading-[1.14] tracking-[-0.025em] max-w-[24ch] flex flex-wrap gap-x-[0.28em] gap-y-1"
      style={{ fontSize: 'clamp(24px, 3.6vw, 52px)' }}
    >
      {STATEMENT_WORDS.map((wordObj, i) => {
        const start = i / STATEMENT_WORDS.length;
        const end = Math.min(1, start + 1.8 / STATEMENT_WORDS.length);
        return (
          <ScrubbedWord
            key={i}
            word={wordObj.text}
            highlight={wordObj.highlight}
            progress={scrollYProgress}
            range={[start, end]}
            motionOk={motionOk}
          />
        );
      })}
    </h2>
  );
}

function ScrubbedWord({
  word,
  highlight,
  progress,
  range,
  motionOk
}: {
  word: string;
  highlight?: 'amber' | 'teal';
  progress: any;
  range: [number, number];
  motionOk: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [12, 0]);

  const colorClass =
    highlight === 'amber'
      ? 'text-[#E8913C]'
      : highlight === 'teal'
      ? 'text-[#2E6B72]'
      : 'text-[#EDE7DC]';

  if (!motionOk) {
    return <span className={colorClass}>{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block will-change-transform ${colorClass}`}
    >
      {word}
    </motion.span>
  );
}

/**
 * Full-Viewport Horizontal Scroll Gallery Track for the 6 Study Archive Volumes
 * As the user scrolls vertically through this tall section, the 6 cards glide horizontally
 * across the sticky viewport stage.
 */
interface HorizontalScrollStudyTrackProps {
  studies: StudyModule[];
  onSelectStudy: (study: StudyModule) => void;
  motionOk: boolean;
}

export function HorizontalScrollStudyTrack({
  studies,
  onSelectStudy,
  motionOk
}: HorizontalScrollStudyTrackProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(1400);

  // Directly track viewport scroll metrics - 100% immune to mount race conditions or layout shifts
  useEffect(() => {
    const updateMetrics = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setScrollProgress(p);
      } else {
        setScrollProgress(0);
      }

      if (trackRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        // Glide far enough so the 6th card is completely framed with ample right padding
        const needed = Math.max(0, trackW - viewW + 140);
        setMaxTranslate(needed);
      }
    };

    window.addEventListener('scroll', updateMetrics, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });
    const raf = requestAnimationFrame(updateMetrics);

    return () => {
      window.removeEventListener('scroll', updateMetrics);
      window.removeEventListener('resize', updateMetrics);
      cancelAnimationFrame(raf);
    };
  }, [studies]);

  const activeIndex = Math.min(
    studies.length - 1,
    Math.max(0, Math.round(scrollProgress * (studies.length - 1)))
  );

  const scrollToVolume = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (idx / Math.max(1, studies.length - 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const advanceReel = (direction: 1 | -1) => {
    const nextIdx = Math.min(studies.length - 1, Math.max(0, activeIndex + direction));
    scrollToVolume(nextIdx);
  };

  if (!motionOk) {
    return (
      <div className="py-16 px-6 bg-[#0A0C0E] hairline-t">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study, idx) => (
            <div key={study.id} className="bg-[#101317] hairline-border p-5 flex flex-col justify-between">
              <img src={study.image} alt={study.title} className="w-full h-48 object-cover mb-4" />
              <div className="label-caps text-[#E8913C]">VOL. 0{idx + 1} · {study.keyVerseRef}</div>
              <h4 className="font-syne font-bold text-xl text-[#EDE7DC] mt-1">{study.title}</h4>
              <p className="text-xs text-[#9EA5A8] mt-2">{study.cardSnippet}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const translateX = -(scrollProgress * maxTranslate);

  return (
    <div ref={sectionRef} className="relative h-[280vh] bg-[#0A0C0E] hairline-t">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-6">
        {/* Top Stage Header */}
        <div className="w-full max-w-[1380px] mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <span className="label-caps text-[#E8913C]">
                HORIZONTAL SCROLL REEL · BIBLICAL STUDY ARCHIVE
              </span>
            </div>
            <h3
              className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-none"
              style={{ fontSize: 'clamp(1.75rem, 3.4vw, 3rem)' }}
            >
              THE SIX STUDY VOLUMES<span className="text-[#E8913C]">.</span>
            </h3>
          </div>

          {/* Steppers, Controls & Progress Indicator */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Quick volume jump pills */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#101317] p-1 rounded-full hairline-border">
              {studies.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToVolume(idx)}
                  className={`px-2.5 py-0.5 rounded-full label-caps text-[10px] transition-colors cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-[#E8913C] text-[#0A0C0E] font-bold'
                      : 'text-[#9EA5A8] hover:text-[#EDE7DC]'
                  }`}
                  title={`Jump to Volume 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next glide buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => advanceReel(-1)}
                disabled={activeIndex === 0}
                className="px-3 py-1 rounded-full bg-[#101317] hairline-border label-caps text-[10.5px] text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                title="Glide to previous study volume"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={() => advanceReel(1)}
                disabled={activeIndex === studies.length - 1}
                className="px-3 py-1 rounded-full bg-[#101317] hairline-border label-caps text-[10.5px] text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                title="Glide to next study volume"
              >
                NEXT →
              </button>
            </div>

            {/* Scroll Progress Bar */}
            <div className="flex items-center gap-2.5 pl-2">
              <span className="label-caps text-[#9EA5A8] text-[10px]">SCROLL TO GLIDE</span>
              <div className="w-28 sm:w-36 h-[2px] bg-[rgba(237,231,220,0.13)] relative overflow-hidden rounded-full">
                <div
                  style={{
                    width: `${Math.max(8, scrollProgress * 100)}%`,
                    transition: 'width 0.1s linear'
                  }}
                  className="h-full bg-[#E8913C]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div className="my-auto flex items-center overflow-hidden w-full">
          <div
            ref={trackRef}
            style={{
              transform: `translate3d(${translateX.toFixed(1)}px, 0, 0)`,
              willChange: 'transform',
              transition: 'transform 0.05s linear'
            }}
            className="flex items-stretch gap-7 pl-4 sm:pl-10"
          >
            {studies.map((study, index) => (
              <div
                key={study.id}
                onClick={() => onSelectStudy(study)}
                className="group w-[300px] sm:w-[390px] md:w-[410px] shrink-0 bg-[#101317] hairline-border hover:border-[#E8913C] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden rounded-sm drop-shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
              >
                {/* Top Bar */}
                <div className="px-5 py-3.5 hairline-b bg-[#0A0C0E] flex items-center justify-between">
                  <span className="label-caps text-[#E8913C]">
                    VOL. 0{index + 1} / 0{studies.length}
                  </span>
                  <span className="label-caps text-[#2E6B72]">{study.keyVerseRef}</span>
                </div>

                {/* Circular / Emblem Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#0A0C0E] flex items-center justify-center p-4">
                  <img
                    src={study.image}
                    alt={study.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Copy */}
                <div className="p-6 bg-[#0A0C0E] hairline-t flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="label-caps text-[#6C7378] mb-1">
                      {study.greekOrHebrewTerm.transliteration}
                    </div>
                    <h4 className="font-syne font-bold text-xl sm:text-2xl text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors">
                      {study.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#9EA5A8] mt-2 line-clamp-2 leading-relaxed">
                      {study.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 hairline-t flex items-center justify-between">
                    <span className="label-caps text-[#9EA5A8]">{study.category}</span>
                    <span className="label-caps text-[#E8913C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      OPEN STUDY GUIDE →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Caption */}
        <div className="w-full max-w-[1380px] mx-auto flex items-center justify-between pt-4 hairline-t">
          <span className="label-caps text-[#6C7378]">
            TEST THE SPIRIT · PASTOR SHAHID HANIF &amp; PASTOR SANDESH SHALOM
          </span>
          <span className="label-caps text-[#2E6B72]">
            CLICK ANY VOLUME CARD TO OPEN FULL EXEGESIS · USE CONTROLS OR SCROLL TO GLIDE
          </span>
        </div>
      </div>
    </div>
  );
}

export { HorizontalScrollStudyTrack as StickyStudyScrollCards };
