import { PdfReader } from "pdfreader";
import fs from "fs";


export async function readPdf(fileName: string) {
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
}


export async function readJpg(fileName: string) {
    return "JPG file";
}

export async function readPng(fileName: string) {
    return "PNG file";
}

export async function readTxt(fileName: string) { 
    const filePath = "src/service/uploads/" + fileName;
    return fs.readFileSync(filePath, "utf-8");
}

export async function readTex(fileName: string):Promise<string>{
    // traverse until \begin{document} is found
    const filePath = "src/service/uploads/" + fileName;
    const text:string = fs.readFileSync(filePath, "utf-8");
    const testlines:string[]= text.split("\n")
    let readNext:boolean = false
    let output = "a latex document"
    testlines.forEach((line)=>{
        if(readNext){
            output = line
        }
        if(line.includes("begin{document}")){

            readNext = true
            
        }

       
    })
    return output
}