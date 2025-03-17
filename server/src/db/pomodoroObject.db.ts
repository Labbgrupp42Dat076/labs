import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from './conn';

// export interface PomodoroObject {
//     id: number;
//     startTime: number;
//     endTime: number;
//     duration: number; // duration in minutes
// }

export class PomodoroModel extends Model<InferAttributes<PomodoroModel>, InferCreationAttributes<PomodoroModel>> {
    public id!: number;
    public startTime!: number;
    public endTime!: number;
    public duration!: number;
}

PomodoroModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize
}
)