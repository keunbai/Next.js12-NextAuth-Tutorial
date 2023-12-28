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

