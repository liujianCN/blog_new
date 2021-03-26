const CLIENT = {
  development: {
    client_id: 'ddf7a99b057918bc006f',
  },
  production: {
    client_id: 'ddf7a99b057918bc006f',
  },
};
export const githubClientId = CLIENT[process.env.NODE_ENV as NodeEnv].client_id;
