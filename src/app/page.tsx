"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Anchor,
  Lightbulb,
  Users,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Leaf,
  Handshake,
  UsersRound,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion, useReducedMotion, cubicBezier } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const seafoodItems = [
    {
      title: "Premium White Shrimp",
      image:
        "https://plus.unsplash.com/premium_photo-1738099524754-251c3c2d2b40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      title: "Peeled & Deveined",
      image:
        "https://plus.unsplash.com/premium_photo-1667115593089-17f5b6116217?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      title: "Crabs",
      image:
        "https://images.unsplash.com/photo-1550586554-a5a846e56593?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765",
    },
    {
      title: "Wild Salmon",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop",
    },
  ];

  const nextSlide = () =>
    setCarouselIndex((p) => (p + 1) % seafoodItems.length);
  const prevSlide = () =>
    setCarouselIndex(
      (p) => (p - 1 + seafoodItems.length) % seafoodItems.length
    );

  // Autoplay (pauses on hover / respects reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || isHoveringCarousel) return;
    const id = setInterval(nextSlide, 3500);
    return () => clearInterval(id);
  }, [prefersReducedMotion, isHoveringCarousel]);

  // Framer Motion variants (gentler, snappier)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: cubicBezier(0.2, 0.8, 0.2, 1) },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) prevSlide();
    if (delta < -threshold) nextSlide();
    touchStartX.current = null;
  };

  // Reusable smooth button props
  const btnHover = prefersReducedMotion ? {} : { scale: 1.03, y: -1.5 };
  const btnTap = prefersReducedMotion ? {} : { scale: 0.98, y: 0 };

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isHoveringCarousel) return;

    const id = setInterval(() => {
      // advance by one safely
      setCarouselIndex((i) => (i + 1) % seafoodItems.length);
    }, 7000);

    return () => clearInterval(id);
  }, [isHoveringCarousel, prefersReducedMotion, seafoodItems.length]);

  return (
    <div className="w-full bg-white text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section id="home" className="pt-16 relative">
        <div className="relative h-[88svh] min-h-[480px] lg:h-[92svh] overflow-hidden">
          <video
            autoPlay
            playsInline
            muted
            loop
            poster="/images/hero-poster.png"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            >
              Worldwide Quality & Service
            </motion.h1>

            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-medium bg-teal-500 text-white shadow-sm hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
                whileHover={btnHover}
                whileTap={btnTap}
              >
                Explore Products
              </motion.button>
              <motion.button
                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-medium bg-white text-teal-600 shadow-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
                whileHover={btnHover}
                whileTap={btnTap}
              >
                Get in Touch
              </motion.button>
            </motion.div>

            {!prefersReducedMotion && (
              <motion.div
                className="mt-10 flex gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                aria-hidden
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white/90"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Pioneering */}
      <section
        className="relative isolate px-4 py-14 sm:py-16 lg:py-32"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1616645728806-838c6bf184af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* soft white/blue tint like the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/92 to-sky-50/88" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left: title + copy with teal vertical rule */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative pl-6 sm:pl-8"
          >
            {/* teal rule */}
            <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-teal-500" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Pioneering the Future of
              <br className="hidden sm:block" /> Aquatic Excellence
            </h2>
            <p className="mt-5 max-w-md text-sm sm:text-[15px] leading-7 text-gray-600">
              At Seamark, we believe in a harmonious relationship between the
              ocean and our plates. Our commitment extends beyond premium
              seafood to sustainable practices and vibrant community support.
            </p>
          </motion.div>

          {/* Right: three feature rows with blue icons */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className=" h-12 w-12 text-sky-600">
                <Globe2 className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Global Sourcing, Local Impact
                </h3>
                <p className=" text-gray-600">
                  We responsibly source the finest seafood from around the
                  world, ensuring fair trade and supporting local fishing
                  communities wherever we operate.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className=" h-12 w-12 text-sky-600">
                <Leaf className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Unwavering Commitment to Sustainability
                </h3>
                <p className=" text-gray-600">
                  Our practices are guided by strict environmental standards,
                  from eco-friendly harvesting methods to reducing our carbon
                  footprint.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className=" h-12 w-12 text-sky-600">
                <Handshake className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Partnerships for a Better Tomorrow
                </h3>
                <p className="mt-1 text-gray-600">
                  We forge strong alliances with conservationists, scientists,
                  and industry leaders to champion ocean health and responsible
                  aquaculture.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      {/* ===== SM & MD: Single card with swipe hint ===== */}
      <div
        className="relative block lg:hidden"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative mt-6 mx-auto h-[420px] md:h-[480px] w-full">
          {(() => {
            const n = seafoodItems.length;
            if (n === 0) return null;
            const centerIdx = carouselIndex % n;
            const item = seafoodItems[centerIdx];

            return (
              <motion.div
                key={centerIdx}
                className="absolute left-1/2 top-1/2 w-[86vw] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl"
                style={{ transformStyle: "preserve-3d", zIndex: 10 }}
                animate={{ x: 0, rotateY: 0, scale: 1, z: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 28,
                  mass: 0.7,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-[420px] md:h-[480px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-white text-xl font-bold drop-shadow">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* Indicators */}
        <div className="mt-5 flex justify-center gap-2">
          {seafoodItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === carouselIndex
                  ? "w-8 bg-teal-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <p className="mt-2 mb-6 text-center text-sm text-muted-foreground">
          Swipe to see more
        </p>
      </div>

      {/* ===== LG+: Your original 3-card carousel ===== */}
      <div
        className="relative hidden lg:block"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => setIsHoveringCarousel(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative mt-8 mx-auto h-[420px] md:h-[480px] lg:h-[620px]"
          style={{ perspective: 1200 }}
        >
          {(() => {
            const n = seafoodItems.length;
            if (n === 0) return null;

            const centerIdx = carouselIndex % n;
            const leftIdx = (centerIdx - 1 + n) % n;
            const rightIdx = (centerIdx + 1) % n;

            const visible = [
              { idx: leftIdx, x: -300, rotY: 8, scale: 0.9, z: 0, zIndex: 90 },
              { idx: centerIdx, x: 0, rotY: 0, scale: 1, z: 120, zIndex: 100 },
              { idx: rightIdx, x: 300, rotY: -8, scale: 0.9, z: 0, zIndex: 90 },
            ];

            return visible.map(({ idx, x, rotY, scale, z, zIndex }) => {
              const item = seafoodItems[idx];
              return (
                <motion.div
                  key={idx}
                  className="absolute left-1/2 top-1/2 w-[70vw] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl"
                  style={{ transformStyle: "preserve-3d", zIndex }}
                  animate={{
                    x,
                    rotateY: rotY,
                    scale,
                    z: prefersReducedMotion ? 0 : z,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 28,
                    mass: 0.7,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-[420px] md:h-[480px] lg:h-[520px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-white text-2xl font-bold drop-shadow">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>

        {/* Controls (arrows) only for lg+ */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between mx-14">
          <motion.button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto ml-1 grid h-10 w-10 place-items-center rounded-full bg-teal-500/95 text-white shadow hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto mr-1 grid h-10 w-10 place-items-center rounded-full bg-teal-500/95 text-white shadow hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Indicators */}
        <motion.div
          className="mt-8 mb-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {seafoodItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === carouselIndex
                  ? "w-8 bg-teal-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Purpose */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden bg-cover bg-center bg-gray-100">
        {/* Soft Overlay for Readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Driven by Passion, Guided by Purpose
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            className="mx-auto max-w-2xl text-gray-700 text-base sm:text-lg leading-relaxed mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Seamark is more than a seafood company; we are a collective of ocean
            enthusiasts, sustainability advocates, and culinary innovators. Our
            journey began with a simple vision: to bring the highest quality,
            sustainably sourced seafood to every table.
          </motion.p>

          {/* Icons Row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { Icon: Anchor, label: "Heritage" },
              { Icon: Lightbulb, label: "Innovation" },
              { Icon: Handshake, label: "Integrity" },
              { Icon: Users, label: "Community" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <item.Icon size={46} className="text-teal-600" />
                </div>
                <h3 className="text-gray-900 font-semibold">{item.label}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.button
            variants={fadeInUp}
            whileHover={btnHover}
            whileTap={btnTap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white font-semibold shadow-sm hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer transition"
          >
            Discover Our Story
          </motion.button>
        </div>
      </section>

      {/* Community */}
      <section className="bg-gradient-to-b from-sky-200 to-teal-100 py-16 sm:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-10 sm:mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Cultivating a Thriving Ocean Community
          </motion.h2>

          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                Icon: Leaf,
                title: "Sustainability",
                desc: "Committed to eco-friendly practices that protect our oceans for future generations.",
              },
              {
                Icon: Handshake,
                title: "Partnerships",
                desc: "Collaborating with local communities and fishers to foster mutual growth and ethical sourcing.",
              },
              {
                Icon: UsersRound,
                title: "Empowerment",
                desc: "Supporting educational programs and initiatives that empower coastal communities.",
              },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 text-center shadow-sm ring-1 ring-slate-200"
                variants={itemVariants}
              >
                <div className="mb-4 flex items-center justify-center">
                  <Icon size={44} className="text-teal-600" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 max-w-prose mx-auto">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deep Dive gallery */}
      <section className="py-16 sm:py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl sm:text-4xl font-bold mb-10 sm:mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Dive Deeper into Seamark
          </motion.h2>

          <motion.div
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
            ].map((img, i) => (
              <motion.div
                key={i}
                className="h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg shadow-lg"
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              >
                <img
                  src={img}
                  alt="Gallery"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-700 px-4 pt-10 pb-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-8 md:grid-cols-5 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* --- Logo + About --- */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="/images/logo.png"
                  alt="Seamark"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  Seamark
                </span>
              </div>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                Pioneering the future of sustainable seafood for a healthier
                planet and thriving communities.
              </p>

              <div className="mt-4 flex gap-4 text-gray-500">
                <a href="#" className="hover:text-teal-600 transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="hover:text-teal-600 transition">
                  <Twitter size={18} />
                </a>
                <a href="#" className="hover:text-teal-600 transition">
                  <Instagram size={18} />
                </a>
                <a href="#" className="hover:text-teal-600 transition">
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>

            {/* --- Company --- */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Careers", "Our Story", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-teal-600 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* --- Products --- */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                {["Shrimp", "Crab", "Fish", "Seasonal"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-teal-600 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* --- Resources --- */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                {["Blog", "Sustainability", "Recipes", "FAQ"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-teal-600 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* --- Stay Updated --- */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-gray-900">Stay Updated</h4>
              {/* Placeholder content (could add newsletter input later) */}
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Seamark Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
