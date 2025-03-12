import { readPdf, readTex } from "../../utilities/fileParser";
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


test("read latex", async ()=>{
    fs.writeFileSync("src/service/uploads/Test.tex", "\\begin{document}\ntest tex")
    const result:string = await readTex("Test.tex")

    expect(result).toContain("test tex")
    fs.rmSync("src/service/uploads/Test.tex")
})

test("not read latex commands", async () =>{
    fs.writeFileSync("src/service/uploads/Test.tex", "\\begin{document}\ntest tex\n\\section{something}")
    const result:string = await readTex("Test.tex")

    expect(result).not.toContain("\\subsection")
    fs.rmSync("src/service/uploads/Test.tex")

})

test("empty latex", async () =>{
    fs.writeFileSync("src/service/uploads/Test.tex", "")
    const result:string = await readTex("Test.tex")

    expect(result).not.toContain("a latex file")
    fs.rmSync("src/service/uploads/Test.tex")

})