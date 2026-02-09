import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, LogIn } from "lucide-react";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { loginClient, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await loginClient(email);
    if (success) {
      navigate("/cliente");
    } else {
      setError("E-mail não encontrado. Verifique e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Mail className="h-7 w-7 text-accent-foreground" />
            </div>
            <CardTitle className="font-display text-xl">Área do Cliente</CardTitle>
            <CardDescription>Informe seu e-mail para acessar seus laudos.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? "Entrando..." : "Acessar"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Emails de teste: maria@empresa.com, joao@mineracao.com, ana@fazenda.com
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ClientLogin;
