import { model, Schema, Types } from 'mongoose';
import { LogDB } from './log-db.interface';

const LogDBSchema = new Schema<LogDB>({
  who: {
    _id: Types.ObjectId,
    ip: String,
  },
  when: Date,
  where: {
    route: String,
  },
  what: {
    _id: Types.ObjectId,
    schema: String,
  },
  how: {
    action: String,
    before: Object,
    after: Object,
  },
  memo: String,
})

const LogDBModel = model<LogDB>('Log', LogDBSchema)

export {LogDBModel, LogDBSchema}