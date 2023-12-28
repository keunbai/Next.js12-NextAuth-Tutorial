# <span style="color:cyan">71. Client-side Authentication</span>

Ref) &nbsp;

<br />

<span style="color:cyan">클라이언트 사이드(웹 브라우저)에서 사용자의 로그인 상태에 따라 차별화된 UI 구현</span>
- sign in 時 'sign out' 버튼만, sign out 時 'sign in' 버튼만 표시


<br />

(from 70tut)

&nbsp;1. &nbsp;<span style="color:orange"><b>sign in 時 'sign out' 버튼만, sign out 時 'sign in' 버튼만 표시</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;`_app.js` 內 `next-auth` 제공 `<SessionProvider>` 적용 (상세 내용 tut73 참조)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;`next-auth` 제공 `useSession()` hook 이용  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;이전 상태가 sign-in 즉 cache 에 session-token 있을 경우 처음 접속 시 sign-in 상태 유지  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &rarr; <span style="color:orange">&nbsp;앱 종료 시 sing-out 처리 필수!</span>  

```js
// pages/_app.js

import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
```

```js
// components/Navbar.js

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
        // ...

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
<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>Flicker 문제 해결</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;'sign in'/'sign out' 버튼 클릭 시 flicker 발생  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;세션을 클라이언트 사이드에서 결정 &rarr; 컴포넌트 렌더링 이후 sign-in/sign-out UI 확정 &rarr; delay 발생  

```css
/* components/Navbar.css */

.loading {
  opacity: 0;
  transition: all 0.2s ease-in;
}

.loaded {
  opacity: 1;
  transition: all 0.2s ease-in;
}
```

```js
// components/Navbar.js

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className='nav'>
      <h1 className='logo'>
        <p href='#'>NextAuth</p>
      </h1>
      <ul className={`main-nav ${!session && status === 'loading' ? 'loading' : 'loaded'}`}>
        // ...
      </ul>
    </nav>
  )
}

export default Navbar
```