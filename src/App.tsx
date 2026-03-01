/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Lock,
  Star,
  Users,
  Globe,
  Calendar,
  BarChart3,
  Map,
  Search,
  Palette,
  Rocket,
  RefreshCw,
  ArrowRight,
  Package,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Menu,
  X,
} from "lucide-react";

import { TestimonialsColumn } from "./components/ui/testimonials-columns-1";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
};

/**
 * Statically defined testimonials representing success stories of previous mentorings.
 * Uses curated images and authentic-sounding roles for strong social proof.
 */
const testimonials = [
  {
    text: "A mentoria do Lau foi o divisor de águas. Saí de um cargo pleno para uma posição de Lead em uma empresa americana com 40% de aumento.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    name: "Beatriz Silva",
    role: "Lead Product Designer",
  },
  {
    text: "O foco em autoridade de negócio mudou minha forma de apresentar cases. Hoje sou visto como parceiro estratégico, não apenas o executor.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    name: "Ricardo Mendes",
    role: "Senior Product Designer",
  },
  {
    text: "Consegui minha primeira vaga internacional em menos de 3 meses seguindo o Roadmap de Autoridade. O UX Samurai é realmente elite.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    name: "Juliana Costa",
    role: "Staff Designer @ US Tech",
  },
  {
    text: "A visão do Lau sobre o mercado global é única. Ele não ensina a desenhar telas, ele ensina a dominar o jogo corporativo de alto nível.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    name: "Felipe Almeida",
    role: "Design Manager",
  },
  {
    text: "Minha remuneração saltou 60% após aplicar as estratégias de posicionamento da mentoria. O retorno sobre o investimento foi imediato.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    name: "Mariana Rocha",
    role: "Senior UX Designer",
  },
  {
    text: "A metodologia IAM me deu clareza sobre minha própria marca. Parei de ser um designer genérico para me tornar um especialista disputado.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    name: "Gustavo Pires",
    role: "Product Design Lead",
  },
  {
    text: "O acesso aos AI Agents otimizou meu processo em 10x. Mas o real valor está na mentalidade de samurai que o Lau transmite.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    name: "Camila Duarte",
    role: "Senior Product Designer",
  },
  {
    text: "Finalmente entendi como falar a língua do negócio. Meus stakeholders agora confiam plenamente nas minhas decisões estratégicas.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    name: "Thiago Oliveira",
    role: "UX Strategy Lead",
  },
  {
    text: "Se você quer sair da média e entrar no top 1% dos designers, não existe outro caminho. O UX Samurai é o padrão ouro.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    name: "Ana Paula",
    role: "Senior Product Designer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

/**
 * Main Application Component
 * 
 * Orchestrates the primary landing page for the UX Samurai platform. 
 * Includes distinct sections for Hero, About, Methodology, Testimonials, FAQ, and Application Form.
 * Implements scroll-spy logic for adaptive navigation visibility against light/dark sections.
 */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [isOnDark, setIsOnDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Detect if header overlaps a dark section
  useEffect(() => {
    const checkBackground = () => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const navMidY = navRect.top + navRect.height / 2;
      const navMidX = navRect.left + navRect.width / 2;
      const prevVis = navRef.current.style.visibility;
      navRef.current.style.visibility = "hidden";
      const el = document.elementFromPoint(navMidX, navMidY);
      navRef.current.style.visibility = prevVis;
      if (el) {
        let current: Element | null = el;
        let dark = false;
        while (current && current !== document.body) {
          const bg = window.getComputedStyle(current).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            const match = bg.match(/\\d+/g);
            if (match) {
              const [r, g, b] = match.map(Number);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              if (luminance < 0.3) dark = true;
              break;
            }
          }
          current = current.parentElement;
        }
        setIsOnDark(dark);
      }
    };
    checkBackground();
    window.addEventListener("scroll", checkBackground, { passive: true });
    window.addEventListener("resize", checkBackground, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const form = document.getElementById("application-form");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white overflow-x-hidden">
      <header>
        {/* Navigation */}
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
          <nav
            ref={navRef}
            className={`w-full max-w-7xl rounded-2xl shadow-lg border transition-all duration-500 ${
              isOnDark
                ? "nav-glass-dark border-white/10 text-white"
                : "nav-glass-light border-black/5 text-brand-ink"
            }`}
            aria-label="Navegação principal"
          >
            <div className="px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src="/images/ux-samurai-logo.png"
                  alt="UX Samurai Logo"
                  className="h-9 w-auto transition-all duration-500"
                  style={{
                    filter: isOnDark
                      ? "brightness(0) invert(1)"
                      : "brightness(0)",
                  }}
                />
                <span
                  className={`font-display text-lg tracking-wide select-none transition-colors duration-500 ${
                    isOnDark ? "text-white" : "text-brand-ink"
                  }`}
                >
                  UX Samurai
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-widest">
                <a
                  href="#"
                  className={`hover:text-brand-red transition-colors duration-200 focus-ring rounded-sm cursor-pointer ${
                    isOnDark ? "text-white/80" : ""
                  }`}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className={`hover:text-brand-red transition-colors duration-200 focus-ring rounded-sm cursor-pointer ${
                    isOnDark ? "text-white/80" : ""
                  }`}
                >
                  Sobre
                </a>
                <a
                  href="#process"
                  className={`hover:text-brand-red transition-colors duration-200 focus-ring rounded-sm cursor-pointer ${
                    isOnDark ? "text-white/80" : ""
                  }`}
                >
                  Processo
                </a>
                <button
                  onClick={scrollToForm}
                  className="samurai-button py-2 px-6 text-xs focus-ring cursor-pointer"
                  aria-label="Aplicar para a sessão estratégica"
                >
                  Aplicar Agora
                </button>
              </div>

              <button
                className="md:hidden p-2 focus-ring rounded-lg cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-40 bg-brand-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center text-xl font-display">
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="focus-ring rounded-lg"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="focus-ring rounded-lg"
              >
                Sobre
              </a>
              <a
                href="#process"
                onClick={() => setIsMenuOpen(false)}
                className="focus-ring rounded-lg"
              >
                Processo
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToForm();
                }}
                className="samurai-button focus-ring"
              >
                Aplicar Agora
              </button>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        {/*
         * Hero uses CSS background-image on .hero-section (see index.css)
         * background-position: bottom center preserves mountain in lower third
         * ::before pseudo-element adds subtle radial overlay for text readability
         * ::after adds bottom fade for seamless transition to next section
         */}
        <section
          className="hero-section relative flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          {/* Top gradient for nav readability */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-brand-cream/50 to-transparent z-[2] pointer-events-none" />

          {/* Floating Petals */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 800 - 400,
                y: -100,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 0.6, 0.6, 0],
                y: 800,
                x: Math.random() * 600 - 300 + 100,
                rotate: 360,
              }}
              transition={{
                duration: 14 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
              className="absolute w-3 h-3 bg-brand-red/10 rounded-full blur-[2px] pointer-events-none z-20"
              aria-hidden="true"
              style={{
                borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
              }}
            />
          ))}

          {/* Centered Hero Content */}
          <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-32 md:pt-28 md:pb-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto px-6"
            >
              {/* Headline  serif display font for editorial premium feel */}
              <h1
                id="hero-title"
                className="text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display leading-[1.1] mb-8"
                style={{ textShadow: "0 1px 8px rgba(245,242,237,0.8)" }}
              >
                DOMINE O MERCADO E ESCALE SUA CARREIRA COMO{" "}
                <span className="text-brand-red">PRODUCT DESIGNER ELITE.</span>
              </h1>

              {/* Subheadline  sans-serif, muted */}
              <p
                className="text-base md:text-lg text-brand-ink/65 mb-10 max-w-3xl mx-auto leading-relaxed font-sans"
                style={{ textShadow: "0 1px 6px rgba(245,242,237,0.9)" }}
              >
                Pare de aceitar a estagnação. Desbloqueie sua próxima promoção
                ou transição internacional com uma mentoria estratégica
                desenhada para quem busca o topo.
              </p>

              {/* CTA Button */}
              <button
                onClick={scrollToForm}
                className="samurai-button text-base group px-8 py-4"
              >
                RESERVAR SESSÃO ESTRATÉGICA
                <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Social Proof  below CTA for post-decision validation */}
              <div className="hero-social-proof">
                {/* Avatar Stack */}
                <div className="avatar-stack">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/mentor${i}/100/100`}
                      alt="Mentorado"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>

                {/* Stars  muted gold */}
                <div className="social-proof-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Text */}
                <p className="social-proof-text">
                  +1.800 mentorados em +20 países
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                O Perfil
              </span>
              <h2 className="text-3xl md:text-5xl mb-6 uppercase">
                A SESSÃO ESTRATÉGICA É PARA VOCÊ QUE:
              </h2>
              <div className="w-24 h-1 bg-brand-red mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Designer Pleno",
                  subtitle:
                    "Quer avançar para o próximo nível de carreira e remuneração",
                  desc: "Desbloqueie seu potencial, identifique oportunidades únicas e trace um caminho claro para se tornar Sênior.",
                },
                {
                  title: "Designer Sênior",
                  subtitle:
                    "Quer ter segurança para trabalhar sem se preocupar com demissões",
                  desc: "Fortaleça sua posição no mercado, diversifique suas habilidades e construa uma rede profissional sólida.",
                },
                {
                  title: "Líder de Design",
                  subtitle:
                    "Quer ser um profissional requisitado e de referência para o mercado",
                  desc: "Aprimore suas habilidades de liderança, construa sua marca pessoal e atraia oportunidades de alto nível.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-brand-red" size={32} />
                  </div>
                  <h3 className="text-2xl mb-2 font-sans font-bold">
                    {item.title}
                  </h3>
                  <p className="font-bold text-brand-red mb-4 text-sm uppercase tracking-wider">
                    {item.subtitle}
                  </p>
                  <p className="text-black/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={scrollToForm}
                className="samurai-button px-12 cursor-pointer"
              >
                É EXATAMENTE O QUE PRECISO. QUERO APLICAR AGORA!
              </button>
            </div>
          </div>
        </section>

        {/* Insight Banner */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://picsum.photos/seed/lantern/1920/1080"
              alt="Lanterna japonesa decorativa"
              loading="lazy"
              className="w-full h-full object-cover brightness-50"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-6xl text-white max-w-4xl leading-tight"
            >
              BASTA UM{" "}
              <span className="underline decoration-brand-red underline-offset-8">
                INSIGHT
              </span>{" "}
              PARA MUDAR TOTALMENTE O RUMO DE SUA CARREIRA
            </motion.h2>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                A Entrega
              </span>
              <h2 className="text-3xl md:text-5xl mb-6">
                TRANSFORMAÇÃO EM 45 MINUTOS
              </h2>
              <p className="text-black/50 uppercase tracking-[0.2em] text-sm font-bold">
                O que você leva dessa imersão estratégica
              </p>
              <div className="w-24 h-1 bg-brand-red mx-auto mt-6" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Arquitetura de Remuneração",
                  desc: "Estratégias de negociação e posicionamento para saltar de faixa salarial e atrair propostas de alto valor.",
                  icon: <BarChart3 className="text-brand-red" size={32} />,
                  img: "/images/img2.jpg",
                },
                {
                  title: "Blindagem de Carreira",
                  desc: "Como se tornar indispensável em cenários de incerteza, transformando senioridade técnica em autoridade de negócio.",
                  icon: <CheckCircle2 className="text-brand-red" size={32} />,
                  img: "/images/img1.jpg",
                },
                {
                  title: "Roadmap de Autoridade",
                  desc: "Um plano tático de 12 meses para consolidar sua marca pessoal e ser disputado pelas melhores empresas do mundo.",
                  icon: <Map className="text-brand-red" size={32} />,
                  img: "/images/img3.jpg",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="samurai-card group"
                >
                  <div className="rounded-xl overflow-hidden mb-6 aspect-[4/3]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl mb-4 font-sans font-bold">
                    {item.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="mt-20 text-center max-w-3xl mx-auto"
            >
              <p className="text-lg mb-8 italic text-black/70">
                "A maioria dos designers espera a oportunidade chegar. Os
                samurais do design criam o seu próprio caminho. Se você busca o
                topo, sua evolução começa agora."
              </p>
              <button
                onClick={scrollToForm}
                className="samurai-button px-12 cursor-pointer"
              >
                SOLICITAR MINHA VAGA NA SESSÃO ESTRATÉGICA
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section Redesign */}
        <section
          id="about"
          className="relative py-32 px-6 bg-brand-ink text-white overflow-hidden"
          aria-labelledby="about-title"
        >
          <div className="absolute inset-0 samurai-grid-pattern pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Image Column */}
              <motion.div
                {...fadeInUp}
                className="lg:col-span-5 relative group"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <img
                    src="/images/lau-mentor.png"
                    alt="Lau Yamazaki - Mentor de Carreira UX"
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-transparent opacity-60" />
                </div>

                {/* Decorative Name Rail */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block">
                  <span className="vertical-text text-brand-red font-display text-4xl opacity-20 select-none">
                    LAU YAMAZAKI
                  </span>
                </div>

                {/* Social Links Overlay */}
                <div className="absolute bottom-8 left-8 flex gap-4">
                  {[
                    {
                      icon: <Linkedin size={20} />,
                      label: "LinkedIn",
                      href: "#",
                    },
                    {
                      icon: <Instagram size={20} />,
                      label: "Instagram",
                      href: "#",
                    },
                    {
                      icon: <Youtube size={20} />,
                      label: "YouTube",
                      href: "#",
                    },
                    {
                      icon: <Twitter size={20} />,
                      label: "Twitter",
                      href: "#",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-200 focus-ring cursor-pointer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div {...fadeInUp} className="lg:col-span-7">
                <header className="mb-12">
                  <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                    O Mentor
                  </span>
                  <h2
                    id="about-title"
                    className="text-4xl md:text-6xl mb-8 leading-tight"
                  >
                    OLÁ, SOU{" "}
                    <span className="text-brand-red">LAU YAMAZAKI!</span>
                  </h2>
                  <p className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white/90 leading-snug">
                    ARQUITETO DE IDENTIDADES AUTÊNTICAS & FOUNDER DA NOMAD LABS
                  </p>
                </header>

                <div className="space-y-8">
                  <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                    Mentor de designers que buscam o topo. Com 30 anos de
                    experiência em mercados globais, ajudo profissionais
                    seniores a destravarem autoridade de negócio e remuneração
                    de elite.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-brand-red font-bold uppercase text-xs tracking-widest">
                        Experiência Global
                      </h4>
                      <ul className="space-y-3 text-sm text-white/60">
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Senior UX na Rivian – US
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Lead Designer na Devready – US
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          UX Lead na Viasat – US
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Product Lead na NTT Data – JP
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-brand-red font-bold uppercase text-xs tracking-widest">
                        Liderança & Mentoria
                      </h4>
                      <ul className="space-y-3 text-sm text-white/60">
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Founder da Nomad Labs
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Continent Manager IxDF
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          Criador Metodologia IAM
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2
                            size={16}
                            className="text-brand-red shrink-0"
                          />{" "}
                          +700 Projetos Globais
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-wrap gap-8 items-center">
                    <div className="flex flex-col">
                      <span className="text-3xl font-display text-white">
                        30+
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">
                        Anos de Carreira
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-display text-white">
                        20
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">
                        Anos Mentorando
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-display text-white">
                        20+
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">
                        Países Atendidos
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Methodology IAM Section */}
        <section
          id="methodology"
          className="py-32 px-6 bg-brand-ink text-white relative overflow-hidden"
          aria-labelledby="methodology-title"
        >
          <div className="absolute inset-0 samurai-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="mb-16">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                Metodologia IAM
              </span>
              <h2
                id="methodology-title"
                className="text-4xl md:text-6xl lg:text-7xl mb-12 font-display leading-tight max-w-4xl"
              >
                Arquitetura de{" "}
                <span className="text-brand-red">
                  Identidade para Designers
                </span>
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                  IAM significa Identity Architecture Method. É um framework
                  cuidadosamente estruturado para alinhar sua presença digital
                  com sua autenticidade.
                </p>
                <div className="lg:text-right">
                  <p className="text-white/40 text-sm leading-relaxed max-w-md lg:ml-auto">
                    Diferente de "descoberta de propósito" genérico, IAM é um
                    processo sistemático com entregáveis tangíveis em cada fase.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phase Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  id: 0,
                  title: "01 - Mapeamento",
                  subtitle: "Semanas 1-3",
                  icon: <Search size={20} />,
                },
                {
                  id: 1,
                  title: "02 - Manifestação",
                  subtitle: "Semanas 3-5",
                  icon: <Palette size={20} />,
                },
                {
                  id: 2,
                  title: "03 - Ativação",
                  subtitle: "Semanas 6-7",
                  icon: <Rocket size={20} />,
                },
                {
                  id: 3,
                  title: "04 - Refinamento",
                  subtitle: "Semana 8 + Ongoing",
                  icon: <RefreshCw size={20} />,
                },
              ].map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`p-6 rounded-2xl border transition-all text-left group focus-ring ${
                    activePhase === phase.id
                      ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  <div
                    className={`mb-4 transition-colors ${activePhase === phase.id ? "text-white" : "text-brand-red"}`}
                  >
                    {phase.icon}
                  </div>
                  <div className="font-bold text-sm mb-1">{phase.title}</div>
                  <div
                    className={`text-[10px] uppercase tracking-widest font-bold ${activePhase === phase.id ? "text-white/80" : "text-white/30"}`}
                  >
                    {phase.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Phase Content */}
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red">
                  {
                    [
                      <Search size={32} />,
                      <Palette size={32} />,
                      <Rocket size={32} />,
                      <RefreshCw size={32} />,
                    ][activePhase]
                  }
                </div>
                <div>
                  <div className="text-brand-red font-display text-xs uppercase tracking-widest mb-1">
                    Fase 0{activePhase + 1}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display uppercase">
                    {
                      ["Mapeamento", "Manifestação", "Ativação", "Refinamento"][
                        activePhase
                      ]
                    }
                  </h3>
                  <div className="text-white/40 text-sm font-bold uppercase tracking-widest">
                    {
                      [
                        "Semanas 1-3",
                        "Semanas 3-5",
                        "Semanas 6-7",
                        "Semana 8 + Ongoing",
                      ][activePhase]
                    }
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-6 mb-12 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm font-bold uppercase tracking-widest">
                    Objetivo:
                  </span>
                  <span className="text-lg text-white/90">
                    {
                      [
                        "Escavar sua identidade autêntica",
                        "Transformar identidade em narrativa",
                        "Colocar identidade em ação no mercado",
                        "Consolidar ganhos e planejar próximos passos",
                      ][activePhase]
                    }
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Input/Action */}
                <div>
                  <div className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest mb-6">
                    <ArrowRight size={14} className="rotate-180" />
                    {activePhase === 0
                      ? "Você entra:"
                      : "O que você vai fazer:"}
                  </div>
                  <ul className="space-y-4">
                    {[
                      [
                        "Perdido entre oportunidades aleatórias",
                        "Não sabe qual é seu diferencial real",
                        "Aplica pra vagas porque 'encaixa no papel'",
                      ],
                      [
                        "2 workshops ao vivo de 3h cada ('Storytelling Autêntico' + 'Portfolio como Narrativa')",
                        "3 sessões de grupo de 90min: Portfolio reviews coletivos",
                        "1 call individual de 30min: Validação de posicionamento",
                        "Reescrita de LinkedIn (headline, about, experience)",
                        "Criação de elevator pitch de 30 segundos",
                      ],
                      [
                        "1 masterclass de 3h: 'Networking Estratégico sem Ser Fake'",
                        "3 sessões de simulação de entrevista: 1 em grupo + 2 individuais",
                        "1 guest session com líder de UX (network de convidados)",
                        "5-10 aplicações estratégicas (não spray & pray)",
                        "Outreach para 10-15 pessoas do seu network",
                      ],
                      [
                        "1 sessão de closure de 2h: Retrospectiva + celebração",
                        "1 call individual de 30min: Plano dos próximos 6-12 meses",
                        "Acesso vitalício a community calls mensais (alumni)",
                        "Todos os 6 agents em 'maintenance mode'",
                      ],
                    ][activePhase].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                      >
                        <ArrowRight
                          size={14}
                          className="text-brand-red mt-1 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Middle Column: Output */}
                <div>
                  <div className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest mb-6">
                    <ArrowRight size={14} />
                    Você sai:
                  </div>
                  <ul className="space-y-4">
                    {[
                      [
                        "Claro sobre quem é no mercado",
                        "Qual tipo de empresa combina com você",
                        "Seu 'pitch natural' pronto para o mundo",
                      ],
                      [
                        "2-3 case studies completos e polidos",
                        "Linkedin transformado (before/after documentado)",
                        "Posicionamento profissional único em 1 frase",
                        "Elevator pitch testado com grupo",
                      ],
                      [
                        "Mínimo 5 conversas estratégicas agendadas",
                        "10-15 aplicações para vagas de 80%+ fit",
                        "Interview prep sheet personalizado",
                        "Rede expandida documentada",
                      ],
                      [
                        "Portfolio v2.0 otimizado",
                        "Plano de 12 meses de carreira",
                        "Relatório de transformação",
                        "Status de Alumni com acesso vitalício",
                      ],
                    ][activePhase].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                      >
                        <ArrowRight
                          size={14}
                          className="text-brand-red mt-1 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Deliverables */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6">
                    <Package size={14} />
                    Entregáveis:
                  </div>
                  <ul className="space-y-4">
                    {[
                      [
                        "Ikigai Map",
                        "Professional Statement",
                        "Narrativa Autêntica",
                      ],
                      [
                        "Case Studies Polidos",
                        "LinkedIn Otimizado",
                        "Pitch Profissional",
                      ],
                      [
                        "Networking Log",
                        "Interview Prep Sheet",
                        "Rede Expandida",
                      ],
                      [
                        "Portfolio v2.0",
                        "Plano de Carreira",
                        "Relatório Final",
                      ],
                    ][activePhase].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-bold text-white/80"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-emerald-400 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Included in all 8 weeks */}
            <motion.div {...fadeInUp} className="mt-16">
              <h4 className="text-brand-red font-display text-xs uppercase tracking-widest mb-8">
                Incluído em todas as 8 semanas:
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "8 sessões em grupo ao vivo (aprox. 2h cada)",
                  "2 sessões individuais para dúvidas específicas",
                  "Todos os Workbooks e materiais trabalhados",
                  "Revisão de portfólio (ilimitado nas semanas 4-6)",
                  "Suporte entre as sessões",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-white/50"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 px-6 bg-brand-ink text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                O Método
              </span>
              <h2 className="text-3xl md:text-5xl mb-6">
                COMO A SESSÃO ESTRATÉGICA VAI FUNCIONAR:
              </h2>
              <div className="w-24 h-1 bg-brand-red mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "Etapa 1",
                  title: "Agendamento",
                  desc: "Preencha o formulário de aplicação. Iremos avaliar suas respostas e em até 24h entraremos em contato.",
                  img: "https://picsum.photos/seed/step1/600/400",
                },
                {
                  step: "Etapa 2",
                  title: "Análise da Trajetória",
                  desc: "Vamos entender o seu momento e avaliar quais oportunidades podem ser exploradas para destravar o seu potencial.",
                  img: "https://picsum.photos/seed/step2/600/400",
                },
                {
                  step: "Etapa 3",
                  title: "Seu Plano de Ação",
                  desc: "Vamos discutir um Plano de Ação, que poderá ser aplicado imediatamente para trazer resultados rápidos.",
                  img: "https://picsum.photos/seed/step3/600/400",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/20 hover:bg-white/8"
                >
                  <div className="rounded-xl overflow-hidden mb-6 aspect-[4/3]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-brand-red font-display text-sm mb-2 block">
                    {item.step}
                  </span>
                  <h3 className="text-xl mb-4 font-sans font-bold">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={scrollToForm}
                className="samurai-button px-12 cursor-pointer"
              >
                APLIQUE AGORA PARA A SESSÃO ESTRATÉGICA GRATUITA
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          className="py-32 px-6 bg-brand-cream relative overflow-hidden"
          aria-labelledby="testimonials-title"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center mb-16"
            >
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                Por que o UX Samurai?
              </span>
              <h2
                id="testimonials-title"
                className="text-4xl md:text-5xl mb-6 font-display"
              >
                RESULTADOS REAIS DE QUEM BUSCOU O TOPO
              </h2>
              <p className="text-black/60 text-lg max-w-2xl mx-auto">
                Já ajudamos centenas de designers a desenharem, lançarem e
                escalarem suas carreiras globais. Ouça quem já transformou sua
                trajetória com a nossa metodologia.
              </p>
            </motion.div>

            <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
              <TestimonialsColumn testimonials={firstColumn} duration={25} />
              <TestimonialsColumn
                testimonials={secondColumn}
                className="hidden md:block"
                duration={30}
              />
              <TestimonialsColumn
                testimonials={thirdColumn}
                className="hidden lg:block"
                duration={27}
              />
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={scrollToForm}
                className="samurai-button px-12 cursor-pointer"
              >
                QUERO FAZER PARTE DESSE GRUPO ELITE
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="py-32 px-6 bg-brand-ink text-white relative overflow-hidden"
          aria-labelledby="faq-title"
        >
          <div className="absolute inset-0 samurai-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                AS PERGUNTAS QUE TODO MUNDO TEM ANTES DE APLICAR
              </span>
              <h2
                id="faq-title"
                className="text-4xl md:text-5xl mb-6 font-display"
              >
                Perguntas Frequentes
              </h2>
              <p className="text-white/50">
                Se sua dúvida não está aqui, mande um e-mail para{" "}
                <span className="text-brand-red">contato@uxsamurai.com.br</span>
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Quanto tempo leva para ver resultados?",
                  a: "Os resultados variam conforme sua dedicação, mas a maioria dos mentorados relata mudanças significativas no posicionamento e nas abordagens de projeto já nas primeiras 4 semanas.",
                },
                {
                  q: "Preciso ter experiência em UX?",
                  a: "Sim, esta mentoria é focada em profissionais que já atuam na área (Plenos e Sêniores) e buscam escalar para cargos de liderança ou mercado internacional.",
                },
                {
                  q: "Posso fazer se não tenho portfolio pronto?",
                  a: "Com certeza. Parte da mentoria foca justamente em como estruturar seus cases para que eles vendam sua senioridade, mesmo que você esteja começando a refinar seu portfólio agora.",
                },
                {
                  q: "O que acontece se eu não conseguir dedicar 6-8h/semana?",
                  a: "O cronograma é intenso para garantir resultados. Se você não puder dedicar esse tempo agora, recomendamos aguardar um momento mais oportuno para aproveitar 100% do investimento.",
                },
                {
                  q: "Como funciona o acesso aos 6 AI Agents após a mentoria?",
                  a: "Você terá acesso vitalício às ferramentas exclusivas desenvolvidas para otimizar seu workflow de design, pesquisa e estratégia.",
                },
                {
                  q: "Qual é a taxa de sucesso? O que posso esperar realmente?",
                  a: "Nossa taxa de sucesso em transições de carreira e aumentos salariais é superior a 85% para quem segue o Roadmap de Autoridade à risca.",
                },
                {
                  q: "Por que R$ 4.500? Não é caro?",
                  a: "O valor reflete o acesso direto a 30 anos de experiência global. É um investimento que se paga em poucos meses com o primeiro salto salarial ou contrato internacional.",
                },
                {
                  q: "Posso parcelar?",
                  a: "Sim, oferecemos opções de parcelamento via cartão de crédito para facilitar seu acesso à transformação.",
                },
                {
                  q: "E se eu aplicar e não for selecionado?",
                  a: "Nossa seleção é rigorosa para garantir a qualidade do grupo. Se não for selecionado agora, você receberá um feedback sobre o que precisa desenvolver para uma aplicação futura.",
                },
                {
                  q: "Isso realmente funciona? Como sei que não é mais um curso de marketing?",
                  a: "Isto não é um curso gravado. É uma mentoria estratégica com acompanhamento real, focada em resultados de negócio e carreira, não apenas em teoria de design.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors duration-200 focus-ring cursor-pointer"
                    aria-expanded={openFaqIndex === idx}
                  >
                    <span className="font-bold text-lg pr-8">{item.q}</span>
                    <ChevronDown
                      className={`text-brand-red transition-transform duration-300 ${openFaqIndex === idx ? "rotate-180" : ""}`}
                      size={20}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === idx ? "auto" : 0,
                      opacity: openFaqIndex === idx ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeInUp}
              className="mt-20 p-8 rounded-2xl border border-white/10 bg-white/5 text-center"
            >
              <h4 className="text-xl font-bold mb-4">
                Ainda tem dúvidas? Não aplique ainda.
              </h4>
              <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
                Só aplique quando estiver 80% convencido. A conversa de 20min
                serve para os outros 20%.
                <br />
                Se você está em 50-50, leia a página de novo ou mande suas
                perguntas por e-mail.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section
          id="application-form"
          className="relative py-32 px-6 bg-brand-cream overflow-hidden"
        >
          <div className="absolute inset-0 samurai-grid-pattern pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <span className="text-brand-red font-display text-sm uppercase tracking-[0.3em] mb-4 block">
                A HORA É AGORA
              </span>
              <h2 className="text-3xl md:text-5xl mb-6 uppercase leading-tight">
                Chega de esperar a próxima oportunidade.
                <br />
                <span className="text-brand-red">Seja a oportunidade.</span>
              </h2>
              <p className="text-black/50 text-lg max-w-xl mx-auto">
                Uma aplicação. Uma conversa. Uma virada.
                <br />
                Preencha abaixo. Resposta em até 24h.
              </p>
            </motion.div>

            <motion.form
              {...fadeInUp}
              className="space-y-6 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-black/5"
              onSubmit={(e) => {
                e.preventDefault();
                setFormState("loading");
                setTimeout(() => setFormState("success"), 2000);
              }}
            >
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Aplicação enviada.
                  </h3>
                  <p className="text-black/60">
                    Você vai receber nosso contato em até 24h. Enquanto isso,
                    prepare-se.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label-float">
                        Nome Completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="input-field focus-ring"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-float">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="input-field focus-ring"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="label-float">
                      Perfil no LinkedIn
                    </label>
                    <input
                      id="linkedin"
                      type="url"
                      className="input-field focus-ring"
                      placeholder="linkedin.com/in/seu-perfil"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="role" className="label-float">
                        Nível atual
                      </label>
                      <select
                        id="role"
                        className="input-field appearance-none focus-ring cursor-pointer"
                      >
                        <option>Selecione</option>
                        <option>Pleno (focado em Sênior)</option>
                        <option>Sênior (focado em Lead/Staff)</option>
                        <option>Lead / Manager</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="career-state" className="label-float">
                        Maior desafio
                      </label>
                      <select
                        id="career-state"
                        className="input-field appearance-none focus-ring cursor-pointer"
                      >
                        <option>Selecione</option>
                        <option>Teto salarial</option>
                        <option>Transição internacional</option>
                        <option>Insegurança com layoffs</option>
                        <option>Migrar para gestão</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="samurai-button w-full text-xl mt-4 focus-ring cursor-pointer"
                    disabled={formState === "loading"}
                  >
                    {formState === "loading" ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        ENVIANDO...
                      </span>
                    ) : (
                      "QUERO MINHA VAGA"
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-black/40 mt-2">
                    <Lock size={12} />
                    <span>
                      Dados 100% seguros · Vagas limitadas · Resposta em até 24h
                    </span>
                  </div>
                </>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-brand-ink text-white/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/images/ux-samurai-logo.png"
              alt="UX Samurai Logo"
              className="h-8 w-auto"
            />
          </div>

          <p className="text-sm">
            Copyright © 2026 – Lau Yamazaki | Todos os direitos reservados
          </p>

          <nav
            className="flex gap-6 text-xs uppercase tracking-widest font-bold"
            aria-label="Links legais"
          >
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 focus-ring rounded-sm cursor-pointer"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 focus-ring rounded-sm cursor-pointer"
            >
              Termos de Uso
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
