
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  stockAlerts: z.boolean(),
  financialAlerts: z.boolean(),
});

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
    },
  });

  const notificationsForm = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      stockAlerts: true,
      financialAlerts: true,
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    setIsLoading(true);
    // Em um caso real, aqui você salvaria os dados no banco de dados
    setTimeout(() => {
      toast.success("Perfil atualizado com sucesso!");
      setIsLoading(false);
    }, 1000);
  };

  const onNotificationsSubmit = (values: z.infer<typeof notificationsSchema>) => {
    setIsLoading(true);
    // Em um caso real, aqui você salvaria as preferências de notificação
    setTimeout(() => {
      toast.success("Preferências de notificação atualizadas!");
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordReset = () => {
    setIsLoading(true);
    // Em um caso real, aqui você enviaria um email de redefinição de senha
    setTimeout(() => {
      toast.success("Link de redefinição de senha enviado para seu email!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Label>Função</Label>
                    <Input 
                      value={currentUser?.role === 'admin' ? 'Administrador' : 
                             currentUser?.role === 'finance' ? 'Financeiro' : 'Estoque'} 
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    Salvar alterações
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Defina como deseja ser notificado sobre eventos importantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                  <FormField
                    control={notificationsForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Notificações por Email</FormLabel>
                          <FormDescription>
                            Receba notificações por email sobre atividades importantes.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationsForm.control}
                    name="stockAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Alertas de Estoque</FormLabel>
                          <FormDescription>
                            Seja notificado quando itens do estoque atingirem o nível mínimo.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationsForm.control}
                    name="financialAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Alertas Financeiros</FormLabel>
                          <FormDescription>
                            Receba notificações sobre pagamentos pendentes e recebimentos.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    Salvar preferências
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <p className="text-sm text-gray-500">
                  Para alterar sua senha, enviaremos um link de redefinição para seu email.
                </p>
              </div>
              <Button onClick={handlePasswordReset} disabled={isLoading}>
                Solicitar redefinição de senha
              </Button>

              <div className="border-t pt-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Autenticação de dois fatores</h3>
                  <p className="text-sm text-gray-500">
                    Adicione uma camada extra de segurança à sua conta.
                  </p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox id="2fa" disabled />
                  <label
                    htmlFor="2fa"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Habilitar autenticação de dois fatores (em breve)
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
