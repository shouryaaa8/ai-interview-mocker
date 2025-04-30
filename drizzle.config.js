/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:m4YRENZi3Wkv@ep-plain-shape-a5veynq7.us-east-2.aws.neon.tech/ai-interview?sslmode=require',
    }
  };
  