const NodeEnvironment = require('jest-environment-node');
const { execSync } = require('child_process');
const { resolve } = require('path');
const { Client } = require('pg');

require('dotenv').config({
  path: resolve(__dirname, '..', '..', '..', '..', '.env.test'),
});

class CustomEnvironment extends NodeEnvironment {
  constructor (config) {
    super(config);

    this.connectionString = process.env.POSTGRES_DB_URL;
  }

  setup() {
    process.env.POSTGRES_DB_URL = this.connectionString;
    this.global.process.env.POSTGRES_DB_URL = this.connectionString;

    execSync(`yarn prisma migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "tests" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;
