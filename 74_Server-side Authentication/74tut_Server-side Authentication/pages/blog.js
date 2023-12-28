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

  return {
    props: {
      blogData: session ? 'List of 100 personalized blogs' : 'List of free blogs',
      //session  
    }
  }
}

export default Blog

