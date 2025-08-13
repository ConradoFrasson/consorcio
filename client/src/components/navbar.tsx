import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Search, Shield } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl font-bold text-primary-800 cursor-pointer">ConsórcioCards</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-primary-800 hover:text-primary-600 px-3 py-2 text-sm font-medium border-b-2 border-primary-800">
                Cartas Disponíveis
              </Link>
              <a href="#about" className="text-slate-600 hover:text-primary-800 px-3 py-2 text-sm font-medium">
                Sobre
              </a>
              <a href="#contact" className="text-slate-600 hover:text-primary-800 px-3 py-2 text-sm font-medium">
                Contato
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              onClick={onLoginClick}
              className="bg-primary-800 hover:bg-primary-700"
            >
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
