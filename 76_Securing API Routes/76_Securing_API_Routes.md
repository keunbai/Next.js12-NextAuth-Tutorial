# <span style="color:cyan">76. Securing API Routes</span>

Ref) &nbsp;

<br />

<span style="color:cyan"><b>API Routes 보안 확보</b></span>
- `getSession()` 으로 session 정보 확보 후 <u>로그인 시</u> 사용자 요청에 대한 처리 진행


<br />

(from 75tut)  

&nbsp;※ &nbsp;  

&nbsp;1. &nbsp;<span style="color:orange"><b>`pages/api` 폴더 내 `test-session` 데모 파일 생성</b></span>  

```js
// pages/api/test-session.js

import { getSession, useSession } from 'next-auth/react';

// export default handler = async (req, res) => {
export default async function handler(req, res) {
  const session = await getSession({req})

  if (!session) {
    res.status(401).json({
      error: 'Unauthenticated user'
    })
  } else {
    res.status(200).json({
      message: 'Success', 
      session
    })
  }
} 
```

<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>로그인/로그아웃 각각에 대한 api 접속</b></span>  
&nbsp; &nbsp; &nbsp;- &nbsp;`locahhost:3000/api/test-session.js`

(log-in 時)

```json
// 20231208045456
// http://localhost:3000/api/test-session

{
  "message": "Success",
  "session": {
    "user": {
      "name": "Keun-Bae Lee",
      "email": "keunbai@yahoo.com",
      "image": "https://avatars.githubusercontent.com/u/41156868?v=4"
    },
    "expires": "2024-01-06T19:54:56.042Z"
  }
}
```
<br />

(log-out 時)

```json
// 20231208045727
// http://localhost:3000/api/test-session

{
  "error": "Unauthenticated user"
}
```
