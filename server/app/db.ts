import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
    await sequelize.sync();
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
