import { Page } from "puppeteer";

type TaskArgs = {
  data: string;
  page: Page;
};

export interface WebScraperService {
  getCapContent(task: TaskArgs): Promise<any>;
}

class PuppeteerWebScraperService implements WebScraperService {
  async getCapContent({ page, data }: TaskArgs): Promise<any> {
    try {
      await page.goto(data, { waitUntil: "networkidle2" });

      const response = await page.title();

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}

export const webScraperService = new PuppeteerWebScraperService();
