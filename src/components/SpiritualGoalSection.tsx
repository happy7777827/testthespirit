import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, BookOpen, Sparkles, ScrollText, ShieldCheck } from 'lucide-react';
import { StudyModule } from '../data/scriptureData';

interface SpiritualGoalSectionProps {
  motionOk: boolean;
  onOpenStudyGuide?: (study: StudyModule) => void;
  availableStudies?: StudyModule[];
}

interface GoalVerse {
  ref: string;
  category: 'Torah & Spirit' | 'Walk & Life' | 'Adoption & Glory';
  theme: string;
  text: string;
  exegesisNote: string;
}

const ROMANS_GOAL_VERSES: GoalVerse[] = [
  {
    ref: 'Rom 8:2',
    category: 'Torah & Spirit',
    theme: 'Freedom through Messiah Yeshua',
    text: 'For the law of the Spirit of life through Messiah Yeshua has set you free from the law of sin and death.',
    exegesisNote: 'The Spirit of life in Yeshua delivers the believer from the dominion of sin into supernatural liberty to walk in obedience.'
  },
  {
    ref: 'Rom 8:4',
    category: 'Torah & Spirit',
    theme: 'Fulfillment of the Torah',
    text: 'so that the requirement of the Torah might be fulfilled in us, who do not walk according to the flesh but according to the Spirit.',
    exegesisNote: 'Walking by the Spirit fulfills the righteous demands of God’s Word—not by fleshly striving, but through divine empowerment.'
  },
  {
    ref: 'Rom 8:13',
    category: 'Walk & Life',
    theme: 'Putting to Death the Deeds of the Body',
    text: 'For if you live according to the flesh, you must die; but if by the Spirit you put to death the deeds of the body, you shall live.',
    exegesisNote: 'Spiritual victory is active mortification of the carnal nature through the indwelling power of the Holy Spirit.'
  },
  {
    ref: 'Rom 8:14',
    category: 'Walk & Life',
    theme: 'Led by the Spirit of Elohim',
    text: 'For all who are led by the Spirit of Elohim, these are children of Elohim.',
    exegesisNote: 'The definitive mark of Elohim’s true sons and daughters is that they are continuously guided and governed by His Spirit.'
  },
  {
    ref: 'Rom 8:15',
    category: 'Adoption & Glory',
    theme: 'The Spirit of Adoption · Abba! Father!',
    text: 'For you did not receive the spirit of slavery to fall again into fear; rather, you received the Spirit of adoption, by whom we cry, “Abba! Father!”',
    exegesisNote: 'Freedom from the spirit of bondage and fear, sealed into the intimate family of God as beloved sons and daughters.'
  },
  {
    ref: 'Rom 8:16',
    category: 'Adoption & Glory',
    theme: 'The Inward Witness',
    text: 'The Spirit Himself bears witness with our spirit that we are children of Elohim.',
    exegesisNote: 'The divine testimony within our regenerated spirit confirming our eternal identity and kinship with the Heavenly Father.'
  },
  {
    ref: 'Rom 8:17',
    category: 'Adoption & Glory',
    theme: 'Co-Heirs with Messiah in Glory',
    text: 'And if children, also heirs—heirs of Elohim and co-heirs with Messiah—if indeed we suffer with Him so that we may also be glorified with Him.',
    exegesisNote: 'The eternal inheritance: reigning in unity with Yeshua, enduring present trials in the assurance of everlasting glory.'
  }
];

