import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService as CommentsS } from './comments.service';
import { CommentDto } from './dto/comments.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './model/comments.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddUser } from 'src/auth/adduser.inceptor';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsS) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(AddUser)
  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  async createComment(@Body() CommentDTO: CommentDto) {
    console.log(CommentDTO);
    return this.CommentsService.createComment(CommentDTO);
  }

  @ApiOperation({ summary: 'Get all Comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Get()
  getCommentByPost(@Query('id', ParseIntPipe) id: number) {
    return this.CommentsService.getCommentByPost(id);
  }
}
