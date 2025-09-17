import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update.review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';

@Injectable()
export class ReviewsRepository {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>) {}

  async create(review: Review): Promise<Review> {
    return new this.reviewModel(review).save();
  }

  async findByBookId(bookId: string): Promise<Review[]> {
    return this.reviewModel.find({ book: bookId }).exec();
  }

  async update(reviewId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto, { new: true }).exec();
    if (!updatedReview) {
      throw new NotFoundException(`O comentário não foi encontrado.`);
    }
    return updatedReview;
  }

  async delete(reviewId: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(reviewId).exec();
  }
}