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
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Ready on ${os.hostname}:${PORT} or http://10.104.5.176:${PORT}/ or localhost:${PORT}`,
    );
    console.log(`PORT: ${PORT}`);
    console.log(`USER: ${process.env.POSTGRES_USERNAME}`);
    console.log(`PASS: ${process.env.POSTGRES_PASSWORD}`);
    console.log(`DB NAME: ${process.env.POSTGRES_DB_NAME}`);
    console.log(`PATH: ${process.env.PATH_PROJ}`);
    console.log(`PID: ${process.pid}`);
    console.log(`TIILE: ${process.title}`);
    console.log(`ARCH: ${os.arch()}`);
    os.cpus().forEach((item: os.CpuInfo) => {
      console.log(`CPU: ${item.model}`);
    });
    console.log(`UPTIME: ${process.uptime()}`);
    console.log(
      `MEMORY: ${process.memoryUsage().arrayBuffers}bt from ${os.freemem}bt`,
    );
    console.log('Process ARG:');
    process.argv.forEach((val, index) => {
      console.log(`${index}: ${val}`);
    });
    console.log('-------------------');
    const x = os.networkInterfaces();
    for (const key in x) {
      const y = x[key];
      for (const key1 in y) {
        const z = y[key1];
        for (const key2 in z) {
          console.log(`${key2}: ${z[key2]}`);
        }
        console.log('<->');
      }
    }
    console.log('-------------------');
  });
  process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
}

start();

//setTimeout(process.exit, 0, 112);
