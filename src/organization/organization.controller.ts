import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('organization')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post()
  async create(@Body() orgDto: any) {
    return this.orgService.create(orgDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() orgDto: any) {
    return this.orgService.update(id, orgDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.orgService.delete(id);
  }
}
