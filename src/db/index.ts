import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  // commenting this out makes typescript happier about the type of db.
  // if (!process.env.DATABASE_URL) {
  //   console.error("DATABASE_URL is not set");
  //   return {
  //     select: () => ({
  //       from: () => [],
  //     }),
  //   };
  // }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
