import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db.js'

export class User extends Model {
    declare id: number;
    declare username: string;
    declare password: string;
    declare isTeacher: boolean;
    declare accountId: string;
    declare privateKey: string;
}
  
User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING
    },
    accountId : {
        type: DataTypes.STRING
    },
    privateKey : {
        type: DataTypes.STRING
    },
    isTeacher : {
        type: DataTypes.BOOLEAN
    }
  }, { sequelize });