import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserChosenClassesService } from './user-chosen-classes.service';
import { CreateUserChosenClassDto } from './dto/create-user-chosen-class.dto';
import { RequestWithUser } from 'src/user/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserChosenClassDto } from './dto/update-user-chosen-class.dto';

@Controller('user-chosen-classes')
export class UserChosenClassesController {
  constructor(
    private readonly userChosenClassesService: UserChosenClassesService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() createUserChosenClassDto: CreateUserChosenClassDto,
    @Request() request: RequestWithUser,
  ) {
    return this.userChosenClassesService.create(
      createUserChosenClassDto,
      request.user,
    );
  }
  @UseGuards(AuthGuard())
  @Get('/user-classes')
  findClassesByUserId(@Request() request: RequestWithUser) {
    return this.userChosenClassesService.findClassesByUserId(request.user.id);
  }

  @Get()
  findAll() {
    return this.userChosenClassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChosenClassesService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Request() request: RequestWithUser,
    @Body() updateUserChosenClassDto: UpdateUserChosenClassDto,
  ) {
    return this.userChosenClassesService.editUserChosenClass(
      id,
      updateUserChosenClassDto,
      request.user,
    );
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Request() request: RequestWithUser, @Param('id') id: string) {
    return this.userChosenClassesService.removeUserChosenClass(
      id,
      request.user,
    );
  }
}
