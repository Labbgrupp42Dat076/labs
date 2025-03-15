import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database_url = process.env.DATABASE_URL || 'localhost:5432';
const database_user = process.env.DATABASE_USERNAME;
const database_password = process.env.DATABASE_PASSWORD;

export let sequelize : Sequelize;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  sequelize = new Sequelize(`postgres://${database_user}:${database_password}@${database_url}/`);
}

export async function initDB() {
  await sequelize.sync({alter: true, force: false});
}
