import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import ParrillaNav from "../_components/nav";
import ParrillaFooter from "../_components/footer";

const menu = {
  Entradas: [
    { nombre: "Empanadas de carne (6u)", desc: "Corte cuchillo, horno de barro", precio: "$4.800" },
    { nombre: "Chorizo colorado con pan", desc: "Chorizo de Tandil, pan de campo", precio: "$5.200" },
    { nombre: "Mollejas doradas", desc: "Mollejas de corazón, crocantes", precio: "$9.800" },
    { nombre: "Provoleta a la parrilla", desc: "Queso provolone, orégano, ají molido", precio: "$6.500" },
    { nombre: "Choripán de la casa", desc: "Chorizo artesanal, chimichurri, pan de campo", precio: "$4.500" },
  ],
  Parrilla: [
    { nombre: "Asado de tira", desc: "Costilla de novillo, 4 horas a fuego lento", precio: "$12.500" },
    { nombre: "Bife de chorizo", desc: "400g, chimichurri de la casa", precio: "$14.800" },
    { nombre: "Vacío", desc: "Corte clásico, jugoso, grasa crocante", precio: "$11.200" },
    { nombre: "Entraña", desc: "Fina, crocante, en su punto justo", precio: "$10.800" },
    { nombre: "Matambre de cerdo", desc: "Relleno con espinaca y queso", precio: "$9.500" },
    { nombre: "Parrillada La Esquina (2 personas)", desc: "Asado, vacío, chorizo, morcilla, mollejas, papas", precio: "$28.000" },
  ],
  Acompañamientos: [
    { nombre: "Papas a la provenzal", desc: "Papas fritas, perejil, ajo", precio: "$3.800" },
    { nombre: "Papas fritas con cheddar y panceta", desc: "Clásicas, abundantes", precio: "$5.200" },
    { nombre: "Ensalada mixta", desc: "Lechuga, tomate, cebolla, zanahoria", precio: "$3.500" },
    { nombre: "Puré de calabaza", desc: "Con queso crema y nuez moscada", precio: "$3.800" },
    { nombre: "Pan de campo con chimichurri", desc: "Para la mesa, ilimitado", precio: "$1.800" },
  ],
  Postres: [
    { nombre: "Flan mixto", desc: "Flan casero, dulce de leche, crema", precio: "$4.200" },
    { nombre: "Panqueque con dulce de leche", desc: "Tradicional, flambeado a la mesa", precio: "$4.500" },
    { nombre: "Helado artesanal (3 bochas)", desc: "Sabores de la casa: dulce de leche, americana, chocolate", precio: "$3.800" },
    { nombre: "Queso y dulce", desc: "Queso fresco, dulce de batata, nueces", precio: "$3.900" },
  ],
  Bebidas: [
    { nombre: "Vino tinto Malbec (botella)", desc: "Bodega Trapiche, Mendoza", precio: "$8.500" },
    { nombre: "Vino tinto Bonarda (botella)", desc: "Bodega Luigi Bosca, Mendoza", precio: "$11.200" },
    { nombre: "Cerveza artesanal Quilmes (1L)", desc: "Tirada, bien helada", precio: "$3.200" },
    { nombre: "Limonada con menta y jengibre (jarra)", desc: "Casera, refrescante", precio: "$3.500" },
    { nombre: "Agua mineral (500ml)", desc: "Con o sin gas", precio: "$1.500" },
  ],
};

export default function ParrillaMenu() {
  return (
    <>
      <ParrillaNav />
      <div className="pt-24 bg-[#F5EDE3] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/demos/parrilla-la-esquina"
            className="inline-flex items-center gap-2 text-[#B8412C] hover:text-[#9F3625] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-16">
            <p className="text-[#B8412C] text-sm tracking-[0.3em] uppercase mb-4">
              Nuestro menú
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              A la parrilla, todo en su punto
            </h1>
            <p className="text-[#1A1614]/60 max-w-2xl mx-auto leading-relaxed">
              Precios en pesos argentinos. Lista de vinos disponible en el
              restaurant. Aceptamos todas las tarjetas.
            </p>
          </div>

          {Object.entries(menu).map(([categoria, items]) => (
            <div key={categoria} className="mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-2 text-[#1A1614] pb-4 border-b-2 border-[#B8412C]"
                style={{ fontFamily: "var(--font-parrilla-display), serif" }}
              >
                {categoria}
              </h2>
              <div className="space-y-5 pt-6">
                {items.map((item) => (
                  <div
                    key={item.nombre}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-5 border-b border-[#1A1614]/10"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-[#1A1614]">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-[#1A1614]/60 mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[#B8412C] font-bold text-lg whitespace-nowrap">
                      {item.precio}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA pedido */}
          <div className="text-center mt-16 p-8 bg-[#1A1614] rounded-2xl">
            <h3
              className="text-2xl font-semibold text-[#F5EDE3] mb-4"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              ¿Querés hacer tu pedido?
            </h3>
            <p className="text-[#F5EDE3]/70 mb-6">
              Hacelo por WhatsApp y te lo llevamos a la mesa o lo retirás en el
              local.
            </p>
            <a
              href="https://wa.me/5493541123456?text=Hola%2C%20quiero%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Hacer pedido por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <ParrillaFooter />
    </>
  );
}
