"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthGuard(
  { children, }: { children: React.ReactNode; }
) {

  const { data, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }

  }, [status, data])

  if (status === 'authenticated') {

    return (

      <>
        {children}
      </>
    )
  }

  if (status === 'loading') {

    return (

      <>
        <h1>poner spiner</h1>
      </>
    )
  }





}
