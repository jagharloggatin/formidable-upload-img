const express = require('express');
const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const cors = require('cors');

const libraryDir = "app-data";
const applicationDir = path.resolve('./');

const app = express();

//To get past cors policy
app.use(cors({
    origin: '*'
}));

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});


//Post request
app.post('/api/upload', (req, res) => {

    //Creates a formidable object
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        //Creates a directory with the name of the title that the user chose
        fs.mkdirSync(path.resolve(`app-data/library/pictures/${fields.title}`));

        //Files old path when uploaded with formidable
        let oldPath = files.image.filepath;

        //Puts the file in the new path
        let newPath = path.resolve('appdata/library/pictures/' + files.image.originalFilename);

        //This is what path.resolve fixes, you don't have to write the full dirname
        // let newPath = 'C:\\Users\\Jonathan\\WebstormProjects\\formidable\\app-data\\library\\pictures\\albumheaderimage\\' + files.image.originalFilename;

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });

        //Writes image info to albumCache.json to later unpack and use
        writeJSON('albumCache.json', {err, fields, files});
        res.json({ fields, files });
    });
});


//Converts fileinfo to JSON
function writeJSON(fname, obj) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    fs.writeFileSync(path.resolve(dir, fname), JSON.stringify(obj));
}

