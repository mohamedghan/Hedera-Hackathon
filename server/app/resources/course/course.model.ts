import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db.js'



export class Course extends Model {
    declare id: number;
    declare name: string;
    declare ownerid: string;
    declare ownername: string;
    declare contractid: string;
    declare goal: number;
}
  
Course.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerid : {
        type: DataTypes.STRING
    },
    ownername : {
        type: DataTypes.STRING
    }, 
    contractid : {
        type: DataTypes.STRING
    },
    goal : {
        type: DataTypes.NUMBER
    },
  }, { sequelize });