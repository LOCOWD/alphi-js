import path from 'path';
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { readdirSync, rmSync, statSync, existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

const libraries = [];
const outDir = path.join(__dirname, "dist")

if (!existsSync(outDir)){
    mkdirSync(outDir);
}

const getPages = function (dirPath, arrayOfFiles) {
    if (!dirPath) dirPath = "src/pages"

    let files = readdirSync(path.join(process.cwd(), dirPath));
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getPages(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(process.cwd(), dirPath, '/', file));
        }
    });

    return arrayOfFiles;
};

getPages().forEach((file) => {
    const fileDir = path.parse(file).dir;
    const fileDirClean = fileDir.split('/src/').pop();
    const fileName = fileDirClean + '/' + path.parse(file).name;

    libraries.push({
        entry: file,
        formats: ['es'],
        fileName: fileName,
    })
})

// empty the output directory
readdirSync(outDir).forEach(f => rmSync(`${outDir}/${f}`, {recursive: true}));

libraries.forEach(async (libItem) => {
    // build the library
    await build({
        configFile: false,
        build: {
            lib: libItem,
            emptyOutDir: false,
            target: "es2017",
            outDir: outDir,
        },
    });
});
