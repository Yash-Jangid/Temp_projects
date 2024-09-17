import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image) private readonly imageModel: typeof Image) { }

    async create(createImageDto: CreateImageDto): Promise<Image> {
        return this.imageModel.create(createImageDto);
    }

    async findAll(): Promise<Image[]> {
        return this.imageModel.findAll();
    }
}