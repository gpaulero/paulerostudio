"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Footer (Pie de página)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Simple: logo + copyright. Se queda abajo de todo.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.png"
              alt="Paulero Studio"
              className="w-6 h-6 rounded-sm object-contain"
            />
            <span className="text-sm font-medium">Paulero Studio</span>
          </div>
          {/* Año dinámico - se actualiza solo */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gonzalo Paulero. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
