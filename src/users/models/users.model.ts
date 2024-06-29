import { Allow } from 'class-validator';
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'


export interface createUser {
    name:string;
    sername:string;
    login:string;
    password:string
}

@Table({tableName:'Users'})
export class User extends Model<User,createUser>{

    @Column({type:DataType.INTEGER, unique:true , autoIncrement:true , allowNull:false, primaryKey:true})
    id:number;

    @Column({type:DataType.STRING, allowNull: false, unique:true})
    login:string;

    @Column({type:DataType.STRING, allowNull: false})
    password:string;
    
    @Column({type:DataType.STRING, allowNull: false})
    name:string;

    @Column({type:DataType.STRING, allowNull: false})
    sername:string;

}