# <span style="color:cyan">70. Sign-in & Sign-out</span>

Ref) &nbsp;

<br />

<span style="color:cyan"><u>버튼 클릭에 의한</u> sign in/out 사용자 인증</span>


<br />

(from 69tut Step2)

&nbsp;1. &nbsp;<span style="color:orange"><b>`Navbar.js` 내 Sign in/out 버튼 추가</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;자동으로 sign-in, sign-out 페이지로 라우팅  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;해당 `<p>` 테그에 이벤트 핸들러 함수 추가  
&nbsp; &nbsp; &nbsp; &nbsp;※ &nbsp;`signin()`, `signout()` 유무에 따른 차이 확인

```js
// components/Navbar.js

import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

function Navbar() {
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
        <li>
          <Link href='/dashboard'>
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <p>Blog</p>
          </Link>
        </li>

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
      </ul>
    </nav>
  )
}

export default Navbar
```


