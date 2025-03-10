import { IFileService } from "./interfaceFile";
import { FileObject } from "../model/fileObject"
import { FileModel } from "../db/fileObject.db";
import { ErrorMessage } from "../../utilities/error_message";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { INTEGER } from "sequelize";
import {PdfReader} from "pdfreader";



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

            let uniqueName = uuidv4() + path.extname(file.originalname) ;
            this.currentWorkingFileId= Math.round(Date.now() / 1000);
            // made into db now
            FileModel.create({
                path: uniqueName,
                id: this.currentWorkingFileId
            });





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
    async deleteFile(fileId: number) {

        const file = await FileModel.findOne({
            where: {
                id: fileId
            }
        });
        if (!file) {
            throw new ErrorMessage("File not found", 404);
        }
        const fileName = file?.path;

        // delete file from db
        await file?.destroy();

        if (!fileName) {
            throw new ErrorMessage("File not found", 404);
        }

        const filePath = path.join(UPLOADS_DIR, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            throw new ErrorMessage("File not found", 404);
        }
    }
    async readFile(fileId: number): Promise<string> {
        
        const file = await FileModel.findOne({
            where: {
                id: fileId
            }
        });
        if (!file) {
            throw new ErrorMessage("File not found", 404);
        }
        const fileName = file?.path;

        if (!fileName) {
            throw new ErrorMessage("File not found", 404);
        }

        const filePath = path.join(UPLOADS_DIR, fileName);
        if (fs.existsSync(filePath)) {
            if (filePath.endsWith(".pdf")) {
                // read the text from the pdf file
                let output = "";
                const pdfReader = new PdfReader();
                await pdfReader.parseFileItems("src/service/uploads/" + fileName, function (_err, item) {
                   
                        if (item && item.text)
                            output += item.text;
                
                });
                while (output == "") {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                return output;
             
            }else if (filePath.endsWith(".png")) {
                return "PNG file"
            }else if (filePath.endsWith(".jpg")) {
                return "JPG file"
            }

            return fs.readFileSync(filePath , "utf-8");
        } else {
            throw new ErrorMessage("File not found", 404);
        }
    }

}

const fileServiceDbInt: IFileService = new FileServiceDbInt();
export default fileServiceDbInt;