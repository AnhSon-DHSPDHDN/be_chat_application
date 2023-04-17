import { HttpStatus, Injectable } from '@nestjs/common';
import { IBodyCreateUser } from './interfaces/users.interface';
import * as fs from 'fs';
import * as path from 'path';
import { Like, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ICommonResponse } from 'src/interfaces/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private allowedImgType = [
    'image/bmp',
    'image/jpeg',
    'image/x-png',
    'image/png',
    'image/gif',
  ];

  async updateUserById(id: string): Promise<ICommonResponse<User>> {
    console.log(id);

    return {
      status: HttpStatus.OK,
    };
  }

  async getUserById(id: string): Promise<ICommonResponse<User>> {
    const user = await this.userRepository.findOne({
      where: {
        _id: id,
      },
    });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: "CAN'T_FIND_USER",
      };
    }

    delete user.password;

    return {
      status: HttpStatus.OK,
      payload: user,
    };
  }

  async createUsers(
    body: IBodyCreateUser,
    imgFile: Express.Multer.File,
  ): Promise<ICommonResponse<User>> {
    const existedUser = await this.userRepository.findOne({
      where: {
        username: body.username,
      },
    });

    if (existedUser) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'USER_IS_EXISTED',
      };
    }

    if (!this.allowedImgType.includes(imgFile.mimetype)) {
      fs.unlink(
        path.join(__dirname, '../..', '/uploads/', imgFile.filename),
        () => null,
      );

      return {
        status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        error: 'UNSUPPORTED_MEDIA_TYPE',
      };
    }

    const salt = await bcrypt.genSalt(10);
    const user = Object.assign(new User(), {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      password: await bcrypt.hash(body.password, salt),
      avatar: imgFile.filename,
    });

    await this.userRepository.insert(user);

    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_USER_SUCCESS',
    };
  }

  async getAllUsers({
    _limit,
    _page,
    _search,
  }): Promise<ICommonResponse<User>> {
    const skip = (_page - 1) * _limit;

    const [allUsers, total] = await this.userRepository.findAndCount({
      select: {
        _id: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        role: true,
      },
      ...(_search
        ? {
            where: [
              { firstName: Like(`%${_search}%`) },
              { lastName: Like(`%${_search}%`) },
              { username: Like(`%${_search}%`) },
            ],
          }
        : {}),
      order: {
        username: 'DESC',
      },
      take: _limit,
      skip: skip,
    });

    return {
      status: HttpStatus.OK,
      payload: {
        total: total,
        data: allUsers,
      },
    };
  }
}
