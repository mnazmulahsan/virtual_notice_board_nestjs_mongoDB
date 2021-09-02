import { Module, HttpModule } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { AdminController } from './controllers';
import { Instutute, InstituteSchema } from './entities/institute.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { InstituteRepository } from './repositories/definitions/institute.repository.abstract';
import { InstituteMongo } from './repositories/institute.repository.mongoose';
import { TokenService } from '@common/services/token.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Instutute.name,
      useFactory: () => {
          const schema = InstituteSchema;
          schema.plugin(require('mongoose-unique-validator'), { message: `is already taken.` });
          return schema;
      },
  }
  ]),
    MongooseModule.forFeature([
      { name: Instutute.name, schema: InstituteSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: InstituteRepository,
      useClass: InstituteMongo,
    },
    InstituteService,
    TokenService,
  ],
  exports: [InstituteService],
})
export class InstituteModule {}
