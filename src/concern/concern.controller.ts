import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Req} from '@nestjs/common';
import { ConcernService } from './concern.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request as ExpressRequest } from 'express';

@Controller('concern')
export class ConcernController {
  constructor(private readonly concernService: ConcernService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.concernService.delete(id); 
    return {
      message: `concern deleted successfully.`,};
  }

  @UseGuards(JwtAuthGuard)
  @Get()
    async findAll() {
     const concern = await this.concernService.findAll();
     return concern;
    }

    @UseGuards(JwtAuthGuard)
   @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.concernService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
    async create(
    @Req() req: ExpressRequest,
    @Body() Body: any
    ) {
      
      const { usernameCon, concern_content } = Body;
      const userId = (req.user as any)?.id;
      
      return this.concernService.createConcern(usernameCon, concern_content, userId);
    }
    
  @Put(':id')
async update(
  @Param('id') id: number,
  @Body() data: { usernameCon?: string; concern_content?: string },
) {
    const updatedConcern = await this.concernService.updateConcern(id, data); 

    return updatedConcern;
}
}
