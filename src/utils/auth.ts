// Authentication utility functions using localStorage

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AUTH_KEY = "redbus_auth";
const USERS_KEY = "redbus_users";

// Get all registered users
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current auth state
export const getAuthState = (): AuthState => {
  const auth = localStorage.getItem(AUTH_KEY);
  if (auth) {
    return JSON.parse(auth);
  }
  return { isAuthenticated: false, user: null };
};

// Save auth state
const saveAuthState = (state: AuthState): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

// Generate unique ID
const generateId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Sign up a new user
export const signUp = (
  name: string,
  email: string,
  password: string,
  phone?: string
): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();

  // Check if email already exists
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Email already registered" };
  }

  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    phone,
    createdAt: new Date().toISOString(),
  };

  // Store password separately (in real app, this would be hashed)
  const userPasswords = JSON.parse(localStorage.getItem("redbus_passwords") || "{}");
  userPasswords[newUser.id] = password;
  localStorage.setItem("redbus_passwords", JSON.stringify(userPasswords));

  users.push(newUser);
  saveUsers(users);

  // Auto login after signup
  saveAuthState({ isAuthenticated: true, user: newUser });

  return { success: true, user: newUser };
};

// Login user
export const login = (
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: "Email not found. Please sign up first." };
  }

  const userPasswords = JSON.parse(localStorage.getItem("redbus_passwords") || "{}");
  if (userPasswords[user.id] !== password) {
    return { success: false, error: "Incorrect password" };
  }

  saveAuthState({ isAuthenticated: true, user });
  return { success: true, user };
};

// Logout user
export const logout = (): void => {
  saveAuthState({ isAuthenticated: false, user: null });
};

// Update user profile
export const updateProfile = (
  userId: string,
  updates: Partial<Pick<User, "name" | "phone">>
): { success: boolean; user?: User } => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return { success: false };
  }

  users[index] = { ...users[index], ...updates };
  saveUsers(users);

  const authState = getAuthState();
  if (authState.user?.id === userId) {
    saveAuthState({ ...authState, user: users[index] });
  }

  return { success: true, user: users[index] };
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAuthState().isAuthenticated;
};

// Get current user
export const getCurrentUser = (): User | null => {
  return getAuthState().user;
};
