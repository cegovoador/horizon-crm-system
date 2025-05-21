
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor, informe seu e-mail");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      setError("Não foi possível enviar o e-mail de recuperação");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-crm-primary">CRM</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema completo para gerenciamento de clientes e negócios
          </p>
        </div>

        <Card className="mt-8 w-full">
          <CardHeader>
            <CardTitle className="text-xl">Recuperar senha</CardTitle>
            <CardDescription>
              Informe seu e-mail para receber instruções de recuperação de senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-green-800">
                      E-mail enviado com sucesso! Verifique sua caixa de entrada.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-red-50 p-3">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <div className="ml-3">
                        <p className="text-sm text-red-500">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-crm-primary hover:bg-crm-secondary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar instruções"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <Link
              to="/login"
              className="flex w-full items-center justify-center text-sm text-crm-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
