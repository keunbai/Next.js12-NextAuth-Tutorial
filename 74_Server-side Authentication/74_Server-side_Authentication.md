# <span style="color:cyan">74. Server-side Authentication</span>

Ref) &nbsp;

<br />

<span style="color:cyan">`getServerSideProps()` 함수에서 authentication 처리</span>
- session 확보 이후 Client-side 에서는 확보된 인증 정보로 UI 처리
- <span style="color:orange">session 확보 이후 Server-side 에서는 `getServerSideProps()` 이용하여 컴포넌트로 관련 props 전달</span>  

&nbsp; &nbsp; &nbsp;※ &nbsp;`getStaticProps()`는 build 시에만 실행됨 &rarr; <span style="color:red">인증 시 활용 불가</span>    
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; `getServerSideProps()`는 사용자 요청 시 마다 요청 정보 활용 실행됨 &rarr; 인증 시 이용  

<br />

(from 73tut)  

&nbsp;※ &nbsp;Blog 페이지 대상  

&nbsp;1. &nbsp;<span style="color:orange"><b>Blog 페이지 대상 SSR 구현 후 authentication 적용</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;

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

  return {
    props: {
      blogData: session ? 'List of 100 personalized blogs' : 'List of free blogs',
      session  
    }
  }
}
*/


function Blog({ blogData }) {
  const session = useSession();
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

  return {
    props: {
      blogData: session ? 'List of 100 personalized blogs' : 'List of free blogs',
      //session  
    }
  }
}


export default Blog
```
