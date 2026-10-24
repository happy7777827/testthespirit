import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Mail, User, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  motionOk: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ motionOk }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Form action natively navigates to https://formcarry.com/s/kE8jbkrR_aB
  };

  return (
    <section
      id="contact"
      aria-label="Contact Us"
      className="relative bg-[#0A0C0E] hairline-t py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Decorative Upright Circle Emblem in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 w-[420px] h-[420px] rounded-full overflow-hidden opacity-15 select-none hidden lg:block"
      >
        <img
          src="/assets/aistudio/cropped_circle_image__5__dbeb9244.png"
          alt="Love for One Another Seal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-[1380px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Mission Message, YouTube Callout & Social Links */}
          <motion.div
            initial={motionOk ? { opacity: 0, y: 36 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span className="label-caps text-[#E8913C]">GET IN TOUCH · FELLOWSHIP IN TRUTH</span>
              </div>

              <h2
                className="font-syne font-extrabold text-[#EDE7DC] tracking-[-0.03em] leading-[1.08]"
                style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)' }}
              >
                Contact Us<span className="text-[#E8913C]">.</span>
              </h2>

              <p className="font-syne text-lg sm:text-xl text-[#EDE7DC] leading-snug font-semibold pt-1">
                Please get in touch and let us be united by the Spirit of Messiah!
              </p>

              <p className="text-sm sm:text-base text-[#9EA5A8] leading-relaxed">
                We would love to hear from you through your comments and emails. Whether you have
                biblical questions, prayer requests, or fellowship inquiries, reach out to us with
                a sincere heart seeking truth in Scripture.
              </p>
            </div>

            {/* YouTube Channel Highlight Box */}
            <div className="p-5 bg-[#101317] hairline-border space-y-2 border-l-2 border-l-[#E8913C]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E8913C]">
                <MessageSquare className="w-4 h-4" />
                <span className="label-caps">OFFICIAL YOUTUBE MINISTRY</span>
              </div>
              <p className="text-sm text-[#EDE7DC] leading-relaxed">
                The best place to catch us is on our YouTube Channel{' '}
                <a
                  href="https://www.youtube.com/@testthespirit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8913C] hover:text-[#EDE7DC] underline underline-offset-4 decoration-[#E8913C]/60 transition-colors font-semibold"
                >
                  “Test the Spirit”
                </a>
              </p>
              <p className="text-xs text-[#6C7378]">
                Led by Pastor Shahid Hanif &amp; Pastor Sandesh Shalom
              </p>
            </div>

            {/* Social Icons Strip (YouTube, Facebook, Instagram, TikTok) */}
            <div className="space-y-3 pt-2">
              <span className="label-caps text-[#6C7378] block">
                CONNECT ACROSS SOCIAL CHANNELS
              </span>
              <div className="flex items-center gap-3">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@testthespirit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel Test the Spirit"
                  className="w-11 h-11 rounded-full bg-[#101317] hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] hover:scale-105 transition-all cursor-pointer"
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
                  className="w-11 h-11 rounded-full bg-[#101317] hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] hover:scale-105 transition-all cursor-pointer"
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
                  className="w-11 h-11 rounded-full bg-[#101317] hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] hover:scale-105 transition-all cursor-pointer"
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
                  className="w-11 h-11 rounded-full bg-[#101317] hairline-border flex items-center justify-center text-[#EDE7DC] hover:text-[#E8913C] hover:border-[#E8913C] hover:scale-105 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Elegant Dark-Themed Form Container */}
          <motion.div
            initial={motionOk ? { opacity: 0, y: 36 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#101317] border border-[rgba(237,231,220,0.13)] rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
              {/* Subtle amber gradient halo in top-right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-[#E8913C]/10 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-6 mb-6 hairline-b">
                  <span className="label-caps text-[#E8913C]">
                    SEND A DIRECT MESSAGE
                  </span>
                  <span className="label-caps text-[#2E6B72]">
                    SECURE &amp; CONFIDENTIAL
                  </span>
                </div>

                {/* Form submitting directly to Formcarry link requested by user */}
                <form
                  action="https://formcarry.com/s/kE8jbkrR_aB"
                  method="POST"
                  acceptCharset="UTF-8"
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Name Row (First name & Last name) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="form-first-name"
                        className="block label-caps text-[#EDE7DC]"
                      >
                        First name:
                      </label>
                      <div className="relative">
                        <input
                          id="form-first-name"
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Shelomi"
                          required
                          className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.18)] focus:border-[#E8913C] rounded-lg px-4 py-3 text-base sm:text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="form-last-name"
                        className="block label-caps text-[#EDE7DC]"
                      >
                        Last name:
                      </label>
                      <div className="relative">
                        <input
                          id="form-last-name"
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Ben Abraham"
                          required
                          className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.18)] focus:border-[#E8913C] rounded-lg px-4 py-3 text-base sm:text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="form-email"
                      className="block label-caps text-[#EDE7DC]"
                    >
                      Your email address:
                    </label>
                    <div className="relative">
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="shelomi@domain.com"
                        required
                        className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.18)] focus:border-[#E8913C] rounded-lg px-4 py-3 text-base sm:text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="form-message"
                      className="block label-caps text-[#EDE7DC]"
                    >
                      Message:
                    </label>
                    <div className="relative">
                      <textarea
                        id="form-message"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here..."
                        required
                        className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.18)] focus:border-[#E8913C] rounded-lg px-4 py-3 text-base sm:text-sm text-[#EDE7DC] placeholder-[#6C7378] focus:outline-none transition-colors resize-y min-h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-lg bg-[#E8913C] hover:bg-[#d8822e] text-[#0A0C0E] font-syne font-bold text-base tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(232,145,60,0.35)] hover:shadow-[0_6px_25px_rgba(232,145,60,0.5)] active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4 fill-current" />
                      <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#6C7378] text-center pt-1">
                    Protected by Formcarry. Submissions are delivered directly to the ministry inbox.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
