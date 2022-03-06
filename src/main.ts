import { Cluster } from 'puppeteer-cluster';
import { resolve } from 'path';
import { toHexStringOfMinLength } from 'pdf-lib';
import { WebScraperService } from './services/webScrapperService';
import { FileReaderService } from './services/fileReaderService';
import {
  sendFileByEmailForKindle,
  SendFileService,
} from './services/SendFileService';
import { clearDir } from './utils/clearDir';

export class Handle {
  constructor(
    private readonly wbsService: WebScraperService,
    private readonly fileReaderService: FileReaderService,
    private readonly sendFileService: SendFileService,
  ) {}

  async execute(urlFilePath: string) {
    try {
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
      });

      const urls = await this.fileReaderService.readFile(urlFilePath);

      await cluster.task(this.wbsService.getCapContent);

      urls.forEach((url) => {
        cluster.queue(url);
      });

      await cluster.idle();
      await cluster.close();

      console.log('Extração finalizada');

      console.log('Enviando arquivos...');

      await this.sendFileService.sendFile();

      console.log('Envio finalizado !');

      console.log('Limpando arquivos temporários !');

      await clearDir(resolve(__dirname, '..', 'tmp', 'files'));

      console.log('Pasta limpa');
    } catch (e) {
      console.error(e);
    }
  }
}