export const SpiritualGoalSection: React.FC<SpiritualGoalSectionProps> = ({
  motionOk,
  onOpenStudyGuide,
  availableStudies
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const filteredVerses =
    activeCategory === 'All'
      ? ROMANS_GOAL_VERSES
      : ROMANS_GOAL_VERSES.filter((v) => v.category === activeCategory);

  const handleCopy = (verse: GoalVerse) => {
    const textToCopy = `${verse.ref} — "${verse.text}"`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedRef(verse.ref);
      setTimeout(() => setCopiedRef(null), 2200);
    }
  };

  const holySpiritStudy = availableStudies?.find((s) => s.id === 'holy-spirit-in-scripture') || availableStudies?.[2];

  return (
    <section
      id="spiritual-goal"
      aria-label="Our Spiritual Goal"
      className="relative bg-[#0E1115] hairline-t py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Decorative Upright Circular Medallion watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-20 w-[420px] h-[420px] rounded-full overflow-hidden opacity-20 select-none hidden lg:block"
      >
        <img
          src="/assets/aistudio/cropped_circle_image__4__21809b77.png"
          alt="Spiritual Discernment Emblem"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-[1380px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={motionOk ? { opacity: 0, y: 36 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            <span className="label-caps text-[#E8913C]">
              DOCTRINAL FOUNDATION · ROMANS 7 &amp; 8 · UNITED IN ELOHIM
            </span>
          </div>

          <h2
            className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.85rem)' }}
          >
            OUR SPIRITUAL GOAL<span className="text-[#E8913C]">.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9EA5A8] leading-relaxed">
            Walking by the Spirit of our Heavenly Father Elohim to fulfill the righteous standard of His Word,
            standing as One United Spiritual Nation of Israel in Messiah Yeshua.
          </p>
        </motion.div>

        {/* Foundational Pillars: Two Editorial Master Statements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Statement 1: Oneness with the Father & the Son */}
          <motion.div
            initial={motionOk ? { opacity: 0, y: 32 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-[#0A0C0E] hairline-border p-8 sm:p-10 flex flex-col justify-between space-y-8 relative group hover:border-[#E8913C]/60 transition-colors"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="label-caps text-[#E8913C]">
                  PILLAR 01 · SPIRITUAL ONENESS
                </span>
                <span className="label-caps text-[#6C7378]">JOHN 17 &amp; EPHESIANS 4</span>
              </div>

              <blockquote className="font-syne font-bold text-xl sm:text-2xl text-[#EDE7DC] leading-snug tracking-[-0.015em]">
                “Our Spiritual goal is to grow together by the Spirit of our Heavenly Father Elohim (God) that we should become One/United with the Father and the Son and to be One/United Spiritual Nation of Israel.”
              </blockquote>
            </div>

            <div className="pt-6 hairline-t flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#9EA5A8]">
                Elohim (God)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#E8913C]">
                One with Father &amp; Son
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#2E6B72]">
                One Spiritual Nation of Israel
              </span>
            </div>
          </motion.div>

          {/* Statement 2: The Spirit of Elohim & The Law of Elohim */}
          <motion.div
            initial={motionOk ? { opacity: 0, y: 32 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-[#0A0C0E] hairline-border p-8 sm:p-10 flex flex-col justify-between space-y-8 relative group hover:border-[#2E6B72]/60 transition-colors"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="label-caps text-[#2E6B72]">
                  PILLAR 02 · RIGHTEOUSNESS &amp; THE LAW
                </span>
                <span className="label-caps text-[#6C7378]">ROMANS 7:12 &amp; 14</span>
              </div>

              <blockquote className="font-syne font-bold text-xl sm:text-2xl text-[#EDE7DC] leading-snug tracking-[-0.015em]">
                “Whosoever walks by the Spirit of Elohim will fulfil the righteous standards of the Law/Word of Elohim, because the Law is Holy, Righteous, Good and Spiritual (Romans 7:12 &amp; 14) and we need the Holy, Righteous and Good Spirit of Elohim to give us strength to live Word/Law of Elohim.”
              </blockquote>
            </div>

            <div className="pt-6 hairline-t flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#2E6B72]">
                Holy · Righteous · Good · Spiritual
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#9EA5A8]">
                Romans 7:12 &amp; 14
              </span>
              <span className="px-3 py-1 rounded-full bg-[#101317] border border-[rgba(237,231,220,0.13)] text-[11px] text-[#E8913C]">
                Strength to Live the Word
              </span>
            </div>
          </motion.div>
        </div>

        {/* Romans 8 Exegesis Track & Verses Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 hairline-b">
            <div>
              <div className="label-caps text-[#E8913C] mb-2">
                SCRIPTURAL WITNESS · ROMANS CHAPTER 8
              </div>
              <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#EDE7DC] tracking-[-0.02em]">
                The Law of the Spirit of Life
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {['All', 'Torah & Spirit', 'Walk & Life', 'Adoption & Glory'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full label-caps transition-colors cursor-pointer text-[10.5px] sm:text-xs min-h-[34px] flex items-center ${
                    activeCategory === cat
                      ? 'bg-[#E8913C] text-[#0A0C0E] font-bold'
                      : 'bg-[#0A0C0E] border border-[rgba(237,231,220,0.13)] text-[#9EA5A8] hover:text-[#EDE7DC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid for Romans 8:2, 8:4, 8:13, 8:14, 8:15, 8:16 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredVerses
              .filter((v) => v.ref !== 'Rom 8:17')
              .map((verse, idx) => {
                const isCopied = copiedRef === verse.ref;
                return (
                  <motion.div
                    key={verse.ref}
                    initial={motionOk ? { opacity: 0, y: 24 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.06,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="bg-[#0A0C0E] hairline-border p-5 sm:p-6 flex flex-col justify-between space-y-5 hover:border-[#E8913C]/40 transition-colors group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="label-caps font-bold text-[#E8913C]">
                          {verse.ref}
                        </span>
                        <span className="label-caps text-[#6C7378]">
                          {verse.category}
                        </span>
                      </div>

                      <div className="font-syne font-bold text-base text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors">
                        {verse.theme}
                      </div>

                      <p className="text-sm text-[#EDE7DC] leading-relaxed font-normal">
                        “{verse.text}”
                      </p>
                    </div>

                    <div className="pt-4 hairline-t space-y-3">
                      <p className="text-xs text-[#9EA5A8] leading-relaxed">
                        {verse.exegesisNote}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(verse)}
                          className="flex items-center gap-1.5 label-caps text-[#6C7378] hover:text-[#E8913C] transition-colors cursor-pointer min-h-[36px]"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#E8913C]" />
                              <span className="text-[#E8913C]">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>COPY VERSE</span>
                            </>
                          )}
                        </button>

                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Romans 8:17 Culmination Apex Card (Full-width prominence) */}
          {ROMANS_GOAL_VERSES.some((v) => v.ref === 'Rom 8:17') &&
            (activeCategory === 'All' || activeCategory === 'Adoption & Glory') && (
              <motion.div
                initial={motionOk ? { opacity: 0, y: 28 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-r from-[#0A0C0E] via-[#101317] to-[#0A0C0E] border border-[#E8913C]/50 p-6 sm:p-8 md:p-10 relative overflow-hidden"
              >
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#E8913C]/10 border border-[#E8913C] label-caps text-[#E8913C]">
                        ROMANS 8:17 · APEX PROMISE
                      </span>
                      <span className="label-caps text-[#2E6B72]">
                        CO-HEIRS WITH MESSIAH
                      </span>
                    </div>

                    <blockquote className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-[#EDE7DC] leading-snug">
                      “And if children, also heirs—heirs of Elohim and co-heirs with Messiah—if indeed we suffer with Him so that we may also be glorified with Him.”
                    </blockquote>

                    <p className="text-xs sm:text-sm text-[#9EA5A8] max-w-2xl leading-relaxed">
                      This is the summit of our spiritual walk: born of the Spirit, led by the Spirit, crying Abba Father,
                      walking in the righteous standards of Elohim’s Law, and standing as heirs of Elohim and co-heirs with Messiah.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 justify-center w-full">
                    <button
                      type="button"
                      onClick={() => handleCopy(ROMANS_GOAL_VERSES.find((v) => v.ref === 'Rom 8:17')!)}
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-transparent border border-[#E8913C] label-caps text-[#E8913C] hover:text-[#EDE7DC] hover:border-[#EDE7DC] transition-colors cursor-pointer text-center justify-center flex items-center gap-2"
                    >
                      {copiedRef === 'Rom 8:17' ? (
                        <>
                          <Check className="w-4 h-4 text-[#EDE7DC]" />
                          <span>COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPY ROMANS 8:17</span>
                        </>
                      )}
                    </button>

                    {holySpiritStudy && onOpenStudyGuide && (
                      <button
                        type="button"
                        onClick={() => onOpenStudyGuide(holySpiritStudy)}
                        className="w-full sm:w-auto px-5 py-3 rounded-full bg-transparent hairline-border label-caps text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer text-center justify-center flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-[#2E6B72]" />
                        <span>OPEN HOLY SPIRIT STUDY</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </section>
  );
};
