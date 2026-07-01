import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Building2, Mail, Hash, Calendar } from 'lucide-react';

export default function Carnet() {
  const { user } = useAuth();

  if (!user) return null;

  // Generar un QR code simple con texto (en producción usarías una librería como qrcode.react)
  const qrData = `CNV:${user.numeroCarnet}:${user.id}`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Carnet Digital</h1>
        <p className="text-gray-600 mt-2">
          Presenta este carnet para acceder a tus convenios
        </p>
      </div>

      {/* Digital Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">Convenios Empresariales</p>
              <h2 className="text-2xl font-bold mt-1">{user.nombre}</h2>
            </div>
            <Badge variant="secondary" className="bg-white text-indigo-900">
              Activo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                <Hash className="h-4 w-4" />
                <span>Número de carnet</span>
              </div>
              <p className="font-mono font-semibold">{user.numeroCarnet}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                <Building2 className="h-4 w-4" />
                <span>Empresa</span>
              </div>
              <p className="font-medium">{user.empresa}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Vigencia</span>
              </div>
              <p className="font-medium">31/12/2026</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-40 h-40 bg-gray-900 flex items-center justify-center text-white text-xs font-mono break-all p-2">
                {/* En producción, esto sería un QR real */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="0" y="0" width="100" height="100" fill="white"/>
                  <g fill="black">
                    {/* Esquinas del QR */}
                    <rect x="5" y="5" width="25" height="25"/>
                    <rect x="10" y="10" width="15" height="15" fill="white"/>
                    <rect x="70" y="5" width="25" height="25"/>
                    <rect x="75" y="10" width="15" height="15" fill="white"/>
                    <rect x="5" y="70" width="25" height="25"/>
                    <rect x="10" y="75" width="15" height="15" fill="white"/>
                    {/* Patrón simulado */}
                    <rect x="40" y="15" width="5" height="5"/>
                    <rect x="50" y="15" width="5" height="5"/>
                    <rect x="45" y="25" width="5" height="5"/>
                    <rect x="55" y="25" width="5" height="5"/>
                    <rect x="40" y="35" width="5" height="5"/>
                    <rect x="50" y="35" width="5" height="5"/>
                    <rect x="60" y="35" width="5" height="5"/>
                    <rect x="35" y="45" width="5" height="5"/>
                    <rect x="45" y="45" width="5" height="5"/>
                    <rect x="55" y="45" width="5" height="5"/>
                    <rect x="65" y="45" width="5" height="5"/>
                    <rect x="40" y="55" width="5" height="5"/>
                    <rect x="50" y="55" width="5" height="5"/>
                    <rect x="60" y="55" width="5" height="5"/>
                    <rect x="35" y="65" width="5" height="5"/>
                    <rect x="45" y="65" width="5" height="5"/>
                    <rect x="70" y="40" width="5" height="5"/>
                    <rect x="80" y="40" width="5" height="5"/>
                    <rect x="75" y="50" width="5" height="5"/>
                    <rect x="70" y="60" width="5" height="5"/>
                    <rect x="80" y="60" width="5" height="5"/>
                    <rect x="40" y="75" width="5" height="5"/>
                    <rect x="50" y="75" width="5" height="5"/>
                    <rect x="60" y="75" width="5" height="5"/>
                    <rect x="70" y="75" width="5" height="5"/>
                    <rect x="80" y="75" width="5" height="5"/>
                    <rect x="45" y="85" width="5" height="5"/>
                    <rect x="55" y="85" width="5" height="5"/>
                    <rect x="75" y="85" width="5" height="5"/>
                  </g>
                </svg>
              </div>
              <p className="text-center text-gray-600 text-xs mt-2">
                Escanea para verificar
              </p>
            </div>
          </div>

          {/* Points Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-indigo-200 text-sm mb-1">Puntos acumulados</p>
            <p className="text-4xl font-bold">{user.puntos.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Instrucciones de uso</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-indigo-600">•</span>
              <span>Presenta este carnet digital en cualquier establecimiento adherido</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600">•</span>
              <span>El código QR permite verificar tu identidad y convenios activos</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600">•</span>
              <span>Asegúrate de que el carnet esté vigente antes de usarlo</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600">•</span>
              <span>Algunos convenios pueden requerir puntos para ser canjeados</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
