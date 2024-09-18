import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const rootDir = path.resolve(__dirname, '..', '..');
    const uploadsPath = path.join(rootDir, 'uploads');

    console.log('Root directory:', rootDir);
    console.log('Uploads directory path:', uploadsPath);
    console.log('Directory exists:', fs.existsSync(uploadsPath));

    if (fs.existsSync(uploadsPath)) {
        console.log('Directory contents:', fs.readdirSync(uploadsPath));
    } else {
        console.error('Uploads directory does not exist. Please ensure it is created manually.');
    }
    app.useStaticAssets(uploadsPath, {
        prefix: '/uploads/',
    });

    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    await app.listen(process.env.PORT);
}
bootstrap();