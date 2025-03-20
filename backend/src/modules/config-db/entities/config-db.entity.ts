import { model, Schema } from 'mongoose';
import { ConfigDB, ConfigDBStatic } from './config-db.interface';

const ConfigSchema = new Schema<ConfigDB>({
  numbering: {
    document: {
      type: Number,
      default: 0,
    },
	},
})

ConfigSchema.statics.getNo = async function (key: string): Promise<number | boolean> {
  try {
    console.log('getNo', key)
    const result = await this.findOneAndUpdate({}, { $inc: {[`numbering.${key}`]: 1} }, { returnOriginal: false }).lean()
    if (result) {
      return result.numbering[key as keyof typeof result.numbering]
    }
    return false
  } catch (error) {
    console.log('config DB err', error)
    return false
  }
};

const ConfigDBModel = model<ConfigDB, ConfigDBStatic>('Config', ConfigSchema)

export {ConfigDBModel, ConfigSchema}