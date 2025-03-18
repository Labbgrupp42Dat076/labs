import express, { Request, Response } from "express";

import { IFileService } from "../service/interface/interfaceFile";

import fileService from "../service/old/file";
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
    const bufferNtype: Map<Buffer, string>= await fileServiceLocal.downloadFile(parseInt(req.params.id));
   

    // set the response header
    const contentType = bufferNtype.values().next().value;
    if (contentType) {
      res.setHeader('Content-Type', contentType);
      res.send(bufferNtype.keys().next().value);
    } else {
      throw new ErrorMessage('Content type not found', 400);
    }
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// upload a file
fileRouter.post("/", async (req: Request, res: Response) => {
  try {

    // look for a file name in the request
    let errLocal:any
    const resp = await fileServiceLocal.uploadFile(req, res, (err: any) => {
      if (err) {
        errLocal = err;
        // throw new ErrorMessage(err.message, 400);  
      }
    });
    if (errLocal) {
      console.log("error in upload file") 
      throw new ErrorMessage(errLocal.message, 400);
    }
    res.status(200).json({ message: resp }); 
  } catch (error) {
    console.log("caught error")
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