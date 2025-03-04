import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
export let sequelize : Sequelize;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  sequelize = new Sequelize('postgres://postgres@localhost:5432/');
}

export async function initDB() {
  await sequelize.sync({alter: true, force: false});
}
