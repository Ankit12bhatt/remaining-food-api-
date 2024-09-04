import { HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { globalResponse } from 'src/config/response.config';
import { catergoryDto } from 'src/dto/createCategory.dto';
import { itemDto } from 'src/dto/createItem.dto';
import { itemUpdateDto } from 'src/dto/updateItem.dto';
import { isCatergory } from 'src/interface/category.interface';
import { isStore } from 'src/interface/seller.interface';
import { isDetails } from 'src/interface/tokenValue.interface';
import { category } from 'src/schema/category.schema';
import { item } from 'src/schema/item.schema';
import { store } from 'src/schema/store.schema';

export class sellerItemService {
  constructor(
    @InjectModel(item.name) private ItemModel: Model<item>,
    @InjectModel(category.name) private categoryModel: Model<isCatergory>,
    @InjectModel(store.name) private storeModel: Model<isStore>,
  ) {}
  async addCategory(
    createCategory: catergoryDto,
  ): Promise<globalResponse<JSON | null>> {
    const category = createCategory.category.toLowerCase();
    console.log(category);
    const categoryInfo = await this.categoryModel.findOne({
      category: category,
    });
    if (categoryInfo) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'Category Already exists',
        null,
      );
    }
    const categoryAdded = await this.categoryModel.create({
      category,
    });
    if (categoryAdded) {
      return new globalResponse<JSON>(
        HttpStatus.OK,
        true,
        'category created successfully',
        categoryAdded.toJSON(),
      );
    }

    return new globalResponse<null>(
      HttpStatus.BAD_GATEWAY,
      true,
      'cannot create at the moment',
      null,
    );
  }
  async additem(
    createItem: itemDto,
    details: isDetails,
  ): Promise<globalResponse<JSON | null>> {
    const categoryId = await this.categoryModel.findOne({
      category: createItem.category,
    });
    if (categoryId === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'please give right category',
        null,
      );
    }
    const findStore = await this.storeModel.findOne({ user: details.id });
    if (findStore === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'cannot find the store',
        null,
      );
    }
    const validate = await this.ItemModel.findOne({
      store: findStore._id,
      itemName: createItem.itemName,
    });
    if (validate != null) {
      return new globalResponse<JSON>(
        HttpStatus.BAD_REQUEST,
        false,
        'item Already exists',
        validate.toJSON(),
      );
    }
    const newItem = await this.ItemModel.create({
      store: findStore._id,
      itemName: createItem.itemName,
      itemDescription: createItem.itemDescription,
      itemPrice: createItem.itemPrice,
      type: createItem.type,
      category: categoryId._id,
    });
    if (newItem) {
      return new globalResponse<JSON>(
        HttpStatus.OK,
        true,
        'created',
        newItem.toJSON(),
      );
    }
    return new globalResponse<null>(
      HttpStatus.BAD_GATEWAY,
      false,
      'cannot create at the momment',
      null,
    );
  }
  async updateItem(
    updateItem: itemUpdateDto,
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
    const updatedItem = await this.ItemModel.findOneAndUpdate(
      { _id: productid, store: findStore._id },
      updateItem,
      { new: true },
    );
    if (!updatedItem) {
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
      updatedItem.toJSON(),
    );
  }
  async deleteItem(
    id: string,
    details: isDetails,
  ): Promise<globalResponse<null>> {
    console.log(id);
    console.log(details);
    const findStore = await this.storeModel.findOne({ user: details.id });
    if (findStore === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'cannot find the store',
        null,
      );
    }
    const deleteInfo = await this.ItemModel.findOneAndDelete({
      _id: id,
      store: findStore._id,
    });
    if (deleteInfo === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'item cannot be Deleted',
        null,
      );
    }
    return new globalResponse<null>(HttpStatus.OK, true, 'item Deleted', null);
  }
  async getAllItem(details: isDetails): Promise<globalResponse<item[] | null>> {
    console.log(details);
    const findStore = await this.storeModel.findOne({ user: details.id });
    if (findStore === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'cannot find the store',
        null,
      );
    }
    const allItems = await this.ItemModel.find({ store: findStore._id });
    console.log(allItems);
    if (allItems === null) {
      return new globalResponse<null>(
        HttpStatus.BAD_REQUEST,
        false,
        'No items to show',
        null,
      );
    }
    return new globalResponse(HttpStatus.OK, true, 'list of items', allItems);
  }
}
