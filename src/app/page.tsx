"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAULERO STUDIO — Portfolio Web
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// ARCHIVO: src/app/page.tsx
// Este es el archivo principal de tu sitio web.
// En Next.js con App Router, page.tsx es lo que se muestra
// cuando alguien visita la ruta "/" (la página de inicio).
//
// Cada sección está en su propio archivo bajo src/components/sections/
// para mantener el código organizado y fácil de mantener.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import TechStack from "@/components/sections/tech-stack";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Pricing from "@/components/sections/pricing";
import Process from "@/components/sections/process";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/sections/whatsapp-button";
import Chatbot from "@/components/sections/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Pricing />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}
