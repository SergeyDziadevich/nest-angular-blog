import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './services/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature(), AdminModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
