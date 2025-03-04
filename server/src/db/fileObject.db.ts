import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';

export class FileModel extends Model<InferAttributes<FileModel>, InferCreationAttributes<FileModel>> {
    public id!: number;
    public path!: string;
}   

FileModel.init({
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