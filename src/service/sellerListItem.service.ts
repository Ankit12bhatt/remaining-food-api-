import { HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { globalResponse } from 'src/config/response.config';
import { reduceDto } from 'src/dto/reduce.dto';
import { updateReduceList } from 'src/dto/updateReduce.dto';
import { isStore } from 'src/interface/seller.interface';
import { isDetails } from 'src/interface/tokenValue.interface';
import { reduce } from 'src/schema/reduce.schema';
import { store } from 'src/schema/store.schema';

export class sellerListItemService {
  constructor(
    @InjectModel(reduce.name) private listModel: Model<reduce>,
    @InjectModel(store.name) private storeModel: Model<isStore>,
  ) {}
  async addListItem(
    createReduceList: reduceDto,
    id: string,
    details: isDetails,
  ): Promise<globalResponse<null>> {
    const result = await this.storeModel.findOne({ user: details.id });
    const productExists = await this.listModel.findOne({
      store: result?._id,
      item: id,
    });
    if (productExists) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'item already exists please update it for any change',
        null,
      );
    }
    const startTime = new Date(createReduceList.startTime);
    const endTime = new Date(createReduceList.endTime);

    // Calculate the duration between startTime and endTime in hours
    const durationInMillis = endTime.getTime() - startTime.getTime();
    const durationInHours = durationInMillis / (1000 * 60 * 60);

    // Check if the duration is at least 8 hours
    if (durationInHours < 8) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'endTime must be at least 8 hours apart from startTime',
        null,
      );
    }
    const addProductToListInfo = await this.listModel.create({
      store: result?._id,
      item: id,
      quantity: createReduceList.quantity,
      reducedPrice: createReduceList.reducedPrice,
      startTime: createReduceList.startTime,
      endTIme: createReduceList.endTime,
    });
    if (addProductToListInfo) {
      return new globalResponse<null>(
        HttpStatus.OK,
        true,
        'item added to the list',
        null,
      );
    }
    return new globalResponse<null>(
      HttpStatus.BAD_REQUEST,
      false,
      'Item cannot beb added to List',
      null,
    );
  }
  async updateListItem(
    updateItem: updateReduceList,
    productid: string,
    details: isDetails,
  ): Promise<globalResponse<JSON | null>> {
    console.log(updateItem);
    console.log(details);
    console.log(productid);
    const findStore = await this.storeModel.findOne({ user: details.id });
    console.log(findStore);
    if (findStore === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'store not found',
        null,
      );
    }
    const updatedItemInfo = await this.listModel.findOneAndUpdate(
      { item: productid, store: findStore._id },
      updateItem,
      { new: true },
    );
    console.log(updatedItemInfo);
    if (!updatedItemInfo) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'cannot Updated',
        null,
      );
    }
    return new globalResponse<JSON>(
      HttpStatus.OK,
      true,
      'item Updated',
      updatedItemInfo.toJSON(),
    );
  }
}
