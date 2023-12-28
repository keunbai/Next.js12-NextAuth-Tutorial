//? Old ver.
/*
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})
*/

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

//? NextAuth() 본체가 없는데??