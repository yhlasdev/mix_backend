import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Message } from 'src/modules/messages/entities/message.entity';
import { SubDocument } from 'src/modules/sub-documents/entities/sub-document.entity';
import { TblDocument } from 'src/modules/tbl-documents/entities/tbl-document.entity';
import { TblPlace } from 'src/modules/tbl-places/entities/tbl-place.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseConfig = (): SequelizeModuleOptions => {
    const isDev = process.env.NODE_ENV === 'dev';

    const dialect = (isDev
        ? process.env.LOCAL_DB_DIALECT
        : process.env.REMOTE_DB_DIALECT) as Dialect;

    return {
        dialect,
        host: isDev ? process.env.LOCAL_DB_HOST : process.env.REMOTE_DB_HOST,
        port: Number(isDev ? process.env.LOCAL_DB_PORT : process.env.REMOTE_DB_PORT),
        username: isDev ? process.env.LOCAL_DB_USERNAME : process.env.REMOTE_DB_USERNAME,
        password: isDev ? process.env.LOCAL_DB_PASSWORD : process.env.REMOTE_DB_PASSWORD,
        database: isDev ? process.env.LOCAL_DB_NAME : process.env.REMOTE_DB_NAME,
        autoLoadModels: true,
        synchronize: true,
        logging: false,
        models: [TblDocument, TblPlace, User, SubDocument, Message]
    };
};
