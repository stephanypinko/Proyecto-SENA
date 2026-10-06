import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Gift, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/convenios');
      }
    } else {
      setError('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  const quickLoginAsociado = () => {
    login('maria.gonzalez@empresa.com', '1234');
    navigate('/convenios');
  };

  const quickLoginAdmin = () => {
    login('admin@cooperativa.com', 'admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-indigo-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full border border-indigo-200">
              🎓 Proyecto Formativo SENA &bull; Prototipo
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Portal de Convenios</CardTitle>
          <CardDescription>
            Acceso demostrativo para afiliados y evaluadores
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Botones de Acceso Rápido Directo */}
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
              Acceso Rápido en 1 Clic
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={quickLoginAsociado}
                className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                👤 Afiliado (María)
              </Button>
              <Button
                type="button"
                onClick={quickLoginAdmin}
                className="w-full text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white"
              >
                ⚙️ Administrador
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">O escribe tu correo de prueba</Label>
              <Input
                id="email"
                type="text"
                placeholder="usuario@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">PIN o Clave de acceso</Label>
              <Input
                id="password"
                type="text"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" variant="outline" className="w-full">
              Ingresar con estos datos
            </Button>
            <div className="text-center pt-2 border-t border-gray-100">
              <a href="/" className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 transition-colors">
                ← Volver al portal informativo (Landing)
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
