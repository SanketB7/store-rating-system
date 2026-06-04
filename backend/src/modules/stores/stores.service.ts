import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../entities/store.entity';
import { Rating } from '../../entities/rating.entity';
import { CreateStoreDto, UpdateStoreDto } from '../../dtos/store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async createStore(createStoreDto: CreateStoreDto) {
    const existingStore = await this.storeRepository.findOne({
      where: { email: createStoreDto.email },
    });

    if (existingStore) {
      throw new BadRequestException('Store email already exists');
    }

    const store = this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);

    return store;
  }

  async getAllStores(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search?: { name?: string; email?: string; address?: string },
  ) {
    let query = this.storeRepository.createQueryBuilder('store');

    if (search?.name) {
      query = query.andWhere('LOWER(store.name) LIKE LOWER(:name)', {
        name: `%${search.name}%`,
      });
    }

    if (search?.email) {
      query = query.andWhere('LOWER(store.email) LIKE LOWER(:email)', {
        email: `%${search.email}%`,
      });
    }

    if (search?.address) {
      query = query.andWhere('LOWER(store.address) LIKE LOWER(:address)', {
        address: `%${search.address}%`,
      });
    }

    query = query.orderBy(`store.${sortBy}`, sortOrder);

    const skip = (page - 1) * limit;
    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    // Calculate average rating for each store
    const storesWithRatings = await Promise.all(
      data.map(async (store) => {
        const avgRating = await this.ratingRepository
          .createQueryBuilder('rating')
          .where('rating.storeId = :storeId', { storeId: store.id })
          .select('AVG(rating.rating)', 'avgRating')
          .getRawOne();

        return {
          ...store,
          averageRating: avgRating?.avgRating || 0,
        };
      }),
    );

    return {
      data: storesWithRatings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getStoreById(storeId: string) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const avgRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.storeId = :storeId', { storeId })
      .select('AVG(rating.rating)', 'avgRating')
      .getRawOne();

    return {
      ...store,
      averageRating: avgRating?.avgRating || 0,
    };
  }

  async updateStore(storeId: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    Object.assign(store, updateStoreDto);
    await this.storeRepository.save(store);

    return store;
  }

  async deleteStore(storeId: string) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    await this.storeRepository.remove(store);
    return { message: 'Store deleted successfully' };
  }

  async getTotalStoresCount() {
    return this.storeRepository.count();
  }
}
