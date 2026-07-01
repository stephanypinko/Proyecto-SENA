import { useState } from 'react';
import { ConvenioCard } from '../components/ConvenioCard';
import { convenios, categorias } from '../data/convenios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';

export default function Convenios() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const conveniosFiltrados = convenios.filter((convenio) => {
    const cumpleCategoria =
      categoriaSeleccionada === 'Todos' || convenio.categoria === categoriaSeleccionada;
    const cumpleBusqueda =
      busqueda === '' ||
      convenio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      convenio.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Convenios disponibles</h1>
        <p className="text-gray-600 mt-2">
          Descubre todos los beneficios exclusivos para ti
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar convenios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              variant={categoriaSeleccionada === categoria ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoriaSeleccionada(categoria)}
            >
              {categoria}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        {conveniosFiltrados.length} {conveniosFiltrados.length === 1 ? 'convenio' : 'convenios'}{' '}
        {categoriaSeleccionada !== 'Todos' && `en ${categoriaSeleccionada}`}
      </div>

      {/* Grid */}
      {conveniosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conveniosFiltrados.map((convenio) => (
            <ConvenioCard key={convenio.id} convenio={convenio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron convenios</p>
          <Button
            variant="link"
            onClick={() => {
              setCategoriaSeleccionada('Todos');
              setBusqueda('');
            }}
            className="mt-2"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
