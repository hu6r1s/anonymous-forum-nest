import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Comment, comment => comment.board)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}