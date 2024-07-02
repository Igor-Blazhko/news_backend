import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentsService as CommentsS } from './comments.service';
import { CommentDto } from './dto/comments.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './model/comments.model';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsS) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  async createComment(@Body() CommentDTO: CommentDto) {
    return this.CommentsService.createComment(CommentDTO);
  }
}
