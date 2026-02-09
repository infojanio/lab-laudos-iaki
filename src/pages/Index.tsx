import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  Droplets, Mountain, Leaf, QrCode, ShieldCheck, ClipboardCheck,
  FlaskConical, Search, FileCheck, ArrowRight, Award, CheckCircle2,
} from "lucide-react";
import labImage1 from "@/assets/lab-1.avif";
import labImage2 from "@/assets/lab-2.avif";
import labImage3 from "@/assets/lab-3.avif";

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
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${labImage1})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight"
            >
              Análises laboratoriais com confiabilidade e transparência
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-lg text-primary-foreground/80 max-w-xl"
            >
              Laudos digitais com validação pública via QR Code. Tecnologia a serviço da credibilidade.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/validar">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  <QrCode className="mr-2 h-5 w-5" /> Validar Laudo
                </Button>
              </Link>
              <a href="#servicos">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Solicitar Análise <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
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
            <img src={labImage2} alt="Laboratório" className="w-full h-64 md:h-80 object-cover" />
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
                  <p className="font-semibold">Dr. Carlos Mendes</p>
                  <p className="text-sm text-muted-foreground">CRQ-SP 04123456 — Químico Responsável</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Dra. Fernanda Lima</p>
                  <p className="text-sm text-muted-foreground">CREA-RJ 2024567890 — Engenheira Ambiental</p>
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

      <SiteFooter />
    </div>
  );
};

export default Index;
