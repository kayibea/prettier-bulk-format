import fs from "fs";
import path from "path";
import * as prettier from "prettier";

const outFolder = path.join(__dirname, "out");
const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(outFolder)) {
  fs.mkdirSync(outFolder);
}

main();

function main() {
  formatAllJsonFiles()
    .then(() => {
      console.log(
        "🎉 All JSON files have been formatted and saved to the out folder!"
      );
    })
    .catch((err) => {
      console.error("❌ Error formatting JSON files:", err);
    });
}

async function formatAllJsonFiles() {
  const files = fs.readdirSync(dataFolder);

  for (const file of files) {
    const filePath = path.join(dataFolder, file);
    const outFilePath = path.join(outFolder, file);

    if (path.extname(file) !== ".json") continue;

    console.log(`📄 Processing: ${file}`);

    const jsonContent = fs.readFileSync(filePath, "utf-8");

    const minifiedJson = await prettier.format(jsonContent, {
      parser: "json",
      printWidth: 2,
      proseWrap: "never",
    });

    fs.writeFileSync(outFilePath, minifiedJson, "utf-8");
    console.log(`✅ Saved minified JSON to: ${outFilePath}`);
  }
}
