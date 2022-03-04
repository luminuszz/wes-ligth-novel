import { resolve } from "path";
import { Handle } from "./src/main";
import { webScraperService } from "./src/services/webScrapperService";
import { fsFileReaderService } from "./src/services/fileReaderService";

(async () => {
  const handler = new Handle(webScraperService, fsFileReaderService);

  await handler.execute(resolve(__dirname, "tmp", "temp.txt"));

  console.log("hello dsddsd dsadasd d");
})();
