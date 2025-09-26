import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const SignUp: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join Eventify and start booking amazing events
          </p>
        </div>
        <div className="flex justify-center">
          <ClerkSignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                card: 'shadow-lg',
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
