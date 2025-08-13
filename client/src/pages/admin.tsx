import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "../components/admin-layout";
import CardForm from "../components/card-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import type { ConsortiumCard } from "shared/schema";
export default function Admin() {
  const [activeTab, setActiveTab] = useState<"cards" | "add" | "edit">("cards");
  const [editingCard, setEditingCard] = useState<ConsortiumCard | null>(null);
  const { toast } = useToast();

  const { data: cards = [], isLoading } = useQuery<ConsortiumCard[]>({
    queryKey: ["/api/admin/cards"],
  });

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: string) => {
      const response = await apiRequest("DELETE", `/api/cards/${cardId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/cards"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
      toast({
        title: "Sucesso",
        description: "Carta excluída com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao excluir carta. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (card: ConsortiumCard) => {
    setEditingCard(card);
    setActiveTab("edit");
  };

  const handleDelete = (cardId: string) => {
    if (confirm("Tem certeza que deseja excluir esta carta?")) {
      deleteCardMutation.mutate(cardId);
    }
  };

  const handleFormSuccess = () => {
    setActiveTab("cards");
    setEditingCard(null);
    queryClient.invalidateQueries({ queryKey: ["/api/admin/cards"] });
    queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Navigation */}
        <div className="flex space-x-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("cards")}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === "cards"
                ? "border-primary-800 text-primary-800"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Gerenciar Cartas
          </button>
          <button
            onClick={() => {
              setActiveTab("add");
              setEditingCard(null);
            }}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === "add"
                ? "border-primary-800 text-primary-800"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Adicionar Carta
          </button>
        </div>

        {/* Cards Management Tab */}
        {activeTab === "cards" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Cartas Cadastradas</h2>
              <Button 
                onClick={() => {
                  setActiveTab("add");
                  setEditingCard(null);
                }}
                className="bg-primary-800 hover:bg-primary-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nova Carta
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-800 mx-auto mb-4"></div>
                <p className="text-slate-600">Carregando cartas...</p>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Administradora
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Crédito
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {cards.map((card) => (
                          <tr key={card.id}>
                            <td className="px-4 py-3 text-sm text-slate-900">{card.administradora}</td>
                            <td className="px-4 py-3 text-sm text-slate-900">{card.credito}</td>
                            <td className="px-4 py-3">
                              <Badge variant={card.tipo === "contemplado" ? "default" : "secondary"}>
                                {card.tipo === "contemplado" ? "Contemplado" : "Não Contemplado"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant={card.ativo ? "default" : "destructive"}>
                                {card.ativo ? "Ativo" : "Inativo"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(card)}
                                className="text-primary-800 hover:text-primary-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(card.id)}
                                className="text-red-600 hover:text-red-500"
                                disabled={deleteCardMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Add Card Tab */}
        {activeTab === "add" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Adicionar Nova Carta de Consórcio</h2>
            <CardForm onSuccess={handleFormSuccess} onCancel={() => setActiveTab("cards")} />
          </div>
        )}

        {/* Edit Card Tab */}
        {activeTab === "edit" && editingCard && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Editar Carta de Consórcio</h2>
            <CardForm 
              card={editingCard} 
              onSuccess={handleFormSuccess} 
              onCancel={() => setActiveTab("cards")} 
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
