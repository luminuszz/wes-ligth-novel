import * as nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import { resolve } from 'path';

type File = {
  path: string;
  title: string;
};

export interface SendFileService<Response = void> {
  sendFile(): Promise<Response>;
}

const credentials = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  kindle_email: process.env.KINDLE_EMAIL,
};

export class SendFileByEmailForKindle implements SendFileService<void> {
  constructor() {
    this.createTransport = this.createTransport.bind(this);
    this.getFilesFolder = this.getFilesFolder.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  private createTransport() {
    return nodemailer.createTransport({
      host: credentials.host,
      port: credentials.port,
      auth: credentials.auth,
    });
  }

  private async getFilesFolder(): Promise<File[]> {
    const folderPath = resolve(__dirname, '..', '..', 'tmp', 'files');

    const files = await fs.readdir(folderPath);

    return files.map((file) => ({
      path: resolve(folderPath, file),
      title: file,
    }));
  }

  async sendFile(): Promise<void> {
    const transport = await this.createTransport();

    const filesFolder = await this.getFilesFolder();

    const attachments = filesFolder.map((item) => ({
      path: item.path,
      filename: item.title,
    }));

    await transport.sendMail({
      to: credentials.kindle_email,
      subject: 'convert',
      attachments,
    });
  }
}

export const sendFileByEmailForKindle = new SendFileByEmailForKindle();
