import fs from "fs";
import path from "path";
import multer from "multer";

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
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  public upload = multer({ storage: this.storage }).single("file");

  public updateFile(oldFileName: string, newFile: Express.Multer.File): string {
    const oldFilePath = path.join(UPLOADS_DIR, oldFileName);
    const newFilePath = path.join(UPLOADS_DIR, newFile.filename);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    fs.renameSync(newFile.path, newFilePath);
    return newFile.filename;
  }

  public deleteFile(fileName: string): boolean {
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
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

export default new FileService();
