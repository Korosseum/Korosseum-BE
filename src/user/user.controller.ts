import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.decorator';
// import { Public } from 'src/auth/public.decorator';

type UpdateUserDto = {};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @Public()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  // @Public()
  findOne(@Param('id') id: string | string[]) {
    // return this.userService.findOne(id);
  }

  @Put()
  // @Public()
  updateAll(@Body() body: any) {
    // return this.userService.updateAll(updateUserDto);
  }

  @Put(':id')
  // @Public()
  update(@Param('id') id: string, @Body() body: any) {
    // return this.userService.update(id, updateUserDto);

    console.log(id);
    console.log(body);
    return {
      id,
      body,
    };
  }

  @Post(':id/generateNickname')
  @Public()
  async generateNickname(@Param('id') id: string) {
    return await this.userService.generateNickname(id);
  }
}
