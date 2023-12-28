import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  const { data: session, status } = useSession();
  //console.log('>>> session: ', session);
  //console.log('>>> status: ', status);

  return (
    <nav className='nav'>
      <h1 className='logo'>
        <p href='#'>NextAuth</p>
      </h1>
      <ul className={`main-nav ${!session && status === 'loading' ? 'loading' : 'loaded'}`}>
      {/* <ul className={`main-nav`}> */}
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
