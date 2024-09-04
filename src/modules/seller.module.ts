import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SellerStoreService } from '../service/sellerStore.service';
import { SellerController } from '../controller/seller.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { store, storeSchema } from 'src/schema/store.schema';
import { sellerItemService } from 'src/service/sellerItem.service';
import { ItemSchema, item } from 'src/schema/item.schema';
import { category, categorySchema } from 'src/schema/category.schema';
import { sellerListController } from 'src/controller/sellerList.controller';
import { sellerListItemService } from 'src/service/sellerListItem.service';
import { reduce, reduceSchema } from 'src/schema/reduce.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: store.name, schema: storeSchema }]),
    MongooseModule.forFeature([{ name: item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([
      { name: category.name, schema: categorySchema },
    ]),
    MongooseModule.forFeature([{ name: reduce.name, schema: reduceSchema }]),
  ],
  providers: [SellerStoreService, sellerItemService, sellerListItemService],
  controllers: [SellerController, sellerListController],
})
export class SellerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('seller');
  }
}
