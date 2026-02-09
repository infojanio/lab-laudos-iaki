import { FlaskConical, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-6 w-6" />
              <span className="font-display text-lg font-bold">LabMoura</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Laboratório de análises com tecnologia, transparência e confiabilidade.
              Laudos digitais com validação pública via QR Code.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Início</Link></li>
              <li><Link to="/validar" className="hover:text-primary-foreground transition-colors">Validar Laudo</Link></li>
              <li><Link to="/cliente/login" className="hover:text-primary-foreground transition-colors">Área do Cliente</Link></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Porto Franco-MA, Povoado Coité, Rua Antônio Moura, nº 42, CEP: 65970-000
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                (62) 99329-4573
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                albani@labmoura.com.br
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} LabMoura — CNPJ: 07.650.440/0001-33</p>
          <p className="mt-1">Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
