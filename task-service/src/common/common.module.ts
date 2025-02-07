import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/common/middlewares/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class CommonModule {}
