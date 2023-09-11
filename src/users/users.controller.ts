import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { UserOwner } from '../auth/decorator/user.owner.decorator';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('users')
@Controller({path: 'users', version: '1'})
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Public()
    @ApiBody({type: CreateUserDTO})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @Roles('Admin')
    @UserOwner()
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

    @ApiBearerAuth()
    @Roles('Admin')
    @UserOwner()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiBody({type: UpdateUserDTO})
    @Patch(':id')
    async updateUserById(@Param('id') id, @Body() updateUserDto: UpdateUserDTO): Promise<User> {
        return await this.usersService.update(updateUserDto, id);
    }

    @ApiBearerAuth()
    @Roles('Admin')
    @UserOwner()
    @ApiParam({
        name: 'id',
        required: true,
        type: 'string',
    })
    @ApiBody({type: UpdateUserPasswordDTO})
    @Patch(':id/password')
    async updateUserPassword(@Request() req, @Param('id') id, @Body() updateUserPasswordDto: UpdateUserPasswordDTO): Promise<User> {
        return await this.usersService.updatePassword(updateUserPasswordDto, id, req.user);
    }
}
