export interface IFileService {
    uploadFile(req: any, res: any, callback: any): Promise<string>;
    updateFileContent(fileName: string, newContent: string): void 
    deleteFile(fileId: string): void 
    readFile(fileId: string): string
}