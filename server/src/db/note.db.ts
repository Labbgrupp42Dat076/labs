import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from './conn';
import { TodoModel } from './todoObject.db';
import { FileModel } from './fileObject.db';

// title : string,
// preview : string,
// fileID : string,
// id : number
// todoIds : number[]


export class NoteModel extends Model<InferAttributes<NoteModel>, InferCreationAttributes<NoteModel>> {
    public id!: number;
    public title!: string;
    public  preview!: string;
    declare fileID: ForeignKey<FileModel['id']>;
    declare todoIds: ForeignKey<TodoModel['id']>[];
}

NoteModel.init({
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