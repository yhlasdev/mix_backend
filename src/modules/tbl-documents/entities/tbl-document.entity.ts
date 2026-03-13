import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "src/modules/messages/entities/message.entity";
import { SubDocument } from "src/modules/sub-documents/entities/sub-document.entity";
import { TblPlace } from "src/modules/tbl-places/entities/tbl-place.entity";


@Table({ tableName: 'tbl_documents' })
export class TblDocument extends Model<TblDocument> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare guid: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare place_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare documentOwner_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare documentOwner_surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare documentOwner_patronymic?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare content: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare documentOwner_address: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare dueDate: Date;

    @BelongsTo(() => TblPlace, {
        targetKey: 'id',
        foreignKey: 'place_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    place: TblPlace;

    @HasMany(() => SubDocument, {
        sourceKey: 'guid',
        foreignKey: 'document_guid'
    })
    subDocuments: SubDocument[];

    @HasMany(() => Message, {
        sourceKey: 'guid',
        foreignKey: 'document_guid'
    })
    messages: Message[];
}
