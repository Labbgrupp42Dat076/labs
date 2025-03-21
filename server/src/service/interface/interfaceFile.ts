export interface IFileService {
    uploadFile(req: any, res: any, callback: any): Promise<string>;

    updateFileContent(fileName: string, newContent: string): void 
    deleteFile(fileId: number): void 
    readFile(fileId: number): Promise<string>
    downloadFile(fileId: number): Promise<Map<Buffer, string>>

}