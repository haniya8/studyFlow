// web/src/contexts/NotificationsContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authFetch } from '../utils/api';

const NotificationsContext = createContext(null);
const NOTIFICATIONS_PATH = '/api/notifications';

export function NotificationsProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authFetch(NOTIFICATIONS_PATH);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setLoading(false);
    }
  }, [currentUser, fetchNotifications]);

  const deleteNotification = useCallback(async (id) => {
    try {
      const response = await authFetch(`${NOTIFICATIONS_PATH}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return { success: false, error: 'Could not delete notification.' };
      }
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete notification:', err);
      return { success: false, error: 'Could not reach the server.' };
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(async (id) => {
  try {
    const response = await authFetch(`${NOTIFICATIONS_PATH}/${id}/read`, {
      method: 'PATCH',
    });
    if (!response.ok) return { success: false, error: 'Could not update notification.' };
    const data = await response.json();
    setNotifications((prev) => prev.map((n) => (n.id === id ? data : n)));
    return { success: true };
  } catch (err) {
    console.error('Failed to mark notification as read:', err);
    return { success: false, error: 'Could not reach the server.' };
  }
}, []);

const markAllAsRead = useCallback(async () => {
  try {
    const response = await authFetch(`${NOTIFICATIONS_PATH}/read-all`, {
      method: 'PATCH',
    });
    if (!response.ok) return { success: false, error: 'Could not update notifications.' };
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    return { success: true };
  } catch (err) {
    console.error('Failed to mark all notifications as read:', err);
    return { success: false, error: 'Could not reach the server.' };
  }
}, []);

  return (
    <NotificationsContext.Provider
      value={{ notifications, loading, unreadCount, deleteNotification, markAsRead, markAllAsRead, refetch: fetchNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within a NotificationsProvider');
  return ctx;
}