'use client'

import { useEffect, useState } from 'react';

interface SessionUser {
  id: string;
  expires: string;
}

export function useSession() {
  const [session, setSession] = useState<{ user: SessionUser | null }>({ user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { 
    data: session,
    status: loading ? 'loading' : session.user ? 'authenticated' : 'unauthenticated'
  };
}