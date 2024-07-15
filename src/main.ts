import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as os from 'os';
import * as path from 'path';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  process.env.PATH_PROJ = path.join(__dirname, '..');

  const config = new DocumentBuilder()
    .setTitle('ToDos')
    .setDescription('Documentation')
    .setVersion('1.0')
    .addTag('To do')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document);

  // Включение CORS с кастомными настройками
  app.enableCors({
    origin: '*', // разрешить только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(PORT, '0.0.0.0', () => {
    const host = '1'; //os.networkInterfaces()['Ethernet'][1]['address'];
    console.log(
      `Ready on ${os.hostname}:${PORT} or http://${host}:${PORT}/ or localhost:${PORT}`,
    );
    console.log(`PORT: ${PORT}`);
    console.log(`USER: ${process.env.POSTGRES_USERNAME}`);
    console.log(`PASS: ${process.env.POSTGRES_PASSWORD}`);
    console.log(`DB NAME: ${process.env.POSTGRES_DB_NAME}`);
    console.log(`PID: ${process.pid}`);
    console.log(`UPTIME: ${process.uptime()}`);
    console.log(
      `MEMORY: ${process.memoryUsage().arrayBuffers}bt from ${os.freemem}bt`,
    );
  });
  process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
}

start();
