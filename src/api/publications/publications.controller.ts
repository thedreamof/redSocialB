import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AddLikeDTO, PublicationDTO } from './dto/publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Post()
  private async create(@Body() DTO: PublicationDTO) {
    console.log(DTO);
    try {
      const publication = await this.publicationService.create(DTO);
      return publication;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  private async getPublications() {
    try {
      const publications = await this.publicationService.getAll();
      //   return { status: 'success', data: publications };
      return publications;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  private async getPublication(@Param('id') id: string) {
    try {
      const publications = await this.publicationService.get(id);
      return { status: 'success', data: publications };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('user/:id')
  private async getPublicationByUser(@Param('id') id: string) {
    try {
      const publications = await this.publicationService.getPublicationsUser(
        id,
      );
      return publications;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/addLike')
  private async addLike(@Param('id') id: string, @Body() DTO: AddLikeDTO) {
    try {
      const publication = await this.publicationService.addLike(id, DTO);
      return publication;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/deleteLike')
  private async deleteLike(@Param('id') id: string, @Body() DTO: AddLikeDTO) {
    try {
      const publication = await this.publicationService.deleteLike(id, DTO);
      return publication;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  private async deletePublication(@Param('id') id: string) {
    try {
      const publication = await this.publicationService.delete(id);
      return { status: 'success', data: publication };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
