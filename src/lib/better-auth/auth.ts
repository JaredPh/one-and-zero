import { betterAuth } from "better-auth";
import { bearer, jwt } from "better-auth/plugins";
import * as PG from "pg";

export const auth = betterAuth({
  secret: process.env.VITE_BETTER_AUTH_SECRET,

  database: new PG.Pool({
    connectionString: process.env.VITE_BETTER_AUTH_DB,
    ssl: {
      rejectUnauthorized: false,
    },
  }),

  plugins: [
    jwt({
      jwt: {
        expirationTime: "1y",
      },

      jwks: {
        keyPairConfig: { alg: "EdDSA", crv: "Ed25519" },
      },
    }),

    bearer(),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {},
});
