import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-primary-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Painel Administrativo</h1>
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-200 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
