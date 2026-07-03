import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-parrilla-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-parrilla-body",
});

export const metadata = {
  title: "Parrilla La Esquina | Villa Carlos Paz",
  description:
    "Parrilla argentina en Villa Carlos Paz. Fuego lento, sabores auténticos. Reservá tu mesa.",
};

export default function ParrillaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable}`}
      style={{
        background: "#F5EDE3",
        color: "#1A1614",
        minHeight: "100vh",
        fontFamily: "var(--font-parrilla-body), system-ui, sans-serif",
      }}
    >
      {children}
      {/* Demo banner */}
      <div className="bg-black text-white py-4 px-6 text-center text-sm">
        Este es un sitio demo construido por{" "}
        <a
          href="https://paulerostudio.com/#projects"
          className="underline font-medium"
        >
          Paulero Studio
        </a>{" "}
        para mostrar capacidades de diseño. ¿Querés una web así?{" "}
        <a
          href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20el%20demo%20de%20parrilla%20y%20quiero%20algo%20parecido"
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
