import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String], ref: 'User' }) // Array of user IDs belonging to this organization
  userIds: string[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
