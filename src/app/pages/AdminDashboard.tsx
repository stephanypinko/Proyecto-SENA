import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Plus,
  Edit2,
  Trash2,
  Send,
  BarChart3,
  FileText,
  Search,
  Bell,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { convenios as initialConvenios, categorias, Convenio } from '../data/convenios';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [convenios, setConvenios] = useState<Convenio[]>(initialConvenios);
  const [busqueda, setBusqueda] = useState('');
  
  // Estados para el diálogo de creación y edición de convenios
  const [isOpen, setIsOpen] = useState(false);
  const [editingConvenio, setEditingConvenio] = useState<Convenio | null>(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Gastronomía');
  const [descuento, setDescuento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [vigencia, setVigencia] = useState('');
  const [puntosRequeridos, setPuntosRequeridos] = useState('100');
  const [activo, setActivo] = useState<Record<string, boolean>>(() => {
    const initialStatus: Record<string, boolean> = {};
    initialConvenios.forEach((c) => {
      initialStatus[c.id] = true;
    });
    return initialStatus;
  });

  // Estado para la segmentación de notificaciones
  const [notifMensaje, setNotifMensaje] = useState('');
  const [notifFiltroCat, setNotifFiltroCat] = useState('Todos');
  const [notifFiltroUbic, setNotifFiltroUbic] = useState('Todos');
  const [notificacionesEnviadas, setNotificacionesEnviadas] = useState([
    {
      id: 1,
      fecha: '2026-06-30 14:30',
      mensaje: '¡Nuevo descuento del 40% en Paradise Resort para asociados de la zona Este!',
      filtroCat: 'Viajes',
      filtroUbic: 'Zona Este',
      destinatarios: 145,
    },
    {
      id: 2,
      fecha: '2026-06-29 09:15',
      mensaje: 'Recuerda que tus puntos expiran al final de año. ¡Aprovéchalos hoy!',
      filtroCat: 'Todos',
      filtroUbic: 'Todos',
      destinatarios: 1200,
    }
  ]);

  // Estado de logs para auditoría y trazabilidad de acciones
  const [logs, setLogs] = useState([
    { id: 1, fecha: '2026-06-30 19:12', usuario: 'María González', accion: 'Redención de 100 puntos en Restaurante El Buen Sabor', modulo: 'Puntos' },
    { id: 2, fecha: '2026-06-30 18:05', usuario: 'Admin', accion: 'Activación de convenio Fashion Store Premium', modulo: 'Convenios' },
    { id: 3, fecha: '2026-06-30 14:30', usuario: 'Admin', accion: 'Envío de notificación segmentada (Viajes)', modulo: 'Notificaciones' },
    { id: 4, fecha: '2026-06-29 20:45', usuario: 'Juan Pérez', accion: 'Consulta de carné digital', modulo: 'Carné' },
    { id: 5, fecha: '2026-06-29 11:20', usuario: 'María González', accion: 'Redención de 150 puntos en GymFit Center', modulo: 'Puntos' },
  ]);

  // Datos simulados para los reportes gráficos
  const dataUsoConvenios = [
    { name: 'El Buen Sabor', usos: 420 },
    { name: 'Fashion Store', usos: 340 },
    { name: 'GymFit Center', usos: 290 },
    { name: 'CineMax', usos: 510 },
    { name: 'Paradise Resort', usos: 180 },
    { name: 'Spa Center', usos: 120 },
  ];

  const dataPuntosRedimidos = [
    { name: 'Gastronomía', value: 45000 },
    { name: 'Moda', value: 38000 },
    { name: 'Salud', value: 52000 },
    { name: 'Entretenimiento', value: 61000 },
    { name: 'Viajes', value: 90000 },
  ];

  const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

  const addLog = (accion: string, modulo: string) => {
    const nuevoLog = {
      id: Date.now(),
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuario: user?.nombre || 'Admin',
      accion,
      modulo,
    };
    setLogs((prev) => [nuevoLog, ...prev]);
  };

  const handleOpenDialog = (convenio: Convenio | null = null) => {
    if (convenio) {
      setEditingConvenio(convenio);
      setNombre(convenio.nombre);
      setCategoria(convenio.categoria);
      setDescuento(convenio.descuento);
      setDescripcion(convenio.descripcion);
      setImagen(convenio.imagen);
      setUbicacion(convenio.ubicacion);
      setVigencia(convenio.vigencia);
      setPuntosRequeridos(convenio.puntosRequeridos?.toString() || '0');
    } else {
      setEditingConvenio(null);
      setNombre('');
      setCategoria('Gastronomía');
      setDescuento('');
      setDescripcion('');
      setImagen('https://images.unsplash.com/photo-1562280963-8a5475740a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');
      setUbicacion('');
      setVigencia('Hasta 31/12/2026');
      setPuntosRequeridos('100');
    }
    setIsOpen(true);
  };

  const handleSaveConvenio = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConvenio) {
      // Modo Edición (Actualización de convenio existente)
      setConvenios((prev) =>
        prev.map((c) =>
          c.id === editingConvenio.id
            ? {
                ...c,
                nombre,
                categoria,
                descuento,
                descripcion,
                imagen,
                ubicacion,
                vigencia,
                puntosRequeridos: parseInt(puntosRequeridos) || undefined,
              }
            : c
        )
      );
      addLog(`Edición de convenio "${nombre}"`, 'Convenios');
      toast.success('Convenio actualizado correctamente.');
    } else {
      // Modo Adición (Inserción de nuevo convenio)
      const nuevoConvenio: Convenio = {
        id: Date.now().toString(),
        nombre,
        categoria,
        descuento,
        descripcion,
        imagen,
        ubicacion,
        vigencia,
        puntosRequeridos: parseInt(puntosRequeridos) || undefined,
      };
      setConvenios((prev) => [...prev, nuevoConvenio]);
      setActivo((prev) => ({ ...prev, [nuevoConvenio.id]: true }));
      addLog(`Creación de nuevo convenio "${nombre}"`, 'Convenios');
      toast.success('Convenio creado exitosamente.');
    }
    setIsOpen(false);
  };

  const handleToggleActivo = (id: string, name: string) => {
    setActivo((prev) => {
      const nuevoEstado = !prev[id];
      addLog(
        `${nuevoEstado ? 'Activación' : 'Inactivación'} de convenio "${name}"`,
        'Convenios'
      );
      toast.info(`Convenio ${name} ahora está ${nuevoEstado ? 'Activo' : 'Inactivo'}.`);
      return { ...prev, [id]: nuevoEstado };
    });
  };

  const handleDeleteConvenio = (id: string, name: string) => {
    setConvenios((prev) => prev.filter((c) => c.id !== id));
    addLog(`Eliminación de convenio "${name}"`, 'Convenios');
    toast.error(`Convenio "${name}" eliminado.`);
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifMensaje.trim()) return;

    const nuevaNotif = {
      id: Date.now(),
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      mensaje: notifMensaje,
      filtroCat: notifFiltroCat,
      filtroUbic: notifFiltroUbic,
      destinatarios: Math.floor(Math.random() * 500) + 12,
    };

    setNotificacionesEnviadas((prev) => [nuevaNotif, ...prev]);
    addLog(`Envío de notificación segmentada a ${nuevaNotif.destinatarios} asociados`, 'Notificaciones');
    toast.success('Notificación segmentada enviada con éxito.');
    setNotifMensaje('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Panel de Administración (Backoffice)
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona convenios, segmenta notificaciones y audita la plataforma de COOPERATIVA SAS.
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="md:self-start bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" /> Nuevo Convenio
        </Button>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="convenios" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger value="convenios" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Convenios
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notificaciones
          </TabsTrigger>
          <TabsTrigger value="reportes" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Reportes y Métricas
          </TabsTrigger>
          <TabsTrigger value="auditoria" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Auditoría (Logs)
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Convenios Admin */}
        <TabsContent value="convenios" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Listado de Convenios</CardTitle>
                  <CardDescription>Visualiza, edita o desactiva convenios empresariales.</CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filtrar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Puntos req.</TableHead>
                      <TableHead>Vigencia</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {convenios
                      .filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
                      .map((convenio) => (
                        <TableRow key={convenio.id}>
                          <TableCell className="font-medium">{convenio.nombre}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{convenio.categoria}</Badge>
                          </TableCell>
                          <TableCell>{convenio.descuento}</TableCell>
                          <TableCell>
                            {convenio.puntosRequeridos ? (
                              <span className="text-indigo-600 font-semibold">
                                {convenio.puntosRequeridos} pts
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{convenio.vigencia}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => handleToggleActivo(convenio.id, convenio.nombre)}
                              className="focus:outline-none transition-colors"
                            >
                              {activo[convenio.id] ? (
                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center gap-1 cursor-pointer">
                                  <ToggleRight className="h-4 w-4" /> Activo
                                </Badge>
                              ) : (
                                <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 flex items-center gap-1 cursor-pointer">
                                  <ToggleLeft className="h-4 w-4" /> Inactivo
                                </Badge>
                              )}
                            </button>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(convenio)}
                              className="h-8 w-8 text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteConvenio(convenio.id, convenio.nombre)}
                              className="h-8 w-8 text-rose-600 hover:text-rose-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Segmented Notifications */}
        <TabsContent value="notificaciones" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enviar Notificación Segmentada</CardTitle>
                <CardDescription>Envía notificaciones de interés específicas a los asociados.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendNotification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="segmentoCat">Segmentar por Categoría</Label>
                    <Select value={notifFiltroCat} onValueChange={setNotifFiltroCat}>
                      <SelectTrigger id="segmentoCat">
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat === 'Todos' ? 'Todas las categorías' : cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segmentoUbic">Segmentar por Ubicación</Label>
                    <Select value={notifFiltroUbic} onValueChange={setNotifFiltroUbic}>
                      <SelectTrigger id="segmentoUbic">
                        <SelectValue placeholder="Seleccione ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todos">Todas las ubicaciones</SelectItem>
                        <SelectItem value="Zona Este">Zona Este</SelectItem>
                        <SelectItem value="Plaza Norte">CC Plaza Norte</SelectItem>
                        <SelectItem value="Nacional">Toda la Ciudad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensajeNotif">Mensaje</Label>
                    <textarea
                      id="mensajeNotif"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Escribe el mensaje de la notificación aquí..."
                      value={notifMensaje}
                      onChange={(e) => setNotifMensaje(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Send className="h-4 w-4 mr-2" /> Enviar Notificación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Notificaciones Enviadas</CardTitle>
                <CardDescription>Registro histórico de alertas emitidas por segmento.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificacionesEnviadas.map((notif) => (
                    <div key={notif.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Cat: {notif.filtroCat}</Badge>
                          <Badge variant="outline">Ubic: {notif.filtroUbic}</Badge>
                        </div>
                        <span className="text-xs text-gray-500">{notif.fecha}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2 font-medium">{notif.mensaje}</p>
                      <div className="text-xs text-indigo-600 font-semibold">
                        Entregado a {notif.destinatarios} asociados
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Reports and Analytics */}
        <TabsContent value="reportes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Usos de Convenios Más Consultados</CardTitle>
                <CardDescription>Cantidad de veces que se ha accedido a cada convenio.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataUsoConvenios}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="usos" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Chart 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Puntos Redimidos por Categoría</CardTitle>
                <CardDescription>Distribución porcentual de redención de puntos.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={dataPuntosRedimidos}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataPuntosRedimidos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
                  {dataPuntosRedimidos.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 4: Audit Logs */}
        <TabsContent value="auditoria">
          <Card>
            <CardHeader>
              <CardTitle>Trazabilidad y Auditoría</CardTitle>
              <CardDescription>Historial de todas las acciones administrativas realizadas en la plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-gray-500 text-sm">{log.fecha}</TableCell>
                      <TableCell className="font-semibold text-gray-700">{log.usuario}</TableCell>
                      <TableCell className="text-sm text-gray-800">{log.accion}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{log.modulo}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for Creating/Editing Agreement */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <form onSubmit={handleSaveConvenio} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editingConvenio ? 'Editar Convenio' : 'Crear Nuevo Convenio'}</DialogTitle>
              <DialogDescription>
                Completa los datos del convenio. Guarda los cambios para publicarlos en la app.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="convNombre">Nombre del Convenio</Label>
                <Input
                  id="convNombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Restaurante Gourmet"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="convCat">Categoría</Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger id="convCat">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.filter(c => c !== 'Todos').map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="convDescuento">Descuento</Label>
                <Input
                  id="convDescuento"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  placeholder="Ej. 20% de descuento"
                  required
                />
              </div>

              <div className="col-span-2 space-y-1">
                <Label htmlFor="convDesc">Descripción</Label>
                <textarea
                  id="convDesc"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción detallada de beneficios y términos..."
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="convUbic">Ubicación</Label>
                <Input
                  id="convUbic"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ej. Centro Comercial"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="convVigencia">Vigencia</Label>
                <Input
                  id="convVigencia"
                  value={vigencia}
                  onChange={(e) => setVigencia(e.target.value)}
                  placeholder="Ej. Hasta 31/12/2026"
                  required
                />
              </div>

              <div className="space-y-1 col-span-2">
                <Label htmlFor="convPuntos">Puntos Requeridos para Canje</Label>
                <Input
                  id="convPuntos"
                  type="number"
                  value={puntosRequeridos}
                  onChange={(e) => setPuntosRequeridos(e.target.value)}
                  placeholder="Ej. 100"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                Guardar Convenio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
