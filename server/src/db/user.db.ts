import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';
import  {ForeignKey} from 'sequelize'
import { NoteModel } from './note.db';
import { TodoModel } from './todoObject.db';
import { PomodoroModel } from './pomodoroObject.db';



// export interface User{
//     id: number;
//     name: string;
//     password: string;
//     noteIds: number[];
//     todoIds: number[];
//     pomodoroIds: number[];
//     lastPomodoroSession: number;
// }

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    public id!: number;
    public name!: string;
    public password!: string;
    declare noteIds: ForeignKey<NoteModel['id']>[];
    declare todoIds: ForeignKey<TodoModel['id']>[];
}


UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noteIds: {
        type: DataTypes.ARRAY(  DataTypes.INTEGER
        ),
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