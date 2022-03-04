import { Cluster } from "puppeteer-cluster";
import { WebScraperService } from "./services/webScrapperService";
import { FileReaderService } from "./services/fileReaderService";

export class Handle {
  constructor(
    private readonly wbsService: WebScraperService,
    private readonly fileReaderService: FileReaderService
  ) {}

  async execute(urlFilePath: string) {
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
  }
}
