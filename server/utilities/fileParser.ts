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