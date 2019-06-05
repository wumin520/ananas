import { configs } from '@/defaultSettings';

export default {
  uploadURL: `${configs[process.env.API_ENV].API_SERVER}/cdk/v1/web/upload`,
};
