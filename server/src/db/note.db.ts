import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';

// title : string,
// preview : string,
// fileID : string,
// id : number
// todoIds : number[]


export class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
    public id!: number;
    public title!: string;
    public  preview!: string;
    public fileID!: number;
    public todoIds!: number[];
}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preview: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    todoIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER
        ),
        allowNull: false
    }
}, {
    sequelize
}
)