import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, LogIn } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await loginAdmin(email, password);
    if (success) {
      navigate("/admin");
    } else {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-display text-xl">Administração</CardTitle>
            <CardDescription>Acesso restrito ao laboratório.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Teste: admin@labanalytica.com (qualquer senha)
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AdminLogin;
