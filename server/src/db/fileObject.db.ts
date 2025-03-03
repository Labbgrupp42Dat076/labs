import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';

export class FileObject extends Model<InferAttributes<FileObject>, InferCreationAttributes<FileObject>> {
    public id!: number;
    public path!: string;
}   

FileObject.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {
    sequelize
}
)