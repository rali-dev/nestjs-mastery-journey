import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/blog.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import Users from './entities/user.entity';
import * as path from 'path';
import { I18nModule, HeaderResolver, QueryResolver, AcceptLanguageResolver  } from 'nestjs-i18n'; 
@Module({
  imports: [
  I18nModule.forRoot({
    fallbackLanguage: 'en',
    loaderOptions: {  
    path: path.join(__dirname, '/i18n/'),
    watch: true,
    },
    resolvers: [
      new HeaderResolver(['x-custom-lang']),
      new QueryResolver(['lang']),
      new AcceptLanguageResolver(),
    ]
  }),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), 
  TypeOrmModule.forFeature([Users]),
  UsersModule,
  ProductsModule,
  AuthModule
],
  controllers: [AppController, BlogController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
