import { IFileService } from "./interfaceFile";
import { FileObject } from "../model/fileObject"
import { FileModel } from "../db/fileObject.db";
import { ErrorMessage } from "../../utilities/error_message";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { readPdf, readPng, readJpg, readTxt, readTex} from "../../utilities/fileParser";


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
            if(!(uniqueName.endsWith (".pdf") || uniqueName.endsWith(".png") || uniqueName.endsWith(".jpg") || uniqueName.endsWith(".tex") || uniqueName.endsWith(".txt") )){
                cb(new ErrorMessage("File type not supported", 400), "");
            }
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
                    console.log("erroe")
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
                return await readPdf(fileName);
             
            }else if (filePath.endsWith(".png")) {
                return await readPng(fileName);
            }else if (filePath.endsWith(".jpg")) {
                return await readJpg(fileName);
            }else if (filePath.endsWith(".tex")){
                return await readTex(fileName)
            }

            return await readTxt(fileName);
        } else {
            throw new ErrorMessage("File not found", 404);
        }
    }

    public async downloadFile(fileId: number): Promise<Blob> {
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
            // return a file blob
            const buffer = fs.readFileSync(filePath);
            let type = getFileType(filePath);
            return new Blob([buffer], { type: type });
        } else {
            throw new ErrorMessage("File not found", 404);
        }
    }
}

const fileServiceDbInt: IFileService = new FileServiceDbInt();
export default fileServiceDbInt;

function getFileType(fileName: string) {
    let type = "";
    console.log("file name " + fileName);
    switch (path.extname(fileName)) {
        case ".txt":
            type = "text/plain";
            break;
        case ".pdf":
            type = "application/pdf";
            break;
        case ".doc":
            type = "application/msword";
            break;
        case ".docx":
            type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
        case ".tex":
            console.log("tex file");
            type = "application/x-tex";
            break;
        case ".png":
            type = "image/png";
            break;
        case ".jpg":
            type = "image/jpeg";
            break
        default:
            type = "application/octet-stream";
            break;
    }
    return type;
}
