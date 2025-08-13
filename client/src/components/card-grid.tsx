import ConsortiumCard from "./consortium-card";
import type { ConsortiumCard as ConsortiumCardType } from "@shared/schema";

interface CardGridProps {
  cards: ConsortiumCardType[];
  isLoading: boolean;
}

export default function CardGrid({ cards, isLoading }: CardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 animate-pulse">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                </div>
                <div className="h-6 bg-slate-200 rounded w-16"></div>
              </div>
              <div className="space-y-3 mb-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4 mb-4">
                <div className="h-3 bg-slate-200 rounded w-32"></div>
              </div>
              <div className="flex space-x-3">
                <div className="flex-1 h-8 bg-slate-200 rounded"></div>
                <div className="h-8 w-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-500 text-lg mb-2">Nenhuma carta encontrada</div>
        <p className="text-slate-400">Tente ajustar os filtros para ver mais resultados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <ConsortiumCard key={card.id} card={card} />
      ))}
    </div>
  );
}
