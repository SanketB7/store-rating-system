import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dtos/auth.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '../../common/enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Request() req,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new Error('Only admins can create users');
    }
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
    @Query('role') role?: string,
  ) {
    const search = { name, email, address, role };
    return this.usersService.getAllUsers(page, limit, sortBy, sortOrder, search);
  }

  @Get('dashboard/stats')
  @UseGuards(JwtAuthGuard)
  async getDashboardStats(@Request() req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new Error('Only admins can access dashboard stats');
    }
    return this.usersService.getDashboardStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }
}
