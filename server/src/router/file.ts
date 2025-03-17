/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management endpoints
 * 
 * /file/{id}:
 *   get:
 *     tags: [Files]
 *     summary: Get a file by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File details retrieved successfully
 *
 *       404:
 *         description: File not found
 * 
 * /file/download/{id}:
 *   get:
 *     tags: [Files]
 *     summary: Download a file by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       400:
 *         description: The file extension is not supported
 * 
 * /file:
 *   post:
 *     tags: [Files]
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: When a server error occurs
 * 
 *   delete:
 *     tags: [Files]
 *     summary: Delete a file by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 */
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
        // throw new ErrorMessage(err.message, 500);  
      }
    });
    if (errLocal) {
      console.log("error in upload file") 
      throw new ErrorMessage(errLocal.message, 500);
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