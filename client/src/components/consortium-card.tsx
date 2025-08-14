import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Building, Phone } from "lucide-react";
import type { ConsortiumCard as ConsortiumCardType } from "@shared/schema";

interface ConsortiumCardProps {
  card: ConsortiumCardType;
}

export default function ConsortiumCard({ card }: ConsortiumCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Building className="text-primary-800 text-sm h-4 w-4" />
            </div>
            <span className="font-medium text-slate-900">{card.administradora}</span>
          </div>
          <Badge variant={card.tipo === "contemplado" ? "default" : "secondary"}>
            {card.tipo === "contemplado" ? "Contemplado" : "Não Contemplado"}
          </Badge>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Crédito</span>
            <span className="text-lg font-semibold text-slate-900">{card.credito}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Parcelas</span>
            <span className="font-medium text-slate-900">{card.parcelas}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Entrada</span>
            <span className="font-medium text-slate-900">{card.entrada}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Prazo</span>
            <span className="font-medium text-slate-900">{card.prazo}</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Phone className="text-secondary-500 h-4 w-4" />
            <span>{card.telefone}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link href={`/card/${card.id}`}>
            <Button className="flex-1 bg-primary-800 hover:bg-primary-700">
              Ver Detalhes
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-secondary-500 text-secondary-700 hover:bg-secondary-50"
          >
            <Phone className="mr-1 h-4 w-4" />
            Contato
          </Button>
        </div>
      </div>
    </div>
  );
}
