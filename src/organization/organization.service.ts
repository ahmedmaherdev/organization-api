import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name) private orgModel: Model<OrganizationDocument>,
  ) {}

  async create(orgDto: any): Promise<Organization> {
    const createdOrg = new this.orgModel(orgDto);
    return createdOrg.save();
  }

  async findOne(id: string): Promise<Organization | undefined> {
    return this.orgModel.findById(id).exec();
  }

  async update(id: string, orgDto: any): Promise<Organization> {
    return this.orgModel.findByIdAndUpdate(id, orgDto, { new: true }).exec();
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.orgModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
