'strict mode'
const pg = require('pg');

const config = {
    user: 'docker',
    database: 'docker',
    password: 'password',
    host: 'postgres',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports = pool;

