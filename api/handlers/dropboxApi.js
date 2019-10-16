// Dropbox configuration
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ 
    accessToken: process.env.APP_ACCESS_TOKEN,
    fetch
});

module.exports.getDropboxFiles = async(req, res, next) => {
    dbx.filesListFolder({path: ''})
    .then(function(response) {
        return res.status(200).json(response.entries);
    })
    .catch(function(error) {
        return next({
            status: 400,
            message: error
        });
    });
}

module.exports.uploadFile = async(req, res, filename, next) => {
    try {
        console.log("started with dropbox upload api...");
        const args = {
            contents: req.files.file_upload.data,
            path: "/"+filename,
            mode: 'add', // other modes are: 
            autorename: true,
            mute: false,
            strict_conflict: false
        };
        console.log("proceeding to upload...");
        const result = await dbx.filesUpload(args);
        console.log(result);
        res.status(201).json({
            message: "File was succesfully uploaded to Dropbox!"
        });
    } catch(err) {
        return next(err);
    }
};