import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [],
  exports: [],
})
export class AdminMenuModule {}
