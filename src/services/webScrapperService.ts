import { Page } from 'puppeteer';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs/promises';

type TaskArgs = {
  data: string;
  page: Page;
};

export interface WebScraperService {
  getCapContent(task: TaskArgs): Promise<any>;
}

export class PuppeteerWebScraperService implements WebScraperService {
  // eslint-disable-next-line no-use-before-define
  static instance: PuppeteerWebScraperService;

  public static init() {
    return PuppeteerWebScraperService.instance
      ? PuppeteerWebScraperService.instance
      : new PuppeteerWebScraperService();
  }

  constructor() {
    this.extractPageContent = this.extractPageContent.bind(this);
    this.createPdfFile = this.createPdfFile.bind(this);
    this.getCapContent = this.getCapContent.bind(this);
  }

  public async extractPageContent(page: TaskArgs['page']): Promise<any> {
    return page.$eval('#readerarea', (el: HTMLDivElement) => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNode(el);
      selection.removeAllRanges();
      selection.addRange(range);
      return window.getSelection().toString();
    });
  }

  public async createPdfFile(page: TaskArgs['page'], paragraphs: string[]) {
    const fileTitle =
      page.url().split('/')[3] || (await page.title()).replace(/\s/g, '');

    const saveFileLocate = join(
      __dirname,
      '..',
      '..',
      'tmp',
      'files',
      `${fileTitle}.pdf`,
    );

    await page.pdf({
      path: saveFileLocate,
      format: 'a4',
      margin: {
        right: 10,
        top: 10,
        left: 10,
        bottom: 10,
      },
    });

    const pdfFile = await fs.readFile(saveFileLocate);

    const currentPDf = await PDFDocument.load(pdfFile);

    const pdfPagesCont = currentPDf.getPageCount();

    await currentPDf.removePage(0);

    await currentPDf.removePage(pdfPagesCont - 2);

    const formattedPDF = await currentPDf.save();

    await fs.writeFile(saveFileLocate, formattedPDF);
  }

  async getCapContent({ page, data }: TaskArgs): Promise<any> {
    try {
      await page.goto(data, { waitUntil: 'networkidle2' });

      const paragraphs = await this.extractPageContent(page);

      await this.createPdfFile(page, paragraphs);
    } catch (e) {
      console.error(e);
    }
  }
}

export const webScraperService = PuppeteerWebScraperService.init();
