import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BoardService } from "./board.service";
import { BoardRequestDto } from "./dto/board.dto";
import { Board } from "./entities/board.entity";

@Controller('api')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) { }

  @Post("/write")
  async wrtie(
    @Body() boardRequestDto: BoardRequestDto,
  ): Promise<Board> {
    return this.boardService.write(boardRequestDto);
  }

  @Patch("/:id")
  async update(
    @Param("id") id: number,
    @Body() boardRequestDto: BoardRequestDto,
  ) {
    return this.boardService.update(id, boardRequestDto);
  }

  @Delete("/:id")
  async delete(
    @Param("id") id: number,
    @Body("password") password: string,
  ) {
    return this.boardService.delete(id, password)
  }

  @Get("board")
  async getFilter(
    @Body("title") title: string,
  ) {
    return this.boardService.getFilter(title)
  }

  @Post("/:id/comments")
  async addComment(
    @Param("id") id: number,
    @Body("content") content: string,
  ) {
    return this.boardService.addComment(id, content);
  }

  @Put("comments/:id")
  async updateComment(
    @Param("id") id: number,
    @Body("content") content: string,
  ) {
    return this.boardService.updateComment(id, content);
  }

  @Get("comments")
  async getAll() {
    return this.boardService.getAll();
  }
}
