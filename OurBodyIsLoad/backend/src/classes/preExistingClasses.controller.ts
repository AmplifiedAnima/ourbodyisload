import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { preExistingClassesService } from './preExistingClasses.service';
import { CreatePreExistingClassDto } from './dto/create-pre-existing-class.dto';

@Controller('pre-existing-classes')
export class preExistingClassesController {
  constructor(private readonly classesService: preExistingClassesService) {}

  @Get()
  findAll() {
    const allClasses = this.classesService.findAll();
    return allClasses;
  }

  @Post()
  async create(@Body() createClassDto: CreatePreExistingClassDto) {
    return this.classesService.create(createClassDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
