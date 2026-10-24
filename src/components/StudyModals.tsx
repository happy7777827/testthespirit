import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { StudyModule, FeaturePillar, FEATURE_PILLARS, STUDY_ARCHIVE } from '../data/scriptureData';

interface StudyReaderModalProps {
  study: StudyModule | null;
  onClose: () => void;
  onSelectStudy: (study: StudyModule) => void;
}

export function StudyReaderModal({ study, onClose, onSelectStudy }: StudyReaderModalProps) {
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});

  if (!study) return null;

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0C0E]/90 backdrop-blur-md p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#101317] hairline-border my-8 text-[#EDE7DC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative h-56 overflow-hidden hairline-b bg-[#0A0C0E]">
          <img
            src={study.image}
            alt={study.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-55"
          />

          <button
            onClick={onClose}
            aria-label="Close study guide"
            className="absolute top-4 right-4 w-9 h-9 bg-[#0A0C0E]/85 hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 bg-[#0A0C0E]/85 p-4 hairline-border">
            <div className="label-caps text-[#E8913C] mb-1">
              BIBLICAL STUDY ARCHIVE · {study.category} · {study.keyVerseRef}
            </div>
            <h2
              id="study-modal-title"
              className="font-syne font-bold text-2xl sm:text-3xl text-[#EDE7DC]"
            >
              {study.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#9EA5A8] mt-1">{study.subtitle}</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
          {/* Foundational Scripture Box */}
          <div className="bg-[#0A0C0E] p-5 border border-[#E8913C]">
            <div className="label-caps text-[#E8913C] mb-2">
              FOUNDATIONAL SCRIPTURE ({study.keyVerseRef} · KJV)
            </div>
            <blockquote className="text-sm sm:text-base leading-relaxed text-[#EDE7DC]">
              “{study.keyVerseKJV}”
            </blockquote>
          </div>

          {/* Original Biblical Language Word Study */}
          <div className="bg-[#0A0C0E] hairline-border p-5">
            <div className="label-caps text-[#2E6B72] mb-1.5">
              BIBLICAL LEXICAL INSIGHT
            </div>
            <div className="font-syne font-bold text-lg text-[#EDE7DC]">
              {study.greekOrHebrewTerm.transliteration}
            </div>
            <p className="text-xs sm:text-sm text-[#9EA5A8] mt-1.5 leading-relaxed">
              {study.greekOrHebrewTerm.meaning}
            </p>
          </div>

          {/* Historical & Covenantal Context */}
          <div>
            <h3 className="label-caps text-[#E8913C] mb-2">
              01 · HISTORICAL &amp; SCRIPTURAL CONTEXT
            </h3>
            <p className="text-sm text-[#9EA5A8] leading-relaxed">
              {study.historicalContext}
            </p>
          </div>

          {/* Exegetical Takeaways */}
          <div>
            <h3 className="label-caps text-[#E8913C] mb-3">
              02 · CORE PRINCIPLES OF EXEGESIS
            </h3>
            <ul className="space-y-2.5">
              {study.exegesisPoints.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[#EDE7DC] leading-relaxed"
                >
                  <span className="font-syne font-bold text-[#E8913C] shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-[#9EA5A8]">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Berean Self-Examination Checklist */}
          <div className="bg-[#0A0C0E] hairline-border p-5">
            <h3 className="label-caps text-[#E8913C] mb-1">
              03 · BEREAN DISCERNMENT EXAMINATION
            </h3>
            <p className="text-xs text-[#6C7378] mb-3">
              Select each scriptural criterion as you weigh a teaching or message:
            </p>
            <div className="space-y-2">
              {study.discernmentQuestions.map((q, idx) => {
                const isChecked = !!checkedQuestions[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleQuestion(idx)}
                    className={`w-full text-left flex items-start gap-3 p-3 border transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-[#101317] border-[#E8913C] text-[#EDE7DC]'
                        : 'bg-[#101317] border-[rgba(237,231,220,0.13)] text-[#9EA5A8] hover:border-[#2E6B72]'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isChecked ? 'text-[#E8913C]' : 'text-[#6C7378]'
                      }`}
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">{q}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pastoral Note */}
          <div className="hairline-y py-4">
            <p className="text-xs sm:text-sm text-[#9EA5A8] leading-relaxed">
              “{study.pastoralNote}”
            </p>
          </div>

          {/* Related Studies Navigation */}
          <div className="pt-1">
            <div className="label-caps text-[#6C7378] mb-3">
              CONTINUE EXPLORING THE ARCHIVE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_ARCHIVE.filter((s) => s.id !== study.id)
                .slice(0, 2)
                .map((nextStudy) => (
                  <button
                    key={nextStudy.id}
                    type="button"
                    onClick={() => {
                      setCheckedQuestions({});
                      onSelectStudy(nextStudy);
                    }}
                    className="flex items-center justify-between p-3.5 bg-[#0A0C0E] hairline-border hover:border-[#E8913C] text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-syne font-bold text-sm text-[#EDE7DC]">
                        {nextStudy.title}
                      </div>
                      <div className="label-caps text-[#E8913C] mt-1">{nextStudy.keyVerseRef}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#E8913C] shrink-0" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StudyPlanModalProps {
  isOpen: boolean;
  initialPillar?: FeaturePillar | null;
  onClose: () => void;
  onOpenStudy: (study: StudyModule) => void;
}

export function StudyPlanModal({
  isOpen,
  initialPillar,
  onClose,
  onOpenStudy
}: StudyPlanModalProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    initialPillar?.id || FEATURE_PILLARS[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const activePillar =
    FEATURE_PILLARS.find((p) => p.id === selectedPillarId) || FEATURE_PILLARS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@')) {
      setFormError('Please provide your name and a valid email address.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0C0E]/90 backdrop-blur-md p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workbook-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#101317] hairline-border my-8 text-[#EDE7DC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 hairline-b bg-[#0A0C0E]">
          <div>
            <div className="label-caps text-[#E8913C]">
              BEREAN DISCERNMENT FRAMEWORK
            </div>
            <h2 id="workbook-modal-title" className="font-syne font-bold text-xl sm:text-2xl text-[#EDE7DC] mt-0.5">
              Begin Your Scripture Study.
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 bg-[#101317] hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[74vh] overflow-y-auto">
          {/* Interactive Pillar Selector */}
          <div>
            <div className="label-caps text-[#6C7378] mb-2.5">
              THREE FEATURE PILLARS OF DISCERNMENT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {FEATURE_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`p-3.5 border text-left transition-colors cursor-pointer ${
                    activePillar.id === pillar.id
                      ? 'bg-[#0A0C0E] border-[#E8913C] text-[#EDE7DC]'
                      : 'bg-[#0A0C0E] border-[rgba(237,231,220,0.13)] text-[#9EA5A8] hover:border-[#2E6B72]'
                  }`}
                >
                  <div className="font-syne font-bold text-xs tracking-tight text-[#EDE7DC]">
                    {pillar.title}
                  </div>
                  <div className="label-caps text-[#E8913C] mt-1">{pillar.scriptureAnchor}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Pillar Details */}
          <div className="bg-[#0A0C0E] hairline-border p-5 space-y-4">
            <div className="hairline-b pb-3">
              <div className="label-caps text-[#2E6B72]">
                {activePillar.scriptureAnchor} · KJV
              </div>
              <p className="text-sm sm:text-base text-[#EDE7DC] mt-1 leading-relaxed">
                “{activePillar.scriptureQuote}”
              </p>
            </div>
            <div className="space-y-3">
              {activePillar.principles.map((p, idx) => (
                <div key={idx} className="text-sm">
                  <div className="font-syne font-bold text-[#EDE7DC]">
                    <span className="text-[#E8913C] mr-2">0{idx + 1}</span>
                    {p.heading}
                  </div>
                  <p className="text-xs sm:text-sm text-[#9EA5A8] mt-1 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump to Study Archive */}
          <div>
            <div className="label-caps text-[#6C7378] mb-2.5">
              SELECT A STUDY ARCHIVE VOLUME
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {STUDY_ARCHIVE.slice(0, 3).map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenStudy(mod);
                  }}
                  className="p-3.5 bg-[#0A0C0E] hairline-border hover:border-[#E8913C] text-left transition-colors cursor-pointer"
                >
                  <div className="font-syne font-bold text-xs text-[#EDE7DC]">{mod.title}</div>
                  <div className="label-caps text-[#E8913C] mt-1.5">
                    READ VOLUME →
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Biblical Question */}
          <div className="hairline-t pt-5">
            <h3 className="font-syne font-bold text-base text-[#EDE7DC] mb-1">
              Submit a Scripture Question or Request Study Notes
            </h3>
            <p className="text-xs text-[#6C7378] mb-4">
              Led by Pastor Shahid Hanif &amp; Pastor Sandesh Shalom · Grounded in Scripture. Guided by Truth.
            </p>

            {submitted ? (
              <div className="p-4 bg-[#0A0C0E] border border-[#E8913C] text-sm text-[#EDE7DC]">
                <div className="font-syne font-bold text-[#E8913C] mb-1">
                  Received — Thank You, {fullName}
                </div>
                <p className="text-xs sm:text-sm text-[#9EA5A8]">
                  Your Scripture study inquiry has been registered. Search the Scriptures daily, whether those things are so (Acts 17:11).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block label-caps text-[#9EA5A8] mb-1.5">YOUR NAME</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2 bg-[#0A0C0E] hairline-border text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>
                  <div>
                    <label className="block label-caps text-[#9EA5A8] mb-1.5">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2 bg-[#0A0C0E] hairline-border text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block label-caps text-[#9EA5A8] mb-1.5">
                    SCRIPTURE REFERENCE OR QUESTION (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="e.g., 1 John 4:1 — How do we test every teaching by Scripture?"
                    className="w-full px-3.5 py-2 bg-[#0A0C0E] hairline-border text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
                {formError && <p className="text-xs text-[#E8913C]">{formError}</p>}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-transparent border border-[#E8913C] text-[#E8913C] label-caps font-semibold hover:text-[#EDE7DC] hover:border-[#EDE7DC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  SUBMIT STUDY REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
