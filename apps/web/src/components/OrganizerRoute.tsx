'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserFromToken } from '@/lib/features/userSlice';

interface OrganizerRouteProps {
  children: React.ReactNode;
}

const OrganizerRoute: React.FC<OrganizerRouteProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn, role } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserFromToken(token));
    } else {
      router.replace('/signin');
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (isLoggedIn && role !== 'organizer') {
      router.replace('/unauthorized');
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || role !== 'organizer') {
    return null;
  }

  return <>{children}</>;
};

export default OrganizerRoute;
