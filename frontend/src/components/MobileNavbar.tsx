import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, BookOpen, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const MobileNavbar = () => {
    const location = useLocation();
    const { user, setIsOpen, setIsLogin } = useAuth();

    const handleProfileClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setIsLogin(true);
            setIsOpen(true);
        }
    };

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Explorar', path: '/explore', icon: Search },
        { name: 'Bookshelf', path: '/bookshelf', icon: BookOpen, requiresAuth: true },
        { name: 'Notifications', path: '/notifications', icon: Bell, requiresAuth: true },
        { name: 'Perfil', path: user ? '/profile' : '#', icon: User, onClick: handleProfileClick }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {

                    if (item.requiresAuth && !user) return null;

                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={item.onClick}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full",
                                isActive
                                    ? "text-primary"
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="text-xs mt-1">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNavbar;