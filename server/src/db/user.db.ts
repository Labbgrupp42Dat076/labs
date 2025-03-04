import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';
import  {ForeignKey} from 'sequelize'
import { NoteModel } from './note.db';
import { TodoObject } from './todoObject.db';
import { PomodoroObject } from './pomodoroObject.db';



// export interface User{
//     id: number;
//     name: string;
//     password: string;
//     noteIds: number[];
//     todoIds: number[];
//     pomodoroIds: number[];
//     lastPomodoroSession: number;
// }

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    public id!: number;
    public name!: string;
    public password!: string;
    declare noteIds: ForeignKey<NoteModel['id']>[];
    declare todoIds: ForeignKey<TodoObject['id']>[];
    declare pomodoroIds: ForeignKey<PomodoroObject['id']>[];
    public lastPomodoroSession!: number;
}


User.init({
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
    },
    pomodoroIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER
        ),
        allowNull: false
    },
    lastPomodoroSession: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize
}
)