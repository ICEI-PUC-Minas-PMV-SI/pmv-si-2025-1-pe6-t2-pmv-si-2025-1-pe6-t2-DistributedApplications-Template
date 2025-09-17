import { Controller, Get, Post, Patch, Delete, Body, Param, Put } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { Review } from './review.schema';
import { UpdateReviewDto } from './dto/update.review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  async createReview(@Body() review: Review): Promise<Review> {
    return this.reviewService.createReview(review);
  }

  @Get('book/:bookId')
  async getReviewsByBookId(@Param('bookId') bookId: string): Promise<Review[]> {
    return this.reviewService.getReviewsByBookId(bookId);
  }

  @Put(':id')
  async updateReview(@Param('id') reviewId: string, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') reviewId: string): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
