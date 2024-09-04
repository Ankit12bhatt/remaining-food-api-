import { Logger, Module } from '@nestjs/common';
import { DatabaseConnectionModule } from './database-connection/database-connection.module';
import { AuthModule } from './modules/auth.module';
import { SellerModule } from './modules/seller.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      },
    ]),
    DatabaseConnectionModule,
    AuthModule,
    SellerModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
