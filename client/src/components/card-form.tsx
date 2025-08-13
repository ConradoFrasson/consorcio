import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Save } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { insertConsortiumCardSchema, type ConsortiumCard, type InsertConsortiumCard } from "@shared/schema";

interface CardFormProps {
  card?: ConsortiumCard;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CardForm({ card, onSuccess, onCancel }: CardFormProps) {
  const isEditing = !!card;
  const { toast } = useToast();

  const form = useForm<InsertConsortiumCard>({
    resolver: zodResolver(insertConsortiumCardSchema),
    defaultValues: card ? {
      administradora: card.administradora,
      credito: card.credito,
      parcelas: card.parcelas,
      prazo: card.prazo,
      entrada: card.entrada,
      tipo: card.tipo,
      telefone: card.telefone,
      valorCarta: card.valorCarta,
      taxaAdministradora: card.taxaAdministradora,
      fundoReserva: card.fundoReserva,
      saldoDevedor: card.saldoDevedor,
      lance: card.lance,
      ativo: card.ativo,
    } : {
      administradora: "",
      credito: "",
      parcelas: "",
      prazo: "",
      entrada: "",
      tipo: "contemplado",
      telefone: "",
      valorCarta: "",
      taxaAdministradora: "",
      fundoReserva: "",
      saldoDevedor: "",
      lance: "",
      ativo: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConsortiumCard) => {
      const url = isEditing ? `/api/cards/${card.id}` : "/api/cards";
      const method = isEditing ? "PUT" : "POST";
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: `Carta ${isEditing ? "atualizada" : "criada"} com sucesso!`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: `Falha ao ${isEditing ? "atualizar" : "criar"} carta. Tente novamente.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertConsortiumCard) => {
    mutation.mutate(data);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900 border-b border-slate-200 pb-2">
                  Informações Básicas
                </h3>
                
                <FormField
                  control={form.control}
                  name="administradora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Administradora</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Contempla">Contempla</SelectItem>
                          <SelectItem value="Rodobens">Rodobens</SelectItem>
                          <SelectItem value="Caixa Consórcios">Caixa Consórcios</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crédito (Valor do bem)</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 180.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parcelas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcelas</FormLabel>
                      <FormControl>
                        <Input placeholder="36x de R$ 850" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prazo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo</FormLabel>
                      <FormControl>
                        <Input placeholder="36 meses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 45.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="contemplado">Contemplado</SelectItem>
                          <SelectItem value="nao-contemplado">Não Contemplado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Informações Detalhadas */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900 border-b border-slate-200 pb-2">
                  Informações Detalhadas
                </h3>
                
                <FormField
                  control={form.control}
                  name="valorCarta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor da Carta</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 142.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxaAdministradora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa da Administradora</FormLabel>
                      <FormControl>
                        <Input placeholder="19,5% a.a." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fundoReserva"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fundo de Reserva</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 8.500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="saldoDevedor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saldo Devedor</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 32.450" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lance</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 15.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary-800 hover:bg-primary-700"
                disabled={mutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {mutation.isPending ? "Salvando..." : "Salvar Carta"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
