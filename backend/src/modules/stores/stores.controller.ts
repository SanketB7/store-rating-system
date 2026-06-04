import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto } from '../../dtos/store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '../../common/enums/user-role.enum';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStore(
    @Request() req,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new Error('Only admins can create stores');
    }
    return this.storesService.createStore(createStoreDto);
  }

  @Get()
  async getAllStores(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
  ) {
    const search = { name, email, address };
    return this.storesService.getAllStores(page, limit, sortBy, sortOrder, search);
  }

  @Get(':id')
  async getStoreById(@Param('id') storeId: string) {
    return this.storesService.getStoreById(storeId);
  }
}
