import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import { CreateUserDto } from '../../dtos/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      address: createUserDto.address,
      password: hashedPassword,
      role: (createUserDto.role as UserRole) || UserRole.NORMAL_USER,
    });

    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    search?: { name?: string; email?: string; address?: string; role?: string },
  ) {
    let query = this.userRepository.createQueryBuilder('user');

    if (search?.name) {
      query = query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${search.name}%`,
      });
    }

    if (search?.email) {
      query = query.andWhere('LOWER(user.email) LIKE LOWER(:email)', {
        email: `%${search.email}%`,
      });
    }

    if (search?.address) {
      query = query.andWhere('LOWER(user.address) LIKE LOWER(:address)', {
        address: `%${search.address}%`,
      });
    }

    if (search?.role) {
      query = query.andWhere('user.role = :role', { role: search.role });
    }

    query = query.orderBy(`user.${sortBy}`, sortOrder);

    const skip = (page - 1) * limit;
    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data: data.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['ratings'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(userId: string, updateData: Partial<User>) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalAdmins = await this.userRepository.count({
      where: { role: UserRole.ADMIN },
    });
    const totalNormalUsers = await this.userRepository.count({
      where: { role: UserRole.NORMAL_USER },
    });
    const totalStoreOwners = await this.userRepository.count({
      where: { role: UserRole.STORE_OWNER },
    });

    return {
      totalUsers,
      totalAdmins,
      totalNormalUsers,
      totalStoreOwners,
    };
  }
}
