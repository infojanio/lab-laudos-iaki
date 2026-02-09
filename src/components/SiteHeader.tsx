import { Link } from "react-router-dom";
import { Droplets, Mountain, Leaf, QrCode, ShieldCheck, FlaskConical, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-primary">LabAnalytica</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Início</Link>
          <Link to="/validar" className="text-foreground/80 hover:text-primary transition-colors">Validar Laudo</Link>
          <Link to="/cliente/login" className="text-foreground/80 hover:text-primary transition-colors">Área do Cliente</Link>
          <Link to="/admin/login">
            <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Administração
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card p-4 space-y-3">
          <Link to="/" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Início</Link>
          <Link to="/validar" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Validar Laudo</Link>
          <Link to="/cliente/login" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Área do Cliente</Link>
          <Link to="/admin/login" className="block py-2 text-foreground/80" onClick={() => setOpen(false)}>Administração</Link>
        </div>
      )}
    </header>
  );
}
