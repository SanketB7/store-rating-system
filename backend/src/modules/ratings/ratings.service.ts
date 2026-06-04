import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../../entities/rating.entity';
import { User } from '../../entities/user.entity';
import { Store } from '../../entities/store.entity';
import { CreateRatingDto, UpdateRatingDto } from '../../dtos/rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async submitRating(userId: string, createRatingDto: CreateRatingDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const store = await this.storeRepository.findOne({
      where: { id: createRatingDto.storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const existingRating = await this.ratingRepository.findOne({
      where: {
        userId,
        storeId: createRatingDto.storeId,
      },
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this store');
    }

    const rating = this.ratingRepository.create({
      rating: createRatingDto.rating,
      userId,
      user,
      storeId: createRatingDto.storeId,
      store,
    });

    await this.ratingRepository.save(rating);
    return rating;
  }

  async updateRating(userId: string, storeId: string, updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingRepository.findOne({
      where: {
        userId,
        storeId,
      },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    rating.rating = updateRatingDto.rating;
    await this.ratingRepository.save(rating);

    return rating;
  }

  async getRatingForStore(userId: string, storeId: string) {
    const rating = await this.ratingRepository.findOne({
      where: {
        userId,
        storeId,
      },
    });

    return rating || null;
  }

  async getStoreRatings(storeId: string, page: number = 1, limit: number = 10) {
    const [ratings, total] = await this.ratingRepository.findAndCount({
      where: { storeId },
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const avgRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.storeId = :storeId', { storeId })
      .select('AVG(rating.rating)', 'avgRating')
      .getRawOne();

    return {
      ratings,
      averageRating: avgRating?.avgRating || 0,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserRatings(userId: string, page: number = 1, limit: number = 10) {
    const [ratings, total] = await this.ratingRepository.findAndCount({
      where: { userId },
      relations: ['store'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      ratings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTotalRatingsCount() {
    return this.ratingRepository.count();
  }
}
