// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

console.log(process.env);

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    },
  },
};
