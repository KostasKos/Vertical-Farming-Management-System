'use client'

import { Bell, Moon, Sun, LogOut, X } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/lib/auth'
import { jwtDecode } from 'jwt-decode'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const [notifications, setNotifications] = useState<any[]>([]);

  const storedToken = localStorage.getItem('authToken');
  if (!storedToken) {
    console.error('Auth token is missing');
    return;
  }
  
  let userId = null;
  let userRole = null;
  try {
    const decodedToken = jwtDecode(storedToken);
    userId = decodedToken.id;
    userRole = decodedToken.role;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return;
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5015/sensor-maintenance?user_id=${userId}&role=${userRole}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch logs');

      const data = await response.json();
      if (data.status === 'success') {
        const newLogs = data.data
          .filter((log) => log.status === 'Warning' || log.status === 'Critical')
          .slice(0, 3)
          .map((log) => ({
            id: log.id,
            message: log.review,
            sensorId: log.sensor_id,
            status: log.status,
            timestamp: log.datetime_review,
          }));

        setNotifications((prev) => {
          const merged = [...newLogs, ...prev].reduce((acc, log) => {
            if (!acc.some(existing => existing.id === log.id)) acc.push(log);
            return acc;
          }, []);
          localStorage.setItem('notifications', JSON.stringify(merged));
          return merged;
        });
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  const removeNotification = (id: number) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleLogout = () => {
    logout();
    router.push('/sign-in');
    localStorage.removeItem('dashboardItems');
    localStorage.removeItem('notifications');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-green-500 dark:text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 2L7 7H3v4l5 5" />
            <path d="M12 2l5 5h4v4l-5 5" />
            <path d="M12 22V12" />
          </svg>
          <span className="font-semibold dark:text-white">Agrisense</span>
        </Link>
        <nav className="flex gap-6">
          {['dashboard', 'devices', 'logs', 'maintenance', 'settings'].map((item) => (
            <Link key={item} href={`/${item}`} className={`font-medium px-3 py-2 rounded-md ${pathname === `/${item}` ? 'bg-muted/50 dark:bg-gray-800' : 'text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white'}`}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {notifications.length === 0 ? (
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            ) : (
              <>
                <div className="flex justify-between items-center p-2 border-b">
                  <span className="font-semibold">Warnings & Critical Logs</span>
                  <Button variant="ghost" size="sm" onClick={clearAllNotifications}>Clear All</Button>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className={`flex items-center justify-between p-2 rounded-md ${notification.status === 'Warning' ? 'bg-yellow-300 bg-opacity-75 text-black p-4 rounded' : 'bg-red-600 bg-opacity-75 text-black p-4 rounded'}`}>
                      <span>{`${notification.message} (Sensor: ${notification.sensorId})`}</span>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); removeNotification(notification.id); }}>
                        <X className="h-4 w-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="icon" onClick={() => { document.documentElement.classList.toggle('dark'); setIsDark(!isDark); }} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <time className="text-sm text-gray-600 dark:text-gray-300">
          {new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
        </time>
        {user && <Button variant="outline" size="icon" onClick={handleLogout} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"><LogOut className="h-5 w-5" /></Button>}
      </div>
    </header>
  )
}
