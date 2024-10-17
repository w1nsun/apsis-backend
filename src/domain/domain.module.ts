import { Global, Module } from '@nestjs/common';
import { TeamManagementModule } from './teamManagement/teamManagement.module';

@Global()
@Module({
  imports: [TeamManagementModule],
  exports: [TeamManagementModule],
})
export class DomainModule {}
