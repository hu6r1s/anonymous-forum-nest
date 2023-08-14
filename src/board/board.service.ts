import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardRequestDto } from "./dto/board.dto";
import { Board } from "./entities/board.entity";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async write(boardRequestDto: BoardRequestDto): Promise<Board> {
    const board = await this.boardRepository.create(boardRequestDto);

    return this.boardRepository.save(board);
  }

  async update(id: number, boardRequestDto: BoardRequestDto): Promise<Board> {
    const prevBoard = await this.boardRepository.findOne({ where: { id } });
    let newBoard = { ...prevBoard, ...boardRequestDto };

    return this.boardRepository.save(newBoard);
  }

  async delete(
    id: number,
    password: string
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } })

    if (!board) {
      return null;
    }
    if (board.password !== password) {
      return null;
    }

    board.isDeleted = true;
    await this.boardRepository.save(board);
    return board;
  }

  async getAll() {
    return this.commentRepository.find()
  }

  async getFilter(
    title: string,
    page: number = 1,
    take: number = 10,
  ): Promise<[Board[], number]> {
    const [board, total] = await this.boardRepository.findAndCount({
      where: {
        title
      },
      skip: (page - 1) * take,
      take,
      order: {
        createdAt: "DESC",
      },
    });

    return [board, total];
  }

  async addComment(
    id: number,
    content: string,
  ): Promise<Comment> {
    const board = await this.boardRepository.findOne({ where: { id } });

    const comment = new Comment();
    comment.content = content;
    comment.board = board;

    return this.commentRepository.save(comment);
  }

  async updateComment(
    id: number,
    content: string,
  ): Promise<Comment> {
    const prevComment = await this.commentRepository.findOne({ where: { id } });

    const newComment = { ...prevComment, content };

    return this.commentRepository.save(newComment);
  }
}
