import express, { Request, Response } from "express";

import { IFileService } from "../service/interfaceFile";

import fileService from "../service/file";

import { ErrorMessage } from "../../utilities/error_message";
import e from "express";

const fileServiceLocal: IFileService = fileService;

const fileRouter = express.Router();

// get a file
fileRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const file = await fileServiceLocal.readFile(req.params.id);
    res.status(200).json(file);
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
    await fileServiceLocal.deleteFile(req.params.id);
    res.status(200).json({ message: 'File deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

export default fileRouter;