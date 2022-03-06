import 'dotenv/config';

import { resolve } from 'path';
import { Handle } from './src/main';
import { webScraperService } from './src/services/webScrapperService';
import { fsFileReaderService } from './src/services/fileReaderService';
import { sendFileByEmailForKindle } from './src/services/SendFileService';

(async () => {
  const handler = new Handle(
    webScraperService,
    fsFileReaderService,
    sendFileByEmailForKindle,
  );

  await handler.execute(resolve(__dirname, 'tmp', 'temp.txt'));
})();
