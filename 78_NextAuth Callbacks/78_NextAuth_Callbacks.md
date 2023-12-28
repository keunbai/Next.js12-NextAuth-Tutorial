# <span style="color:cyan">78. NextAuth Callbacks</span>

Ref) &nbsp;https://velog.io/@junsugi/Next.js-Callbacks-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84

<br />

<span style="color:cyan"><b>로그인 時 `session.user` 객체 內 `name`, `email`, `image` 정보만 기본 포함  
&nbsp; &nbsp; &nbsp; &nbsp; &rarr; &nbsp;CRUD 등 구현 위해 ID 포함 로그인 사용자 특정하는 추가 정보 필요</b></span>

<br />

(from 77tut)  

&nbsp;※ &nbsp;`session` 객체 內 고유 id 속성 포함시킴

&nbsp;1. &nbsp;<span style="color:orange"><b>`[...nextauth].js` (catch all routes 파일) 內 관련 콜백 함수 설정</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;`jwt()`  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;json 웹 토큰(jwt) 생성/업데이트 시 마다 `jwt()` 콜백 함수 호출   
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;`user` 객체 파라미터로부터 GitHub 제공하는 user ID 확보 후 `token` 객체 파라미터에 추가  
&nbsp; &nbsp; &nbsp;- &nbsp;`session()`  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;`token` 객체는 devTool 에서 확인 不可 &nbsp; &rarr; &nbsp; `session()` 콜백 함수 이용  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;앱 기본 `session` 객체 내 GitHub 제공 사용자 id 정보 추가 저장  
<br />
&nbsp; &nbsp; &nbsp;&rarr; &nbsp; <u>Server 또는 Client 에서 추가 session 정보 이용해서 CRUD 등 구현 가능</u>  

<br />

(before)
<p><center><img src=./session_before.png width="90%"></center></p>  

<br />

(after)
<p><center><img src=./session_after.png width="90%"></center></p>  

<br />

```js
// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    //async jwt(token, user) {        //? invalid
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id            //! 로그인 시 GitHub 제공 사용자 id 확보
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;     //! session 파라미터 == 앱 기본 session -> session 內 사용자 id 정보 추가 

      return session;
    }
  }
})
```