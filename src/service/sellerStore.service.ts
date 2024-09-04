import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { globalResponse } from 'src/config/response.config';
import { storeDto } from 'src/dto/createStore.dto';
import { updateStoreDto } from 'src/dto/updateStore.dto';
import { isStore } from 'src/interface/seller.interface';
import { isDetails } from 'src/interface/tokenValue.interface';
import { store } from 'src/schema/store.schema';

@Injectable()
export class SellerStoreService {
  constructor(@InjectModel(store.name) private storeModel: Model<isStore>) {}
  async addStore(
    createStore: storeDto,
    details: isDetails,
  ): Promise<globalResponse<JSON | null>> {
    const { businessName, businessEmail, description, address, location } =
      createStore;
    const exists = await this.storeModel.findOne({
      user: details.id,
    });
    if (exists) {
      return new globalResponse<JSON | null>(
        HttpStatus.CONFLICT,
        false,
        'Name or email already taken',
        null,
      );
    }
    const newStore = await this.storeModel.create({
      user: details.id,
      businessEmail,
      businessName,
      address,
      description,
      location: [location[1], location[0]],
    });
    if (newStore) {
      return new globalResponse<JSON | null>(
        HttpStatus.CREATED,
        true,
        'store created',
        newStore.toJSON(),
      );
    }
    return new globalResponse<JSON | null>(
      HttpStatus.EXPECTATION_FAILED,
      false,
      'store cannot be created at this moment ',
      null,
    );
  }
  async updateStore(
    updateStore: updateStoreDto,
    placeId: string,
    details: isDetails,
  ): Promise<globalResponse<isStore | null>> {
    console.log(details);
    const place = await this.storeModel.findOneAndUpdate(
      { _id: placeId, user: details.id },
      updateStore,
      { new: true },
    );
    console.log(place);
    if (place) {
      return new globalResponse<isStore>(
        HttpStatus.OK,
        true,
        'Store updated',
        place.toJSON() as isStore,
      );
    } else {
      return new globalResponse<null>(
        HttpStatus.NOT_FOUND,
        false,
        'Store not found',
        null,
      );
    }
  }
  async deleteStore(
    placeId: string,
    details: isDetails,
  ): Promise<globalResponse<string | null>> {
    const deleteResult = await this.storeModel.deleteOne({
      _id: placeId,
      user: details.id,
    });
    console.log('delete result is =', deleteResult);
    if (deleteResult.acknowledged === true) {
      return new globalResponse<null>(
        HttpStatus.OK,
        true,
        'deleted successfully',
        null,
      );
    }
    return new globalResponse<null>(
      HttpStatus.BAD_REQUEST,
      false,
      'place not find',
      null,
    );
  }
  async getAllStore(
    details: isDetails,
  ): Promise<globalResponse<isStore[] | null>> {
    const storelist = await this.storeModel.find({ user: details.id });
    if (storelist) {
      return new globalResponse<isStore[]>(
        HttpStatus.OK,
        true,
        'store info',
        storelist,
      );
    }
    return new globalResponse<null>(
      HttpStatus.BAD_GATEWAY,
      false,
      'no store listed',
      null,
    );
  }
}
