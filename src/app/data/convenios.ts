export interface Convenio {
  id: string;
  nombre: string;
  categoria: string;
  descuento: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
  vigencia: string;
  puntosRequeridos?: number;
}

export const convenios: Convenio[] = [
  {
    id: '1',
    nombre: 'Restaurante El Buen Sabor',
    categoria: 'Gastronomía',
    descuento: '25% de descuento',
    descripcion: 'Disfruta de la mejor comida internacional con un descuento especial en todo el menú.',
    imagen: 'https://images.unsplash.com/photo-1762922425226-8cfe6987e7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NzQ5ODI0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Centro Comercial Plaza Norte',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 100
  },
  {
    id: '2',
    nombre: 'Fashion Store Premium',
    categoria: 'Moda',
    descuento: '30% de descuento',
    descripcion: 'Las mejores marcas de ropa y accesorios con descuentos exclusivos para socios.',
    imagen: 'https://images.unsplash.com/photo-1562280963-8a5475740a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMHJldGFpbCUyMHN0b3JlfGVufDF8fHx8MTc3NDkwMjc3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Av. Principal 456',
    vigencia: 'Hasta 30/06/2026',
    puntosRequeridos: 200
  },
  {
    id: '3',
    nombre: 'GymFit Center',
    categoria: 'Salud',
    descuento: '20% de descuento',
    descripcion: 'Membresías mensuales y anuales con descuento especial. Incluye clases grupales.',
    imagen: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd29ya291dHxlbnwxfHx8fDE3NzQ4OTA3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Zona Este, Calle Deportiva 123',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 150
  },
  {
    id: '4',
    nombre: 'Spa & Wellness Center',
    categoria: 'Salud',
    descuento: '35% de descuento',
    descripcion: 'Relájate con nuestros tratamientos de spa, masajes y terapias de bienestar.',
    imagen: 'https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMG1hc3NhZ2V8ZW58MXx8fHwxNzc0OTM3MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Hotel Gran Plaza, Piso 5',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 250
  },
  {
    id: '5',
    nombre: 'CineMax Premium',
    categoria: 'Entretenimiento',
    descuento: '2x1 en entradas',
    descripcion: 'Disfruta del mejor cine con salas premium y sonido envolvente. Promoción válida de lunes a jueves.',
    imagen: 'https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzc1MDAxMjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Múltiples ubicaciones',
    vigencia: 'Hasta 31/08/2026',
    puntosRequeridos: 180
  },
  {
    id: '6',
    nombre: 'Hotel Paradise Resort',
    categoria: 'Viajes',
    descuento: '40% de descuento',
    descripcion: 'Escápate a nuestro resort de lujo. Incluye desayuno buffet y acceso a todas las instalaciones.',
    imagen: 'https://images.unsplash.com/photo-1630528034874-d0a219463453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBob3RlbCUyMHZhY2F0aW9ufGVufDF8fHx8MTc3NTAxMTg5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Playa del Sol, Km 45',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 500
  },
  {
    id: '7',
    nombre: 'Café Aroma',
    categoria: 'Gastronomía',
    descuento: '15% de descuento',
    descripcion: 'El mejor café de especialidad y pastelería artesanal de la ciudad.',
    imagen: 'https://images.unsplash.com/photo-1643316408393-9328a1e973ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWZlJTIwbGF0dGV8ZW58MXx8fHwxNzc1MDExODkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Calle Principal 789',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 80
  },
  {
    id: '8',
    nombre: 'Farmacia Salud Total',
    categoria: 'Salud',
    descuento: '10% de descuento',
    descripcion: 'Descuento en todos los medicamentos con receta y productos de cuidado personal.',
    imagen: 'https://images.unsplash.com/photo-1765031092161-a9ebe556117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGhlYWx0aGNhcmUlMjBtZWRpY2luZXxlbnwxfHx8fDE3NzUwMTE4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ubicacion: 'Red de farmacias en toda la ciudad',
    vigencia: 'Hasta 31/12/2026',
    puntosRequeridos: 50
  }
];

export const categorias = ['Todos', 'Gastronomía', 'Moda', 'Salud', 'Entretenimiento', 'Viajes'];
