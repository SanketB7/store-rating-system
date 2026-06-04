import { Controller, Get, Post, Body, Param, UseGuards, Request, Query, Patch } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto, UpdateRatingDto } from '../../dtos/rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async submitRating(
    @Request() req,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingsService.submitRating(req.user.userId, createRatingDto);
  }

  @Patch(':storeId')
  @UseGuards(JwtAuthGuard)
  async updateRating(
    @Request() req,
    @Param('storeId') storeId: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingsService.updateRating(req.user.userId, storeId, updateRatingDto);
  }

  @Get('store/:storeId')
  async getStoreRatings(
    @Param('storeId') storeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ratingsService.getStoreRatings(storeId, page, limit);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserRatings(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ratingsService.getUserRatings(userId, page, limit);
  }

  @Get('my-rating/:storeId')
  @UseGuards(JwtAuthGuard)
  async getMyRating(
    @Request() req,
    @Param('storeId') storeId: string,
  ) {
    return this.ratingsService.getRatingForStore(req.user.userId, storeId);
  }
}
