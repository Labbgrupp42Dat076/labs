import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export class FileService {
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
      const uniqueName = path.extname(file.originalname) + uuidv4();
      cb(null, uniqueName);
    },
  });

  private upload = multer({ storage: this.storage }).single("file");
  public async uploadFile(req: any, res: any, callback: any): Promise<string> {
    this.upload(req, res, (err: any) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    return req.file.filename;
  }
  

  public updateFileContent(fileName: string, newContent: string): void {
    const filePath = path.join(UPLOADS_DIR, fileName);

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, newContent, "utf-8");
    } else {
      throw new Error("File not found");
    }
  }

  public deleteFile(fileName: string): void {
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new Error("File not found");
    }
  }
  
  public readFile(fileName: string): string {
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    } else {
      throw new Error("File not found");
    }
  }
}


const fileService = new FileService();
export default fileService;
