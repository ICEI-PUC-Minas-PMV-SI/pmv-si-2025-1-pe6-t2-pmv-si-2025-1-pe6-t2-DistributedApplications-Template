import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './review.repository';
import { Review } from './review.schema';
import { UpdateReviewDto } from './dto/update.review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewsRepository) {}

  async createReview(review: Review): Promise<Review> {
    return this.reviewRepository.create(review);
  }

  async getReviewsByBookId(bookId: string): Promise<Review[]> {
    return this.reviewRepository.findByBookId(bookId);
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewRepository.update(reviewId, updateReviewDto);
  }

  async deleteReview(reviewId: string): Promise<void> {
    return this.reviewRepository.delete(reviewId);
  }
}
