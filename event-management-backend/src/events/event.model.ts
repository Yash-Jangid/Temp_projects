import { Table, Column, Model, ForeignKey, BelongsTo, DataType, CreatedAt } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Event extends Model<Event> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @Column
  totalGuests: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.ARRAY(DataType.STRING))
  images: string[];

  @CreatedAt
  @Column({ type: 'datetime' })
  createdAt: Date;
}
