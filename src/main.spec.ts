import { Handle } from "./main";
import { webScraperService } from "./services/webScrapperService";
import { fsFileReaderService } from "./services/fileReaderService";

describe("Handler", () => {
  let handler: Handle;

  beforeEach(() => {
    handler = new Handle(webScraperService, fsFileReaderService);
  });
});
