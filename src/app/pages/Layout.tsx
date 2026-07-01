import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Gift, CreditCard, Trophy, LogOut } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const navItems = user?.role === 'admin'
    ? [
        { to: '/admin', icon: Trophy, label: 'Administración' },
        { to: '/convenios', icon: Gift, label: 'Convenios' },
      ]
    : [
        { to: '/convenios', icon: Gift, label: 'Convenios' },
        { to: '/carnet', icon: CreditCard, label: 'Carnet' },
        { to: '/puntos', icon: Trophy, label: 'Puntos' },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-lg">Convenios</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                {user.role === 'admin' ? (
                  <p className="text-xs text-indigo-600 font-semibold">Panel Admin</p>
                ) : (
                  <p className="text-xs text-gray-500">{user.puntos} puntos</p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Sidebar Navigation - Desktop */}
      <nav className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200">
        <div className="p-4 space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Adjust main content margin for desktop sidebar */}
      <style>{`
        @media (min-width: 1024px) {
          main {
            margin-left: 16rem;
          }
        }
        @media (max-width: 1023px) {
          main {
            padding-bottom: 5rem;
          }
        }
      `}</style>
    </div>
  );
}
