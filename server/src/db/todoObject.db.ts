import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';


// export interface TodoObject {
//     id: number;
//     title: string;
//     completed: boolean;
// }

export class TodoObject extends Model<InferAttributes<TodoObject>, InferCreationAttributes<TodoObject>> {
    public id!: number;
    public title!: string;
    public completed!: boolean;
}

TodoObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize
}
)