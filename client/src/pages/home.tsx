import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import CardGrid from "../components/card-grid";
import LoginModal from "../components/login-modal";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search } from "lucide-react";
import type { ConsortiumCard } from "@shared/schema";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [filters, setFilters] = useState({
    administradora: "all",
    credito: "all",
    tipo: "all",
  });

  const { data: cards = [], isLoading } = useQuery<ConsortiumCard[]>({
    queryKey: ["/api/cards"],
  });

  const filteredCards = cards.filter(card => {
    if (filters.administradora !== "all" && card.administradora !== filters.administradora) return false;
    if (filters.tipo !== "all" && card.tipo !== filters.tipo) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Encontre a Carta de Consórcio Ideal</h1>
            <p className="text-xl text-primary-100 mb-6">
              Explore nossa seleção de cartas de consórcio contempladas e não contempladas. 
              Realize seu sonho com as melhores condições do mercado.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium">Cartas Contempladas</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium">Melhor Preço</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium">Aprovação Rápida</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Administradora</label>
              <Select value={filters.administradora} onValueChange={(value) => setFilters(prev => ({ ...prev, administradora: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Contempla">Contempla</SelectItem>
                  <SelectItem value="Rodobens">Rodobens</SelectItem>
                  <SelectItem value="Caixa Consórcios">Caixa Consórcios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Valor do Crédito</label>
              <Select value={filters.credito} onValueChange={(value) => setFilters(prev => ({ ...prev, credito: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer valor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer valor</SelectItem>
                  <SelectItem value="ate-50k">Até R$ 50.000</SelectItem>
                  <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                  <SelectItem value="acima-100k">Acima de R$ 100.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo</label>
              <Select value={filters.tipo} onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="contemplado">Contemplado</SelectItem>
                  <SelectItem value="nao-contemplado">Não Contemplado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-primary-800 hover:bg-primary-700">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>

        <CardGrid cards={filteredCards} isLoading={isLoading} />
        
        {/* Load More Button */}
        {!isLoading && filteredCards.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-6 py-3">
              Carregar Mais Cartas
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConsórcioCards</h3>
              <p className="text-primary-100 text-sm">
                Sua plataforma completa para encontrar e gerenciar cartas de consórcio 
                com as melhores condições do mercado.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li><a href="#" className="hover:text-white">Cartas Contempladas</a></li>
                <li><a href="#" className="hover:text-white">Cartas Não Contempladas</a></li>
                <li><a href="#" className="hover:text-white">Consultoria</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contato</h4>
              <div className="space-y-2 text-sm text-primary-100">
                <p>(11) 4002-8922</p>
                <p>contato@consorciocards.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-sm text-primary-100">
            <p>&copy; 2024 ConsórcioCards. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </div>
  );
}
