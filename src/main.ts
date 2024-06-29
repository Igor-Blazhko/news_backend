import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";



async function start() {  
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
                    .setTitle('ToDos')
                    .setDescription('Documentation')
                    .setVersion('1.0')
                    .addTag('To do')
                    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/documentation',app, document)

  app.enableCors();

  // Включение CORS с кастомными настройками
  app.enableCors({
    origin: '*', // разрешить только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(PORT,()=>{
    console.log(`Ready on http://localhosh:${PORT} or http://127.0.0.1:${PORT}/`)
    console.log(`PORT: ${PORT}`)
    console.log(`USER: ${process.env.POSTGRES_USERNAME}`)
    console.log(`PASS: ${process.env.POSTGRES_PASSWORD}`)
    console.log(`DB NAME: ${process.env.POSTGRES_DB_NAME}`)
  })
}



start();