import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';


// export interface TodoObject {
//     id: number;
//     title: string;
//     completed: boolean;
// }

export class TodoModel extends Model<InferAttributes<TodoModel>, InferCreationAttributes<TodoModel>> {
    public id!: number;
    public title!: string;
    public completed!: boolean;
}

TodoModel.init({
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