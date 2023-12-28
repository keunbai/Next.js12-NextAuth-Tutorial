//! Case 1 
//*   - Log-out 시 홈페이지로 이동

import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { getSession } from 'next-auth/react';

const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();   //! log-in 시 session, 아닐 시 null 반환
      //console.log({session});
      //console.log(session);

      await sleep(2000);      //! 인위적 지연 

      if (!session) {
        router.push("/");     //! 홈페이지로 이동
      } else {
        setLoading(false);
      }
    }

    securePage();
  }, [router])

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h1>(protected) Dashboard page</h1>
      <p>You can view Dashboard Page, because you are Signed In</p>         
    </>
  )
}

export default Dashboard



//! Case 2-1 
//*   - Log-out 시 Log-in 페이지로 이동
/*
import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';

const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();   //! log-in 시 session, 아닐 시 null 반환
      //console.log({session});

      if (!session) {
        //! Log-in 페이지로 이동
        signIn();
        //signIn('github');   //! 자동 log-in 후 Dashboard 페이지 접속

      } else {
        setLoading(false);
      }
    }

    securePage();
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <h1>(protected) Dashboard page</h1>
      <p>You can view Dashboard Page, because you are Signed In</p>         
    </>
  )
}

export default Dashboard
*/


//! Case 2-2 
//*   - Log-out 시 Log-in 페이지로 이동
/*
import { useSession, signIn } from 'next-auth/react'

function Dashboard() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  })
  return (
    <>
      <h1>(protected) Dashboard page</h1>
      <p>You can view Dashboard Page, because you are Signed In</p>         
    </>
  )
}

export default Dashboard
*/


//! Case 2-3 
//*   - Log-out 시 Log-in 페이지로 이동
/*
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Dashboard() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') signIn();
  }, [status]);

  if (status !== 'authenticated') {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>(protected) Dashboard page</h1>
      <p>You can view Dashboard Page, because you are Signed In</p>         
    </>
  );
}
*/