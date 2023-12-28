# <span style="color:cyan">77. Connecting to a Database</span>

Ref) &nbsp;https://medium.com/@sharareshaddev/supercharging-your-next-js-project-with-nextauth-and-mongodb-integration-94b9ef9ff22

<br />

<span style="color:cyan"><b>로그인 이후 사용자 정보(이메일, 마케팅 컨텐츠 등) 저장 위해 외부 데이터베이스와 연결</b></span>
- 모든 데이터베이스와 연결 가능 (여기선 MongoDB 와 연결)
 

<br />

(from 76tut)  

&nbsp;※ &nbsp;  

&nbsp;1. &nbsp;<span style="color:orange"><b>MongoDB 클러스터 Setup</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;https://www.mongodb.com/atlas/database  &nbsp; &larr; &nbsp;홈페이지 (keunbai@yahoo.com/il1honG!!!)  
&nbsp; &nbsp; &nbsp;- &nbsp;https://www.codeit.kr/tutorials/70/mongodb-atlas  &nbsp; &larr; &nbsp;아틀라스 사용법  
&nbsp; &nbsp; &nbsp;- &nbsp;여기선 캡쳐한 그림파일 1~8 순서대로 진행할 것 (세번째 계정/경로 지정은 뒤에서 삭제하고 편집 가능)  
&nbsp; &nbsp; &nbsp;※ &nbsp;아틀라스 DB 접속 계정 ID: keunbai, PassWD: AA3zTY83BYEjt70b

<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>MongoDB 설치</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;`npm install mongodb`

<br />

&nbsp;3. &nbsp;<span style="color:orange"><b>MongoDB 연관 configuration 설정</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;`.env.local` 파일 이용  
&nbsp; &nbsp; &nbsp;- &nbsp;`DB_URL` 은 그림 파일 9~11 참조 + 변수 편집으로 설정

```
GITHUB_ID=98f594268383334d5e60
GITHUB_SECRET=bb0675a9109fba3dd29959424c8a803f3173787c

REDIRECT=http://localhost:3000/blog

DB_USER=keunbai
DB_PASSWORD=AA3zTY83BYEjt70b
DB_URL=mongodb+srv://$DB_USER:$DB_PASSWORD@clusterdemokb.ps4lofa.mongodb.net/NextAuthDbKB?retryWrites=true&w=majority
```

<br />

&nbsp;4. &nbsp;<span style="color:orange"><b>MongoDB Adapter 설치</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;`npm install @auth/mongodb-adapter`

<br />

&nbsp;5. &nbsp;<span style="color:orange"><b>MongoDB Adapter 설정</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;https://authjs.dev/reference/adapter/mongodb  
&nbsp; &nbsp; &nbsp;- &nbsp;The MongoDB adapter does not handle connections automatically,  
&nbsp; &nbsp; &nbsp; &nbsp; so you will have to make sure that you pass the Adapter a MongoClient that is connected already  

&nbsp; &nbsp; &nbsp;① &nbsp;MongoDB client 추가  
&nbsp; &nbsp; &nbsp;② &nbsp;`[...nextauth].js` (catch all routes 파일) 內 adapter 설정  

```js
// lib/mongodb.js

//! (https://authjs.dev/reference/adapter/mongodb 복사 후 수정)
import { MongoClient } from "mongodb";

if (!process.env.DB_URL) {
  throw new Error('Invalid/Missing environment variable: "DB_URL"');
}

const uri = process.env.DB_URL;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```


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
  adapter: MongoDBAdapter(clientPromise)
})
```  

<br />

&nbsp;6. &nbsp;<span style="color:orange"><b>MongoDB Atlas 접속 확인</b></span>  
&nbsp; &nbsp; &nbsp;① &nbsp;앱 실행 + log-in  
&nbsp; &nbsp; &nbsp;② &nbsp;MongoDB Atlas 접속 후 `Database` - `Browse Collections` 內 `accounts`, `sessions`, `users` 컬랙션 생성 확인  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (그림 파일 12, 13)  