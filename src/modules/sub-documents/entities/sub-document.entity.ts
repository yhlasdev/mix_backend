import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { TblDocument } from "src/modules/tbl-documents/entities/tbl-document.entity";

@Table({ tableName: 'sub_documents' })
export class SubDocument extends Model<SubDocument> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare guid: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare document_guid: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare file_path: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare file_type: string;

    @BelongsTo(() => TblDocument, {
        targetKey: 'guid',
        foreignKey: 'document_guid'
    })
    tblDocument: TblDocument;
}
