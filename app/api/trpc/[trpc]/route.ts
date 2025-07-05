
import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
   router: appRouter,
   createContext: () => ({
      headers: new Headers(),
      db: db,
      session: null,
   }),
});
