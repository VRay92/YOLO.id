"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserFromToken } from '@/lib/features/userSlice';

interface CustomerRouteProps {
  children: React.ReactNode;
}

const CustomerRoute: React.FC<CustomerRouteProps> = ({ children }) => {
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
    if (isLoggedIn && role !== 'customer') {
      router.replace('/unauthorized');
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || role !== 'customer') {
    return null;
  }

  return <>{children}</>;
};

export default CustomerRoute;