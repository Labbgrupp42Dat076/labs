import express, { Request, Response } from "express";

import { IFileService } from "../service/interfaceFile";

import fileService from "../service/file";
import fileServiceDbInt from "../service/fileServiceDbInt";

import { ErrorMessage } from "../../utilities/error_message";
import e from "express";

const fileServiceLocal: IFileService = fileServiceDbInt;

const fileRouter = express.Router();

// get a file
fileRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const file = await fileServiceLocal.readFile(parseInt(req.params.id));
    res.status(200).json(file);
  } catch (error: unknown) {
   ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// download a file
fileRouter.get("/download/:id", async (req: Request, res: Response) => {
  try {
    const file = await fileServiceLocal.downloadFile(parseInt(req.params.id));
    const type = file.type;

    console.log("filetype " + type);

    // set the response header
    res.setHeader('Content-Type',type);
    res.setHeader('Content-Disposition', `attachment; filename=${'file'}`);
    
    res.send(file);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// upload a file
fileRouter.post("/", async (req: Request, res: Response) => {
  try {

    // look for a file name in the request

    const resp = await fileServiceLocal.uploadFile(req, res, (err: any) => {
      if (err) {
        throw new ErrorMessage(err.message, 404);
      }
    });
    res.status(200).json({ message: resp }); 
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// delete a file
fileRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await fileServiceLocal.deleteFile(parseInt(req.params.id));
    res.status(200).json({ message: 'File deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

export default fileRouter;