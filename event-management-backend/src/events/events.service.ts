import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { Op } from 'sequelize';
import { SortEventDto } from './dto/sort-event.dto';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) { }

  // Create Event with images
  async createEvent(createEventDto: CreateEventDto, imageFiles: string[]): Promise<Event> {
    const event = await this.eventModel.create({ ...createEventDto, images: imageFiles });
    return event;
  }

  async getAllEvents(
    searchQuery: SearchEventDto,
    sortQuery: SortEventDto
  ) {
    // Build the where clause for filtering and searching
    const whereClause: any = {};

    // Add search conditions
    if (searchQuery) {
      const searchConditions: any[] = [];
      Object.keys(searchQuery).forEach((key) => {
        if (searchQuery[key] !== undefined && searchQuery[key] !== null) {
          // Create search conditions for each column
          searchConditions.push({
            [Op.or]: [
              { name: { [Op.like]: `%${searchQuery[key]}%` } },
              { description: { [Op.like]: `%${searchQuery[key]}%` } }
            ],
          });
        }
      });

      if (searchConditions.length > 0) {
        whereClause[Op.and] = searchConditions;
      }
    }

    // Add sorting conditions
    const order: any[] = [];
    if (sortQuery) {
      Object.keys(sortQuery).forEach((key) => {
        if (sortQuery[key] && ['ASC', 'DESC'].includes(sortQuery[key].toUpperCase())) {
          order.push([key, sortQuery[key].toUpperCase()]);
        }
      });
    }

    try {
      const { count, rows } = await this.eventModel.findAndCountAll({
        where: whereClause,
        order  // Apply the sorting
      });

      return {
        count,
        rows,
      };
    } catch (error) {
      // Handle errors if needed
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
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
