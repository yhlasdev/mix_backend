import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TblDocument } from "src/modules/tbl-documents/entities/tbl-document.entity";
import { User } from "src/modules/user/entities/user.entity";


@Table({ tableName: 'tbl_places' })
export class TblPlace extends Model<TblPlace> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @HasMany(() => User, {
        sourceKey: 'id',
        foreignKey: 'place_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    users: User[];

    @HasMany(() => TblDocument, {
        sourceKey: 'id',
        foreignKey: 'place_id'
    })
    documents: TblDocument[];
}
