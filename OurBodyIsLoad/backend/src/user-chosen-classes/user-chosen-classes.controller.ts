import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { UserChosenClassesService } from './user-chosen-classes.service';
import { CreateUserChosenClassDto } from './dto/create-user-chosen-class.dto';
import { RequestWithUser } from 'src/user/user.interface';
import { AuthGuard } from '@nestjs/passport';
// import { preExistingClassesService } from 'src/classes/preExistingClasses.service';

@Controller('user-chosen-classes')
export class UserChosenClassesController {
  constructor(
    private readonly userChosenClassesService: UserChosenClassesService, // private readonly classesToBeUsedService: preExistingClassesService,
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChosenClassesService.remove(+id);
  }
}
