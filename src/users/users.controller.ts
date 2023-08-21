import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/auth.decorator';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Public()
    @ApiParam(CreateUserDTO)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Delete(':id')
    async deleteUser(@Param('id') id){
        return await this.usersService.deleteById(id);
    }

    @Public()
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Public()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @Get(':id')
    async getUserById(@Param('id') id): Promise<User> {
        return await this.usersService.find(id);
    }

    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiParam(UpdateUserDTO)
    @Patch(':id')
    async updateUserById(@Param('id') id, @Body() updateUserDto: UpdateUserDTO): Promise<User> {
        return await this.usersService.update(updateUserDto, id);
    }
}
