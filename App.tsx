
import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationContext, Page } from './context/NavigationContext';
import Layout from './components/common/Layout';
import Home from './components/pages/Home';
import EventDetails from './components/pages/EventDetails';
import Dashboard from './components/pages/Dashboard';
import Tickets from './components/pages/Tickets';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>({ name: 'home' });

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage.name) {
      case 'event-details':
        return <EventDetails eventId={currentPage.params?.id as number} />;
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <Tickets />;
      case 'sign-in':
        return <SignIn />;
      case 'sign-up':
        return <SignUp />;
      case 'home':
      default:
        return <Home />;
    }
  };

  // Replace with your actual Clerk publishable key
  const clerkPubKey = (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_YXdha2UtcGlrYS04OS5jbGVyay5hY2NvdW50cy5kZXYk';

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
        <NavigationContext.Provider value={{ navigate, currentPage }}>
          {currentPage.name === 'sign-in' || currentPage.name === 'sign-up' ? (
            <AnimatePresence mode="wait">
              {React.cloneElement(renderPage(), { key: currentPage.name })}
            </AnimatePresence>
          ) : (
            <Layout>
              <AnimatePresence mode="wait">
                {React.cloneElement(renderPage(), { key: currentPage.name })}
              </AnimatePresence>
            </Layout>
          )}
        </NavigationContext.Provider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;
