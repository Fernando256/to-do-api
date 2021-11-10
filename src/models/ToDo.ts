import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ToDoInstance extends Model {
    id_todos: number;
    title: string;
    done: boolean;
}

export const ToDo = sequelize.define<ToDoInstance>('ToDo', {
    id_todos: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    done: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
}, 
    {
        tableName: 'todos',
        timestamps: false //quando foi feito CREATED AT
    }
);