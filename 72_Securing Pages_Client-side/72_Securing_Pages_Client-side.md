# <span style="color:cyan">72. Securing Pages - Client Side</span>

Ref) &nbsp;

<br />

<span style="color:cyan">Client side 에서 웹 페이지의 보안 확보</span>
- Sign-in 시에만 특정 페이지 접속 가능(例: Dashboard 페이지),  
Sign-out 시에는 홈페이지 또는 log-in 페이지로 이동


<br />

(from 71tut)

&nbsp;1. &nbsp;<span style="color:orange"><b>Sign-in 시에만 특정 페이지 접속 가능(例: Dashboard 페이지), sign-out 시에는 홈페이지 또는 log-in 페이지로 이동</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;① &nbsp;`getSession()` : &nbsp; 비동기 함수, 인위적 시간 지연 Promise 객체(`sleep`) 로 효과 확인  
&nbsp; &nbsp; &nbsp; &nbsp;② &nbsp;`useSession()` : &nbsp; 동기 함수  
&nbsp; &nbsp; &nbsp; &nbsp;Cf) &nbsp;<span style="color:red">Nav bar 에서 Dashboard 메뉴는 항상 보여짐</span>

```js
// pages/dashboard.js

//! Case 1 
//*   - Log-out 시 홈페이지로 이동
//*   - getSession()

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
      //console.log({ session });

      await sleep(2000);      //! 인위적 지연 

      if (!session) {
        router.push("/");     //! 홈페이지로 이동
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


//! Case 2-1 
//*   - Log-out 시 Log-in 페이지로 이동
//*   - getSession()
/*
import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';

const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();   //! log-in 시 session, 아닐 시 null 반환
      //console.log({ session });

      await sleep(2000);      //! 인위적 지연 

      if (!session) {        
        signIn();             //! Log-in 페이지로 이동
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
//*   - useSession()
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
//*   - useSession()
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
```


<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>Sign-in 시에만 Nav bar 메뉴에서 Dashboard 보여줌 (Assignment!)  </b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;


```js
// components/navbar.js

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className='nav'>
      <h1 className='logo'>
        <p href='#'>NextAuth</p>
      </h1>
      <ul className={`main-nav`}>
        <li>
          <Link href='/'>
            <p>Home</p>
          </Link>
        </li>

        {session && status !== 'unauthenticated' && (        
          <li>
            <Link href='/dashboard'>
              <p>Dashboard</p>
            </Link>
          </li>
        )}

        <li>
          <Link href='/blog'>
            <p>Blog</p>
          </Link>
        </li>          

        {!session && status !== 'authenticated' && (
          <li>
            <Link href="/api/auth/signin">
              <p
                onClick={e => {
                  e.preventDefault();
                  //signIn();         // 있으나 없으나 동일 ..
                  signIn('github');   //! GitHub 제공 Sign-in UI 생략
                }}              
              >
                Sign in
              </p>
            </Link>
          </li>  
        )}

        {session && status !== 'unauthenticated' && (
          <li>
            <Link href="/api/auth/signout">
              <p
                onClick={e => {
                  e.preventDefault();
                  signOut();          //! GitHub 제공 Sign-out UI 생략
                }}              
              >
                Sign out
              </p>
            </Link>          
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
```