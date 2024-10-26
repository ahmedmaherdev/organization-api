// organization.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization, OrganizationSchema } from './organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]), // Register model here
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService], // Export if needed in other modules
})
export class OrganizationModule {}
