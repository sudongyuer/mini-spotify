import { time } from "console"
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token:any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Replace if new one came back elese fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET! ,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages:{
    signIn:'/login'
  },
  callbacks:{
    async jwt({token,account,user}){
      console.log('hhhhhhhhhhhh')
      //initial sign in
     if(account && user){
      return {
        ...token,
        accessToken: account.access_token,
        refreshToken: account.refresh_token,
        username: account.providerAccountId,
        accessTokenExpires: account.expires_at!* 1000, // we are handling expiry times in Milliseconds hence * 1000
      };
     }

     //Return previous token if the access token has not expired yet
     //@ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }

    // Access token has expired, try to update it
        console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
        return await refreshAccessToken(token);
    },
    async session({ session, token }:any) {

      console.log('session~~~~')
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    }
  },
})
