/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { reduceDto } from 'src/dto/reduce.dto';
import { updateReduceList } from 'src/dto/updateReduce.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { sellerListItemService } from 'src/service/sellerListItem.service';

@Controller('seller')
@UseGuards(AuthGuard)
export class sellerListController {
  constructor(private sellerListItemService: sellerListItemService) {}

  @Post('reducedList/:id')
  async addReduceList(
    @Body() createReduceList: reduceDto,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const addReduceListInfo = await this.sellerListItemService.addListItem(
      createReduceList,
      id,
      (req as any).userDetails,
    );
    return res.status(addReduceListInfo.statusCode).json(addReduceListInfo);
  }
  @Put('reducedList/:id')
  async updateReduceList(
    @Body() updateReduceList: updateReduceList,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const updateReduceListInfo =
      await this.sellerListItemService.updateListItem(
        updateReduceList,
        id,
        (req as any).userDetails,
      );
    return res
      .status(updateReduceListInfo.statusCode)
      .json(updateReduceListInfo);
  }
}
