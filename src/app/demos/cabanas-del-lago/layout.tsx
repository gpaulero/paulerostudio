import { Inter, Caveat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-cabin-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cabin-accent",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Cabañas del Lago | Valle de Punilla, Córdoba",
  description:
    "Cabañas frente al lago en Villa Carlos Paz. A 10 min del centro, wifi alta velocidad, desayuno incluido. Reservá directo sin comisiones.",
};

export default function CabinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${caveat.variable}`}
      style={{
        background: "#F4F0E8",
        color: "#2D4A3E",
        minHeight: "100vh",
        fontFamily: "var(--font-cabin-body), system-ui, sans-serif",
      }}
    >
      {children}
      <div className="bg-[#2D4A3E] text-white py-4 px-6 text-center text-sm">
        Este es un sitio demo construido por{" "}
        <a
          href="https://paulerostudio.com/#projects"
          className="underline font-medium"
        >
          Paulero Studio
        </a>{" "}
        para mostrar capacidades de diseño. ¿Querés una web así?{" "}
        <a
          href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20el%20demo%20de%20cabañas%20y%20quiero%20algo%20parecido"
          className="underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablamos por WhatsApp →
        </a>
      </div>
    </div>
  );
}
