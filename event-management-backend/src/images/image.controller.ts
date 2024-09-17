import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
    async uploadFile(@UploadedFiles() files: { images?: Express.Multer.File[] }) {
        console.log(files); // Ensure files are being uploaded
        return {
            message: 'Files uploaded successfully',
            files,
        };
    }
}
