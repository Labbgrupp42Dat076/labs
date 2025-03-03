export interface IFileService {
    uploadFile(req: any, res: any, callback: any): Promise<string>;
    updateFileContent(fileName: string, newContent: string): Promise<void>; 
    deleteFile(fileId: string): Promise<void> 
    readFile(fileId: string): Promise<string>
}