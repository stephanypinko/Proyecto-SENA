import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Trophy, TrendingUp, Gift, Calendar, Plus, Minus } from 'lucide-react';

interface Transaccion {
  id: string;
  fecha: string;
  descripcion: string;
  puntos: number;
  tipo: 'ganado' | 'canjeado';
}

const transaccionesMock: Transaccion[] = [
  {
    id: '1',
    fecha: '2026-03-28',
    descripcion: 'Compra en Fashion Store Premium',
    puntos: 150,
    tipo: 'ganado'
  },
  {
    id: '2',
    fecha: '2026-03-25',
    descripcion: 'Canjeo: Restaurante El Buen Sabor',
    puntos: -100,
    tipo: 'canjeado'
  },
  {
    id: '3',
    fecha: '2026-03-20',
    descripcion: 'Compra en GymFit Center',
    puntos: 200,
    tipo: 'ganado'
  },
  {
    id: '4',
    fecha: '2026-03-15',
    descripcion: 'Bonificación mensual',
    puntos: 500,
    tipo: 'ganado'
  },
  {
    id: '5',
    fecha: '2026-03-10',
    descripcion: 'Canjeo: CineMax Premium',
    puntos: -180,
    tipo: 'canjeado'
  },
  {
    id: '6',
    fecha: '2026-03-05',
    descripcion: 'Compra en Café Aroma',
    puntos: 80,
    tipo: 'ganado'
  },
  {
    id: '7',
    fecha: '2026-02-28',
    descripcion: 'Referido nuevo socio',
    puntos: 300,
    tipo: 'ganado'
  },
  {
    id: '8',
    fecha: '2026-02-20',
    descripcion: 'Canjeo: Spa & Wellness Center',
    puntos: -250,
    tipo: 'canjeado'
  }
];

export default function Puntos() {
  const { user } = useAuth();
  const [transacciones] = useState<Transaccion[]>(transaccionesMock);

  if (!user) return null;

  const puntosParaProximoNivel = 5000;
  const progreso = (user.puntos / puntosParaProximoNivel) * 100;

  const totalGanado = transacciones
    .filter((t) => t.tipo === 'ganado')
    .reduce((sum, t) => sum + t.puntos, 0);

  const totalCanjeado = Math.abs(
    transacciones
      .filter((t) => t.tipo === 'canjeado')
      .reduce((sum, t) => sum + t.puntos, 0)
  );

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Puntos</h1>
        <p className="text-gray-600 mt-2">
          Administra y revisa tu historial de puntos
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Points */}
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Disponibles</CardTitle>
            <Trophy className="h-5 w-5 text-indigo-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{user.puntos.toLocaleString()}</div>
            <p className="text-xs text-indigo-200 mt-2">
              Disponibles para canjear
            </p>
          </CardContent>
        </Card>

        {/* Points Earned */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Ganados</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+{totalGanado.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-2">
              Total acumulado
            </p>
          </CardContent>
        </Card>

        {/* Points Redeemed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Canjeados</CardTitle>
            <Gift className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{totalCanjeado.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-2">
              Total utilizado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso al próximo nivel</CardTitle>
          <CardDescription>
            Te faltan {(puntosParaProximoNivel - user.puntos).toLocaleString()} puntos para alcanzar el nivel Premium
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progreso} className="h-3" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Actual: {user.puntos.toLocaleString()}</span>
            <span className="font-medium text-indigo-600">Objetivo: {puntosParaProximoNivel.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>
            Todas tus actividades de puntos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transacciones.map((transaccion) => (
              <div
                key={transaccion.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaccion.tipo === 'ganado'
                        ? 'bg-green-100'
                        : 'bg-orange-100'
                    }`}
                  >
                    {transaccion.tipo === 'ganado' ? (
                      <Plus className="h-5 w-5 text-green-600" />
                    ) : (
                      <Minus className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaccion.descripcion}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <p className="text-sm text-gray-500">{formatearFecha(transaccion.fecha)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={transaccion.tipo === 'ganado' ? 'default' : 'secondary'}
                    className={
                      transaccion.tipo === 'ganado'
                        ? 'bg-green-600'
                        : 'bg-orange-600 text-white'
                    }
                  >
                    {transaccion.puntos > 0 ? '+' : ''}
                    {transaccion.puntos.toLocaleString()} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo ganar más puntos?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="text-indigo-600 font-semibold">•</span>
              <span>Realiza compras en establecimientos adheridos (1 punto por cada $1)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-semibold">•</span>
              <span>Recibe 500 puntos de bonificación cada mes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-semibold">•</span>
              <span>Refiere nuevos socios y gana 300 puntos por cada referido</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 font-semibold">•</span>
              <span>Participa en promociones especiales para duplicar tus puntos</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
