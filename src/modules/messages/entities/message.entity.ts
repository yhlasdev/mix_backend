import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { TblDocument } from "src/modules/tbl-documents/entities/tbl-document.entity";
import { User } from "src/modules/user/entities/user.entity";

@Table({ tableName: 'Messages' })
export class Message extends Model<Message> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare guid: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare user_guid: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare document_guid: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare content: string;

    @BelongsTo(() => TblDocument, {
        targetKey: 'guid',
        foreignKey: 'document_guid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tblDocument: TblDocument;

    @BelongsTo(() => User, {
        targetKey: 'guid',
        foreignKey: 'user_guid'
    })
    user: User;
}
