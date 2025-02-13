import express, { Request, Response } from "express";

import fileService from "../service/file";

const fileRouter = express.Router();

// get a file
fileRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const file = await fileService.readFile(req.params.id);
    res.status(200).json(file);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(404).json({ message: errorMessage });
  }
});

// upload a file
fileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const resp = fileService.uploadFile(req, res, (err: any) => {
      if (err) {
        throw new Error(err);
      }
    });
    res.status(200).json({ message: 'File uploaded', file: resp }); 
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(404).json({ message: errorMessage });
  }
});

// delete a file
fileRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await fileService.deleteFile(req.params.id);
    res.status(200).json({ message: 'File deleted' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(404).json({ message: errorMessage });
  }
});

export default fileRouter;