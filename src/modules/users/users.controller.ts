import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';
import { User } from 'src/entities/user.entity';
import { ICommonResponse } from 'src/interfaces/common';
import { IBodyCreateUser } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async createUser(
    @Body() body: IBodyCreateUser,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<ICommonResponse<User>> {
    return await this.userService.createUsers(body, avatar);
  }

  @Get()
  async getAllUser(
    @Query() { _limit, _page, _search },
  ): Promise<ICommonResponse<User>> {
    return await this.userService.getAllUsers({ _limit, _page, _search });
  }

  @Get(':id')
  async getUserById(@Param() params: { id: string }) {
    return this.userService.getUserById(params.id);
  }

  @Patch(':id')
  async updateUserById(@Param() params: { id: string }) {
    return this.userService.updateUserById(params.id);
  }
}
