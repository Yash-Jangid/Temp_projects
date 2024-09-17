import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { SearchEventDto } from './dto/search-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) { }

  // Create Event with images
  async createEvent(createEventDto: CreateEventDto, imageFiles: string[]) {
    return this.eventModel.create({
      ...createEventDto,
      images: imageFiles, // Store the uploaded images
    });
  }

  // Get all events with pagination, filter, and search
  async getAllEvents(
    paginationQuery: PaginationQueryDto,
    filterQuery: FilterEventDto,
    searchQuery: SearchEventDto,
  ) {
    const { limit, offset } = paginationQuery;
    const whereClause = {};

    // Apply filtering (e.g., by name or date)
    if (filterQuery.name) {
      whereClause['name'] = filterQuery.name;
    }
    if (filterQuery.startDate) {
      whereClause['startDate'] = filterQuery.startDate;
    }

    return this.eventModel.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });
  }

  // Get event by ID
  async getEventById(id: number) {
    return this.eventModel.findByPk(id);
  }

  // Update event with new data, including images
  async updateEvent(id: number, updateEventDto: UpdateEventDto, imageFiles: string[]) {
    const event = await this.eventModel.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }

    if (imageFiles.length > 0) {
      event.images = imageFiles; // If new images are provided, update them
    }

    return event.update({
      ...updateEventDto,
    });
  }

  // Delete event
  async deleteEvent(id: number) {
    const event = await this.eventModel.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }

    await event.destroy();
    return { message: 'Event deleted successfully' };
  }
}
