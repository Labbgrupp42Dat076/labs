import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { FileObject } from "../model/fileObject";
import { ErrorMessage } from "../../utilities/error_message";

const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}


export class FileService {
  fileList: Array<FileObject> = [];

  private storage = multer.diskStorage({
    


    destination: (req, file, cb) => {
      cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
     
      let uniqueName = path.extname(file.originalname) + uuidv4();
      this.fileList.push({
        id: this.fileList.length,
        path: uniqueName  ,
      });
      cb(null, uniqueName);
    },
  });

  

  private upload = multer({ storage: this.storage}).single("file");
  public async uploadFile(req: any, res: any, callback: any): Promise<string> {
    try {
    await this.upload(req, res, (err: any) => {
      if (err) {
        callback(err);
      }else if (!req.file) {
        callback(new ErrorMessage('No file uploaded', 400));
      } 
      
      else {
        callback(null);
      }
    });
  } catch (error) {}
  
    return this.fileList.length.toString();
  }
  

  public updateFileContent(fileName: string, newContent: string): void {
    const filePath = path.join(UPLOADS_DIR, fileName);

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, newContent, "utf-8");
    } else {
     
      throw new ErrorMessage("File not found", 404);
    }
  }

  public deleteFile(fileName: string): void {
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new ErrorMessage("File not found", 404);
    }
  }
  
  public readFile(fileId: string): string {
    const fileName = this.fileList.find((file) => file.id === parseInt(fileId))?.path;
    if (!fileName) {
      throw new ErrorMessage("File not found", 404);
    }

    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    } else {
      throw new ErrorMessage("File not found", 404);
    }
  }
}

const fileService = new FileService();
export default fileService;
