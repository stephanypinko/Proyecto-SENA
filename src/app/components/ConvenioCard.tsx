import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, Trophy, Info, Phone, ShieldAlert } from 'lucide-react';
import { Convenio } from '../data/convenios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface ConvenioCardProps {
  convenio: Convenio;
}

export function ConvenioCard({ convenio }: ConvenioCardProps) {
  const { user, updatePuntos } = useAuth();

  const handleCanjear = () => {
    if (!convenio.puntosRequeridos) return;

    if (user && user.puntos >= convenio.puntosRequeridos) {
      updatePuntos(-convenio.puntosRequeridos);
      toast.success(`¡Convenio canjeado! Se descontaron ${convenio.puntosRequeridos} puntos.`, {
        description: `Muestra tu carnet digital en ${convenio.nombre} para usar este beneficio.`
      });
    } else {
      toast.error('No tienes suficientes puntos para canjear este convenio.');
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={convenio.imagen}
          alt={convenio.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="line-clamp-1">{convenio.nombre}</CardTitle>
            <CardDescription className="mt-1">{convenio.categoria}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {convenio.descuento}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{convenio.descripcion}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{convenio.ubicacion}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{convenio.vigencia}</span>
          </div>
          {convenio.puntosRequeridos && (
            <div className="flex items-center gap-2 text-indigo-600 font-medium">
              <Trophy className="h-4 w-4 shrink-0" />
              <span>{convenio.puntosRequeridos} puntos</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Ver detalles
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img src={convenio.imagen} alt={convenio.nombre} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-bold">{convenio.nombre}</DialogTitle>
                <Badge>{convenio.descuento}</Badge>
              </div>
              <DialogDescription className="text-indigo-600 font-medium mt-1">
                Categoría: {convenio.categoria}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                  <Info className="h-4 w-4 text-indigo-500" /> Descripción
                </h4>
                <p className="text-gray-600">{convenio.descripcion}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" /> Beneficios del Asociado
                </h4>
                <p className="text-gray-600">
                  Descuento exclusivo de {convenio.descuento} presentando tu Carnet Digital de Afiliación.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-emerald-500" /> Ubicación
                  </h4>
                  <p className="text-gray-600">{convenio.ubicacion}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-blue-500" /> Vigencia
                  </h4>
                  <p className="text-gray-600">{convenio.vigencia}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-500" /> Contacto
                  </h4>
                  <p className="text-gray-600">+57 (300) 123-4567</p>
                </div>
                {convenio.puntosRequeridos && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-indigo-600" /> Puntos Req.
                    </h4>
                    <p className="text-gray-600">{convenio.puntosRequeridos} puntos</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Condiciones:</strong> Válido para asociados activos. Debe presentar el Carnet Digital y código QR correspondiente en caja al momento de pagar.
                </p>
              </div>
            </div>

            {convenio.puntosRequeridos && (
              <Button
                onClick={handleCanjear}
                disabled={!user || user.puntos < convenio.puntosRequeridos}
                className="w-full mt-2"
              >
                {!user || user.puntos < convenio.puntosRequeridos ? 'Puntos insuficientes' : 'Canjear Cupón'}
              </Button>
            )}
          </DialogContent>
        </Dialog>

        {convenio.puntosRequeridos && (
          <Button
            onClick={handleCanjear}
            disabled={!user || user.puntos < convenio.puntosRequeridos}
            className="w-full shrink-0"
          >
            Canjear
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
