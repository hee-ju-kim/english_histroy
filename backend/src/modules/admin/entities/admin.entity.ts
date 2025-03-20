import { model, Schema } from 'mongoose';
import * as crypto from 'crypto'
import { Admin, AdminStatic, AdminMethods } from './admin.interface';
import { ConfigDBStatic } from '../../config-db/entities/config-db.interface';

const AdminSchema = new Schema<Admin, AdminStatic, AdminMethods>({
  id: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String},
},
{
  timestamps: {
    createdAt: 'created', 
    updatedAt: 'updated'
  }
})

AdminSchema.methods.hashPassword = function (password: string): string {
  return crypto.pbkdf2Sync(password, 'salt', 10000, 64, 'sha512').toString('base64');
};

AdminSchema.methods.authenticate = function(password: string): boolean {
  console.log(this.password, this.hashPassword(password))
  return this.password === this.hashPassword(password)
}

AdminSchema.pre('save', async function(next) {
  this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64').toString()
  this.password = this.hashPassword(this.password)

  next()
  // const configModel: ConfigDBStatic = this.model('Config')
  // const num = await configModel.getNo('admin')

  // if (num && typeof num === 'number') {
  //   this.seqNo = num
  //   next()
  // } else {
  //   return next(new Error('Admin Save Error')); // 데이터를 저장하지 않도록 중단
  // }
})

// Admin 모델 생성
const AdminModel = model<Admin, AdminStatic>('Admin', AdminSchema)

export {AdminModel, AdminSchema}