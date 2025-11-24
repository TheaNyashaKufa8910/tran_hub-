import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ngo' | 'donor' | 'auditor';
  avatar?: string;
}

interface StoredUser extends User {
  password: string;
}

const AUTH_USER_KEY = 'auth_user';
const REGISTERED_USERS_KEY = 'registered_users';

const getStoredUsers = (): StoredUser[] => {
  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse stored users', error);
    return [];
  }
};

const persistUsers = (users: StoredUser[]) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'ngo' | 'donor' | 'auditor') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const registeredUsers = getStoredUsers();
    const existingUser = registeredUsers.find(
      (storedUser) => storedUser.email === email && storedUser.password === password
    );

    if (!existingUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const { password: _password, ...publicUser } = existingUser;

    setUser(publicUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string, role: 'ngo' | 'donor' | 'auditor') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: StoredUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      password,
    };

    const existingUsers = getStoredUsers();
    const updatedUsers = [
      ...existingUsers.filter((storedUser) => storedUser.email !== email),
      newUser,
    ];
    persistUsers(updatedUsers);

    const { password: _password, ...publicUser } = newUser;

    setUser(publicUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(publicUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
