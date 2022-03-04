import * as fs from "fs/promises";

export interface FileReaderService {
  // eslint-disable-next-line no-unused-vars
  readFile(filePath: string): Promise<string[]>;
}

export class FsFileReaderService implements FileReaderService {
  constructor(private readonly fsCore: typeof fs) {}

  async readFile(filePath: string): Promise<string[]> {
    const file = await this.fsCore.readFile(filePath);

    return file
      .toString()
      .replace(/\n/g, "")
      .split(",")
      .filter((url) => url);
  }
}

export const fsFileReaderService = new FsFileReaderService(fs);
