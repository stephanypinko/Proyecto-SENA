import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  nombre: string;
  email: string;
  numeroCarnet: string;
  puntos: number;
  empresa: string;
  role: 'asociado' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updatePuntos: (puntos: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios mock para demostración
const mockUserAsociado: User = {
  id: '1',
  nombre: 'María González',
  email: 'maria.gonzalez@empresa.com',
  numeroCarnet: 'CNV-2024-001234',
  puntos: 2500,
  empresa: 'Empresa S.A.',
  role: 'asociado'
};

const mockUserAdmin: User = {
  id: '2',
  nombre: 'Administrador Cooperativa',
  email: 'admin@cooperativa.com',
  numeroCarnet: 'ADM-2024-000001',
  puntos: 0,
  empresa: 'COOPERATIVA SAS',
  role: 'admin'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Validación simple para demo
    if (email && password.length >= 4) {
      if (email.toLowerCase().includes('admin')) {
        setUser(mockUserAdmin);
      } else {
        setUser(mockUserAsociado);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updatePuntos = (puntos: number) => {
    if (user) {
      setUser({ ...user, puntos: user.puntos + puntos });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePuntos }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
