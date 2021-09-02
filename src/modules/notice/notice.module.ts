import { Module, HttpModule } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AdminController } from './controllers';
import { Notice, NoticeSchema } from './entities/notice.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeRepository } from './repositories/definitions/notice.repository.abstract';
import { NoticeMongo } from './repositories/notice.repository.mongoose';
import { TokenService } from '@common/services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: NoticeRepository,
      useClass: NoticeMongo,
    },
    NoticeService,
    TokenService,
  ],
  exports: [NoticeService],
})
export class NoticeModule {}
