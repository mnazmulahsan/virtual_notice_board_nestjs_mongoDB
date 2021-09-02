import { SetMetadata } from '@nestjs/common';
export const PERMISSION_KEY = 'permissions';

export const Permissions = (
  platform: string,
  module: string,
  actions: string[],
) => SetMetadata(PERMISSION_KEY, { platform, module, actions });
