import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catergoryDto } from 'src/dto/createCategory.dto';
import { itemDto } from 'src/dto/createItem.dto';
import { storeDto } from 'src/dto/createStore.dto';
import { itemUpdateDto } from 'src/dto/updateItem.dto';
import { updateStoreDto } from 'src/dto/updateStore.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { sellerItemService } from 'src/service/sellerItem.service';
import { SellerStoreService } from 'src/service/sellerStore.service';

@Controller('seller')
@UseGuards(AuthGuard)
export class SellerController {
  constructor(
    private sellerStoreService: SellerStoreService,
    private sellerItemService: sellerItemService,
  ) {}
  @Post('store')
  async addstore(
    @Body() createStore: storeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const addStoreInfo = await this.sellerStoreService.addStore(
      createStore,
      (req as any).userDetails,
    );
    return res.status(addStoreInfo.statusCode).json(addStoreInfo);
  }

  @Put('store/:id')
  async updateStore(
    @Body() updateStore: updateStoreDto,
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const updateStoreInfo = await this.sellerStoreService.updateStore(
      updateStore,
      id,
      (req as any).userDetails,
    );
    return res.status(updateStoreInfo.statusCode).json(updateStoreInfo);
  }

  @Delete('store/:id')
  async deleteStore(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const deleteStoreInfo = await this.sellerStoreService.deleteStore(
      id,
      (req as any).userDetails,
    );
    return res.status(deleteStoreInfo.statusCode).json(deleteStoreInfo);
  }

  @Get('store')
  async getAllStore(@Req() req: Request, @Res() res: Response) {
    const getAllStoreInfo = await this.sellerStoreService.getAllStore(
      (req as any).userDetails,
    );
    return res.status(getAllStoreInfo.statusCode).json(getAllStoreInfo);
  }

  @Post('addCategory')
  async addCategory(
    @Body() createCategory: catergoryDto,
    @Res() res: Response,
  ) {
    const createCategoryInfo =
      await this.sellerItemService.addCategory(createCategory);
    return res.status(createCategoryInfo.statusCode).json(createCategoryInfo);
  }

  @Post('item')
  async addItem(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createItemDto: itemDto,
  ) {
    const addItemInfo = await this.sellerItemService.additem(
      createItemDto,
      (req as any).userDetails,
    );
    return res.status(addItemInfo.statusCode).json(addItemInfo);
  }

  @Put('item/:id')
  async updateItem(
    @Body() updateItem: itemUpdateDto,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const updateItemInfo = await this.sellerItemService.updateItem(
      updateItem,
      id,
      (req as any).userDetails,
    );
    return res.status(updateItemInfo.statusCode).json(updateItemInfo);
  }

  @Delete('item/:id')
  async deleteItem(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const deleteIntemInfo = await this.sellerItemService.deleteItem(
      id,
      (req as any).userDetails,
    );
    return res.status(deleteIntemInfo.statusCode).json(deleteIntemInfo);
  }

  @Get('item')
  async getAllItems(@Req() req: Request, @Res() res: Response) {
    const getAllItemsInfo = await this.sellerItemService.getAllItem(
      (req as any).userDetails,
    );
    return res.status(getAllItemsInfo.statusCode).json(getAllItemsInfo);
  }
}


