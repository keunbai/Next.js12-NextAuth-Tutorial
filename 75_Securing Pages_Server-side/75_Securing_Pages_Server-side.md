# <span style="color:cyan">75. Securing Pages - Server Side</span>

Ref) &nbsp;

<br />

<span style="color:cyan">Server side 에서 웹 페이지의 보안 확보</span>
- Sign-in 時에만 특정 페이지 접속 가능(例: Blog 페이지),  
Sign-out 時에는 (GitHub) log-in 페이지로 이동 &rarr; Sign-in 時 Blog 또는 홈페이지로 이동 


<br />

(from 73tut)  

&nbsp;※ &nbsp;Blog 페이지 대상  

&nbsp;1. &nbsp;<span style="color:orange"><b>Sign-in 시에만 특정 페이지 접속 가능(例: Blog 페이지),  
&nbsp; &nbsp; &nbsp; Sign-out 時에는 (GitHub) log-in 페이지로 이동 &rarr; Sign-in 時 Blog 또는 홈페이지로 이동</b></span>  

```js
// pages/blog.js

import { getSession, useSession } from 'next-auth/react';


/*
function Blog({ blogData, session }) {
  console.log('###', session);

  return (
    <div>
      <h1>Blog page</h1>
      <h2>{blogData}</h2>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //console.log(session);

  if (!session) {
    return {
      redirect: {
        //destination: '/api/auth/signin?callbackUrl=http://localhost:3000',      //! 홈 페이지로
        //destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog', //! Blog 페이지로
        destination: `/api/auth/signin?callbackUrl=${process.env.REDIRECT}`,      //! 보안 처리
        permanent: false
      }
    }
  }

  return {
    props: {
      blogData: 'List of 100 personalized blogs',
      session  
    }
  }
}

export default Blog
*/


function Blog({ blogData }) {
  const { data: session } = useSession();
  console.log('### session: ', session);

  return (
    <div>
      <h1>Blog page</h1>
      <h2>{blogData}</h2>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //console.log(session);

  if (!session) {
    return {
      redirect: {
        //destination: '/api/auth/signin?callbackUrl=http://localhost:3000',      //! 홈 페이지로
        //destination: '/api/auth/signin?callbackUrl=http://localhost:3000/blog', //! Blog 페이지로
        destination: `/api/auth/signin?callbackUrl=${process.env.REDIRECT}`,      //! 보안 처리
        permanent: false
      }
    }
  }

  return {
    props: {
      blogData: 'List of 100 personalized blogs'
      //session  
    }
  }
}

export default Blog
```