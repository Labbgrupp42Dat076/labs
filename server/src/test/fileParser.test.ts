import { readPdf } from "../../utilities/fileParser";
import { readJpg } from "../../utilities/fileParser";
import { readPng } from "../../utilities/fileParser";
import { readTxt } from "../../utilities/fileParser";
import fs from "fs";

test("readPdf", async () => {
    // save a sample pdf file in the src/service/uploads folder containitg the pdf encoded text " PDF file"

    fs.writeFileSync("src/service/uploads/test.pdf" , "");
    
    const result = await readPdf("test.pdf");
    expect(result).toBe("PDF file");
})