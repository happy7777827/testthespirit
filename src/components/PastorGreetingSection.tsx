import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ExternalLink, MessageSquare, BookOpen, Sparkles, Check, Copy } from 'lucide-react';

interface PastorGreetingSectionProps {
  motionOk: boolean;
  onNavigateToContact?: () => void;
}

export const PastorGreetingSection: React.FC<PastorGreetingSectionProps> = ({
  motionOk,
  onNavigateToContact
}) => {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [copiedScripture, setCopiedScripture] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScripture(id);
    setTimeout(() => setCopiedScripture(null), 2200);
  };

  return (
    <>
      <section
        id="pastor-greeting"
        aria-label="Pastoral Address from Pastor Shahid Hanif"
        className="relative bg-[#0A0C0E] hairline-t py-24 sm:py-32 px-6 overflow-hidden"
      >
        {/* Subtle radial ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8913C]/5 blur-[140px] rounded-full select-none"
        />

        <div className="max-w-[1380px] mx-auto relative z-10">
          {/* Header Title Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 hairline-b">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
                <span className="label-caps text-[#E8913C]">
                  PASTORAL ADDRESS · SCRIPTURAL DISCERNMENT
                </span>
              </div>
              <h2
                className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-[1.06]"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
              >
                A Message from Pastor Shahid Hanif<span className="text-[#E8913C]">.</span>
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="label-caps text-[#2E6B72] block">
                BEREAN DISCERNMENT &amp; SCRIPTURAL TRUTH
              </span>
              <span className="text-xs text-[#9EA5A8] mt-1 block">
                Romans 7:14 · Colossians 2:16–17 · 1 Corinthians 5:7–8
              </span>
            </div>
          </div>

          {/* Main Grid: Poster Card on Left, Pastoral Speech & Theological Keynotes on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
            {/* Left: High-Impact Poster with interactive Zoom trigger */}
            <motion.div
              initial={motionOk ? { opacity: 0, x: -36 } : false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#101317] border border-[rgba(237,231,220,0.14)] shadow-[0_24px_50px_rgba(0,0,0,0.7)] group-hover:border-[#E8913C]/50 transition-all duration-500">
                <img
                  src="/assets/aistudio/Shalom_in_the_Messiah_Lecture_Poster_31435eb6.png"
                  alt="Pastor Shahid Hanif - Shalom in the Messiah poster"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out cursor-pointer"
                  onClick={() => setIsPosterModalOpen(true)}
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E]/85 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Badge Bar */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-[#EDE7DC]">
                  <div className="flex items-center gap-2 bg-[#0A0C0E]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[rgba(237,231,220,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                    <span className="font-syne font-semibold tracking-wide">PASTOR SHAHID HANIF</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPosterModalOpen(true)}
                    className="flex items-center gap-1.5 bg-[#E8913C] text-[#0A0C0E] hover:bg-[#ffaa5a] px-3 py-1.5 rounded font-syne font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                    aria-label="Enlarge Pastor Shahid Hanif poster"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Poster</span>
                  </button>
                </div>
              </div>

              {/* Caption under poster */}
              <p className="mt-3 text-xs text-[#6C7378] flex items-center justify-between px-1">
                <span>Lecture at the Pulpit · Karachi &amp; Global Berean Ministry</span>
                <span className="text-[#9EA5A8]">Click image to inspect lecture notes</span>
              </p>
            </motion.div>

            {/* Right: Direct Pastoral Speech & Spiritual Foundations */}
            <motion.div
              initial={motionOk ? { opacity: 0, x: 36 } : false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Spoken Greeting Banner */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8913C]">
                <div className="label-caps text-[#E8913C] mb-2">PASTOR SHAHID HANIF PROCLAIMS:</div>
                <div
                  className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.025em] leading-[1.08] select-none"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
                >
                  “Shalom in the Messiah<span className="text-[#E8913C]">.</span>”
                </div>
                <p className="mt-4 text-base sm:text-lg text-[#EDE7DC]/90 leading-relaxed font-normal">
                  May the divine peace (<span className="text-[#E8913C] font-semibold">שלום</span>),
                  truth, and supernatural righteousness of our Heavenly Father{' '}
                  <span className="text-[#EDE7DC] font-semibold">Elohim</span> and{' '}
                  <span className="text-[#EDE7DC] font-semibold">Messiah Yeshua</span> be upon
                  every humble disciple and seeker of truth.
                </p>
              </div>

              {/* Pastoral Exegesis & Theological Principles from the Lecture */}
              <div className="space-y-4">
                <div className="p-5 sm:p-6 bg-[#101317] border border-[rgba(237,231,220,0.1)] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E8913C]" />
                      <span className="font-syne font-bold text-sm tracking-wide text-[#EDE7DC]">
                        Torah Is Spiritual (Romans 7:14)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'Romans 7:14 - For we know that the law is spiritual: but I am carnal, sold under sin.',
                          'rom714'
                        )
                      }
                      className="text-[#9EA5A8] hover:text-[#E8913C] transition-colors p-1"
                      title="Copy verse reference"
                    >
                      {copiedScripture === 'rom714' ? (
                        <Check className="w-4 h-4 text-[#E8913C]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[#9EA5A8] leading-relaxed">
                    The Word and Law of Elohim is Holy, Righteous, Good, and Spiritual. We do not
                    rely on carnal human effort, but on the Holy Spirit of Elohim who indwells us to
                    fulfil the righteous requirements of God’s Word with purity of heart.
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-[#101317] border border-[rgba(237,231,220,0.1)] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#2E6B72]" />
                      <span className="font-syne font-bold text-sm tracking-wide text-[#EDE7DC]">
                        Appointed Times &amp; Shadows of the Messiah (Colossians 2:16–17)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'Colossians 2:16-17 - Let no one therefore judge you in eating or in drinking, or in respect of a feast or a new moon or Sabbaths which are a shadow of what is to come but the Body of the Messiah.',
                          'col2'
                        )
                      }
                      className="text-[#9EA5A8] hover:text-[#2E6B72] transition-colors p-1"
                      title="Copy verse reference"
                    >
                      {copiedScripture === 'col2' ? (
                        <Check className="w-4 h-4 text-[#2E6B72]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[#9EA5A8] leading-relaxed">
                    The biblical feasts—Passover &amp; Unleavened Bread, Shavuot (Pentecost), Succot
                    (Tabernacles), New Moons, and the holy Shabbat—are prophetic shadows pointing
                    directly to the reality found in Messiah Yeshua, our eternal Passover Lamb (1 Cor
                    5:7–8).
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://www.youtube.com/@testthespirit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E8913C] hover:bg-[#ffaa5a] text-[#0A0C0E] font-syne font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md hover:shadow-xl hover:translate-y-[-1px]"
                >
                  <span>Watch Pastor Shahid on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onNavigateToContact && (
                  <button
                    type="button"
                    onClick={onNavigateToContact}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-[#101317] text-[#EDE7DC] border border-[rgba(237,231,220,0.2)] hover:border-[#E8913C] font-syne font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#E8913C]" />
                    <span>Send Fellowship Message</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Modal to view the Full-Resolution Lecture Poster & Whiteboard Exegesis */}
      <AnimatePresence>
        {isPosterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setIsPosterModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[92vh] w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.18)] rounded-xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Topbar */}
              <div className="flex items-center justify-between px-6 py-4 hairline-b bg-[#101317]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E8913C]" />
                  <div>
                    <h3 className="font-syne font-bold text-sm text-[#EDE7DC]">
                      Pastor Shahid Hanif · “Shalom in the Messiah”
                    </h3>
                    <p className="text-[11px] text-[#9EA5A8]">
                      Pastor Shahid Hanif · Lecture Notes &amp; Biblical Feasts
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-[rgba(237,231,220,0.2)] flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Body with smooth scrolling */}
              <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#070809]">
                <img
                  src="/assets/aistudio/Shalom_in_the_Messiah_Lecture_Poster_31435eb6.png"
                  alt="Pastor Shahid Hanif - Full lecture poster with scripture exegesis"
                  className="max-h-[76vh] w-auto object-contain rounded shadow-lg"
                />
              </div>

              {/* Modal Footer with quick quote */}
              <div className="px-6 py-3 hairline-t bg-[#101317] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#9EA5A8]">
                <span>
                  <strong className="text-[#EDE7DC]">Colossians 2:16–17 &amp; Romans 7:14</strong> ·
                  Examine the Word with Berean diligence.
                </span>
                <a
                  href="/assets/aistudio/Shalom_in_the_Messiah_Lecture_Poster_31435eb6.png"
                  download="Pastor_Shahid_Hanif_Shalom_in_the_Messiah.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8913C] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open Full Size</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
