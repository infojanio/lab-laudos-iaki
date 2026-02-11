import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Droplets, Mountain, Leaf, QrCode, ShieldCheck, ClipboardCheck,
  FlaskConical, Search, FileCheck, ArrowRight, Award, CheckCircle2,
} from "lucide-react";
import labImage3 from "@/assets/labMoura.png";
import labImage6 from "@/assets/doctor.jpg";
import labImage4 from "@/assets/water.jpg";

import lab1 from "@/assets/laboratory.avif";
import lab2 from "@/assets/lab.png";
import lab3 from "@/assets/6.avif";
import lab4 from "@/assets/laudosdig.jpg";

const heroSlides = [
  { image: labImage4, position: "object-[center_40%]", title: "Análises laboratoriais com confiabilidade e transparência", subtitle: "Laudos digitais com validação pública via QR Code." },
  { image: lab1, position: "object-[center_45%]", title: "Qualidade da água garantida por análises precisas", subtitle: "Monitoramento completo de potabilidade e efluentes." },
  { image: lab2, position: "object-[center_32%]", title: "Tecnologia e rigor técnico em cada amostra", subtitle: "Equipamentos modernos e equipe qualificada." },
  { image: lab3, position: "object-[center_32%]", title: "Compromisso com o meio ambiente", subtitle: "Análises ambientais para licenciamento e sustentabilidade." },
  { image: lab4, position: "object-[center_45%]", title: "Laudos digitais com validação instantânea", subtitle: "QR Code exclusivo para verificação pública de autenticidade." },
];



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  { icon: Droplets, title: "Análise de Água", desc: "Potabilidade, efluentes, físico-química e microbiologia." },
  { icon: Mountain, title: "Análise de Solo", desc: "Fertilidade, contaminantes, pH e composição mineral." },
  { icon: Leaf, title: "Análises Ambientais", desc: "Monitoramento ambiental, licenciamento e laudos técnicos." },
];

const steps = [
  { icon: FlaskConical, title: "Coleta", desc: "Amostras coletadas seguindo normas técnicas." },
  { icon: Search, title: "Análise", desc: "Processamento em laboratório certificado." },
  { icon: FileCheck, title: "Emissão do Laudo", desc: "Laudo digital com QR Code de validação." },
  { icon: QrCode, title: "Consulta", desc: "Validação pública online a qualquer momento." },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO WITH SLIDER */}
      <section className="relative overflow-hidden h-[55vh] md:h-[65vh] flex items-center">

        {/* Background images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >

<img
  src={heroSlides[currentSlide].image}
  alt="Slide"
  className={`absolute inset-0 w-full h-full object-cover ${heroSlides[currentSlide].position || "object-center"}`}
/>

          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(205,75%,10%,0.85)] via-[hsl(205,75%,15%,0.75)] to-[hsl(205,75%,20%,0.6)]" />

        {/* Content */}
        
        <div className="container relative z-10 py-14 md:py-20">

        <div className="max-w-2xl">

<div className="min-h-[180px] md:min-h-[220px]">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentSlide}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
        {heroSlides[currentSlide].title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl drop-shadow-md">
        {heroSlides[currentSlide].subtitle}
      </p>
    </motion.div>
  </AnimatePresence>
</div>

{/* Botões */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="mt-8 flex flex-wrap gap-4"
>
            <Link to="/validar">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg">
                  <QrCode className="mr-2 h-5 w-5" /> Validar Laudo
                </Button>
              </Link>
              <a href="#contato">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg">
                  Solicitar Análise <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-lg border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <s.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS */}
      <section className="py-16 bg-muted/50">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Laudos digitais com validação pública</h2>
            <ul className="space-y-4">
              {[
                { icon: QrCode, text: "QR Code exclusivo em cada laudo para verificação instantânea." },
                { icon: ShieldCheck, text: "Validação pública online — qualquer pessoa pode verificar a autenticidade." },
                { icon: ClipboardCheck, text: "Rastreabilidade completa de cada análise realizada." },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                    <Icon className="h-4 w-4 text-secondary" />
                  </div>
                  <p className="text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={labImage6} alt="Laboratório" className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL RESPONSIBILITY */}
      <section className="py-16 bg-muted/50">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
            <img src={labImage3} alt="Equipe técnica" className="w-full h-64 md:h-80 object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Responsabilidade Técnica</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Albani Moura Santos</p>
                  <p className="text-sm text-muted-foreground">CRQ-MA 12402716 — Químico Responsável</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-secondary mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Normas ABNT NBR, Portaria de Consolidação nº 5/2017 (água),
                  Resolução CONAMA 420/2009 (solo).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
