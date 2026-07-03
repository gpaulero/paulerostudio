import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-law-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-law-body",
});

export const metadata = {
  title: "Estudio Fernández & Romero | Abogados",
  description:
    "Estudio jurídico con más de 25 años de experiencia. Derecho laboral, civil, penal, comercial, familia y sucesiones. Consulta gratuita.",
};

export default function LawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable}`}
      style={{
        background: "#FAFAF7",
        color: "#0F2A47",
        minHeight: "100vh",
        fontFamily: "var(--font-law-body), system-ui, sans-serif",
      }}
    >
      {children}
      <div className="bg-[#0F2A47] text-white py-4 px-6 text-center text-sm">
        Este es un sitio demo construido por{" "}
        <a
          href="https://paulerostudio.com/#projects"
          className="underline font-medium"
        >
          Paulero Studio
        </a>{" "}
        para mostrar capacidades de diseño. ¿Querés una web así?{" "}
        <a
          href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20el%20demo%20de%20estudio%20jurídico%20y%20quiero%20algo%20parecido"
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
