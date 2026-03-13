import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserType } from "src/enums/fieldEnums";
import { Message } from "src/modules/messages/entities/message.entity";
import { TblPlace } from "src/modules/tbl-places/entities/tbl-place.entity";

@Table({ tableName: "Users" })
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare guid: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare place_id: number;

    @Column({
        type: DataType.ENUM(...Object.values(UserType)),
        allowNull: false,
    })
    declare role: UserType;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare refresh_token: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @BelongsTo(() => TblPlace, {
        targetKey: 'id',
        foreignKey: 'place_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    place: TblPlace;

    @HasMany(() => Message, {
        sourceKey: 'guid',
        foreignKey: 'user_guid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    messages: Message[];
}
