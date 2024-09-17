import { Controller, Post, Get, Param, Body, Delete, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { multerConfig } from 'src/common/multer.config';
import { SortEventDto } from './dto/sort-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], multerConfig))
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const imageFiles = files?.images?.map(file => file.filename) || [];
    return this.eventsService.createEvent(createEventDto, imageFiles);
  }

  @Get()
  async findAll(
    @Query() filterQuery: FilterEventDto,
    @Query() searchQuery?: SearchEventDto,
    @Query() sortQuery?: SortEventDto
  ) {
    console.log('passing parameter', 'filter parameter =>', filterQuery, 'search parameter =>', searchQuery);

    return this.eventsService.getAllEvents(searchQuery || {}, sortQuery || {});
    // return this.eventsService.getAllEvents(searchQuery || {});
  }



  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventsService.getEventById(+id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    const imageFiles = files?.images?.map(file => file.filename) || [];
    return this.eventsService.updateEvent(+id, updateEventDto, imageFiles);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(+id);
  }
}
