import { getSession, useSession } from 'next-auth/react';

// export default handler = async (req, res) => {
export default async function handler(req, res) {
  const session = await getSession({req});

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