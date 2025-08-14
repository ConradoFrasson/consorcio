import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Navbar from "../components/navbar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Phone, Share2, Building } from "lucide-react";
import type { ConsortiumCard } from "shared/schema";

export default function CardDetails() {
  const [, params] = useRoute("/card/:id");
  const cardId = params?.id;

  const { data: card, isLoading, error } = useQuery<ConsortiumCard>({
    queryKey: ["/api/cards", cardId],
    enabled: !!cardId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-800 mx-auto mb-4"></div>
            <p className="text-slate-600">Carregando detalhes da carta...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-slate-600 mb-4">Carta não encontrada</p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Detalhes da Carta de Consórcio</h1>
            <Badge variant={card.tipo === "contemplado" ? "default" : "secondary"} className="text-sm">
              {card.tipo === "contemplado" ? "Contemplado" : "Não Contemplado"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary-800" />
                <span>Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Administradora:</span>
                <span className="font-medium">{card.administradora}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Tipo:</span>
                <Badge variant={card.tipo === "contemplado" ? "default" : "secondary"}>
                  {card.tipo === "contemplado" ? "Contemplado" : "Não Contemplado"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Crédito (Valor do bem):</span>
                <span className="font-semibold text-lg">{card.credito}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Parcelas:</span>
                <span className="font-medium">{card.parcelas}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Prazo:</span>
                <span className="font-medium">{card.prazo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Entrada:</span>
                <span className="font-medium">{card.entrada}</span>
              </div>
            </CardContent>
          </Card>

          {/* Informações Detalhadas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Detalhadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Valor da Carta:</span>
                <span className="font-medium">{card.valorCarta}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Taxa da Administradora:</span>
                <span className="font-medium">{card.taxaAdministradora}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Fundo de Reserva:</span>
                <span className="font-medium">{card.fundoReserva}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Saldo Devedor:</span>
                <span className="font-medium">{card.saldoDevedor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Lance:</span>
                <span className="font-medium">{card.lance}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contato */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Contato do Administrador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-slate-700 mb-6">
              <Phone className="h-4 w-4 text-secondary-500" />
              <span>{card.telefone}</span>
            </div>
            
            <div className="flex space-x-4">
              <Button className="flex-1 bg-secondary-600 hover:bg-secondary-700">
                <Phone className="mr-2 h-4 w-4" />
                Entrar em Contato
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
