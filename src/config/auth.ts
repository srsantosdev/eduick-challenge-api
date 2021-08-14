export const auth = {
  jwt: {
    secrets: {
      appSecret: process.env.APP_SECRET || 'default_normal',
    },
    expiresIn: '1d',
  },
};
