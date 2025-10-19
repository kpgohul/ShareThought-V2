import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust path as needed

// Fix 2: The hook is now in its own file.
// This file exports ONLY a non-component, which is fine.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};