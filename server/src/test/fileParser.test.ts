import { readPdf } from "../../utilities/fileParser";
import { readJpg } from "../../utilities/fileParser";
import { readPng } from "../../utilities/fileParser";
import { readTxt } from "../../utilities/fileParser";
import fs from "fs";

test("readPdf", async () => {
    // save a sample pdf file in the src/service/uploads folder containitg the pdf encoded text " PDF file"

    const testtext = fs.readFileSync("src/test/Test.pdf");

    fs.writeFileSync("src/service/uploads/Test.pdf", testtext);
    const result = await readPdf("Test.pdf");
    expect(result).toBe("Test ");
})