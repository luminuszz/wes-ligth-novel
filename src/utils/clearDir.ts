import * as fs from 'fs/promises';
import { join } from 'path';

export async function clearDir(filePath: string) {
  const files = await fs.readdir(filePath);

  files.forEach((file) => {
    fs.unlink(join(filePath, file));
  });
}
