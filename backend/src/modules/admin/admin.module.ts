import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminRepository } from './service/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [],
  providers: [AdminRepository],
  exports: [AdminRepository],
})
export class AdminModule {}
