export default function ParrillaDemoBanner() {
  return (
    <div
      className="text-center text-sm py-4 px-6"
      style={{ background: "#000000", color: "#FFFFFF" }}
    >
      Este es un sitio demo construido por{" "}
      <a
        href="https://paulerostudio.com/#projects"
        className="underline font-medium"
        style={{ color: "#FFFFFF" }}
      >
        Paulero Studio
      </a>{" "}
      para mostrar capacidades de diseño. ¿Querés una web así?{" "}
      <a
        href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20el%20demo%20de%20parrilla%20y%20quiero%20algo%20parecido"
        className="underline font-medium"
        style={{ color: "#FFFFFF" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Hablamos por WhatsApp →
      </a>
    </div>
  );
}
