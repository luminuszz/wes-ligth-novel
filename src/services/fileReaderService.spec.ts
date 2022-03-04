import * as fs from "fs/promises";
import * as path from "path";
import { FsFileReaderService } from "./fileReaderService";

describe("FileReaderService", () => {
  let fileReader: FsFileReaderService;

  beforeAll(() => {
    fileReader = new FsFileReaderService(fs);
  });

  describe("readFile", () => {
    const tempFolderPath = path.resolve(__dirname, "..", "..", "tmp");

    const url =
      "https://tsundoku.com.br/mushoku-tensei-reencarnacao-do-desempregado-vol-10-cap-02/";

    it("should be able to read .txt file", async () => {
      const filePath = `${tempFolderPath}/temp.txt`;

      //  await fs.writeFile(filePath, url);

      const response = await fileReader.readFile(filePath);

      expect(Array.isArray(response)).toBeTruthy();
    });
  });
});
