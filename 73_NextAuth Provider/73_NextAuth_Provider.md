# <span style="color:cyan">73. NextAuth Provider</span>

Ref) &nbsp;

<br />

<span style="color:cyan">NextAuth Provider 설정 및 활용 사례</span>
- NextAuth Provider 가 범위 내의 각 리액트 컴포넌트에서 이용 가능한 useSession 인스탄스 제공  
&rarr; &nbsp;로그인 되어 session 정보 확보 시 이용해서 화면 랜더링 가능


<br />

(from 72tut)

&nbsp;1. &nbsp;<span style="color:orange"><b>Log in/out 에 따른 Home 페이지 차별화 구현</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;

```js
// pages/_app.js

import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'


// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}> 
//       <Navbar />
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

function MyApp({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  } 
}) {
  return (
    <SessionProvider session={session}> 
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
```

```js
// pages/index.js

import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { data: session, status } = useSession();
  //console.log('>>> session: ', session);
  //console.log('>>> status: ', status);

  return (
    <div className={styles.container}>
      <Head>
        // ...
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {session ? `${session.user.name}, ` : ''} Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        // ...
      </main>

      <footer className={styles.footer}>
        // ...
      </footer>
    </div>
  )
}
```
