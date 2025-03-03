import { IFileService } from "./interfaceFile";
import { FileObject } from "../model/fileObject"
import { FileModel } from "../db/fileObject.db";
import { ErrorMessage } from "../../utilities/error_message";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';


const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}



class FileServiceDbInt implements IFileService {
    currentWorkingFileId: number = 0;

    private storage = multer.diskStorage({



        destination: (req, file, cb) => {
            cb(null, UPLOADS_DIR);
        },
        filename: (req, file, cb) => {

            let uniqueName = path.extname(file.originalname) + uuidv4();
            this.currentWorkingFileId = Date.now();
            // made into db now
            new FileModel({
                path: uniqueName,
                id: this.currentWorkingFileId
            }).save();





            cb(null, uniqueName);
        },
    });
    private upload = multer({ storage: this.storage }).single("file");

    async uploadFile(req: any, res: any, callback: any): Promise<string> {
        try {
            await this.upload(req, res, (err: any) => {
                if (err) {
                    callback(err);
                } else if (!req.file) {
                    callback(new ErrorMessage('No file uploaded', 400));
                }

                else {
                    callback(null);
                }
            });
        } catch (error) { 
            
        }

        return this.currentWorkingFileId.toString();

    }
    async updateFileContent(fileName: string, newContent: string) {

    }
    async deleteFile(fileId: string) {

    }
    async readFile(fileId: string): Promise<string> {
        return "penis2"
    }

}