import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogPostsService {
  create(createBlogPostDto: CreateBlogPostDto) {
    console.log(createBlogPostDto);
    return 'This action adds a new blogPost';
  }

  findAll() {
    return `This action returns all blogPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogPost`;
  }

  update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    console.log(updateBlogPostDto);
    return `This action updates a #${id} blogPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogPost`;
  }
}
