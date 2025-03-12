import { readPdf, readTex } from "../../utilities/fileParser";
import { readJpg } from "../../utilities/fileParser";
import { readPng } from "../../utilities/fileParser";
import { readTxt } from "../../utilities/fileParser";
import fs from "fs";

// mock the fs module
jest.mock("fs");
// mock the pdf reader
jest.mock("pdfreader", () => {
    return {
        PdfReader: jest.fn().mockImplementation(() => {
            return {
                parseFileItems: jest.fn().mockImplementation((path: string, callback: any) => {
                    callback(null, { text: "Test " });
                }),
            };
        }),
    };
});


jest.spyOn(fs, "readFileSync").mockImplementation((path: fs.PathOrFileDescriptor, options?: any) => {
    if (typeof path === "string" && path.endsWith(".pdf")) {
        return " PDF file";
    }
    return "";
});
test("readPdf", async () => {
    // save a sample pdf file in the src/service/uploads folder containitg the pdf encoded text " PDF file"

    // const testtext = fs.readFileSync("src/test/Test.pdf");

    // fs.writeFileSync("src/service/uploads/Test.pdf", testtext);
    const result = await readPdf("Test.pdf");
    expect(result).toBe("Test ");
})


jest.spyOn(fs, "readFileSync").mockImplementation((path: fs.PathOrFileDescriptor, options?: any) => {
    if (typeof path === "string" && path.endsWith(".tex")) {
        return "\\begin{document}\ntest tex\n\\section{something}";
    }
    return "";
}
)

test("read latex", async ()=>{
    // fs.writeFileSync("src/service/uploads/Test.tex", "\\begin{document}\ntest tex")
    const result:string = await readTex("Test.tex")

    expect(result).toContain("test tex")
    // fs.rmSync("src/service/uploads/Test.tex")
})



test("not read latex commands", async () =>{
    // fs.writeFileSync("src/service/uploads/Test.tex", "\\begin{document}\ntest tex\n\\section{something}")
    const result:string = await readTex("Test.tex")

    expect(result).not.toContain("\\subsection")
    // fs.rmSync("src/service/uploads/Test.tex")

})


