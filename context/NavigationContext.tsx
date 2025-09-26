
import React, { createContext, useContext } from 'react';

export interface Page {
    name: 'home' | 'event-details' | 'dashboard' | 'tickets' | 'sign-in' | 'sign-up';
    params?: Record<string, any>;
}

interface NavigationContextType {
  navigate: (page: Page) => void;
  currentPage: Page;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
