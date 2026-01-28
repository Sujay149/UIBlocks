import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_EMAIL = 'sujayss149@gmail.com';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail === ADMIN_EMAIL) {
      setAdminEmail(storedEmail);
    }
  }, []);

  const login = (email: string) => {
    if (email === ADMIN_EMAIL) {
      setAdminEmail(email);
      localStorage.setItem('adminEmail', email);
    }
  };

  const logout = () => {
    setAdminEmail(null);
    localStorage.removeItem('adminEmail');
  };

  const isAdmin = adminEmail === ADMIN_EMAIL;

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmail, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
