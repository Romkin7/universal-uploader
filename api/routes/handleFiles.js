const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dropboxApi = require("../handlers/dropboxApi");

async function uploadFile(req, res, next) {
    try {
        const file = req.files.file_upload;
        const dest = path.resolve('api/uploads/', file.name);
        const writeStream = fs.createWriteStream(dest);
        await writeStream.write(file.data, "base64");
        writeStream.end();
        next();
    } catch(err) {
        return next(err);
    }
}

router.post("/upload/:source", async(req ,res, next) => {
    try {
        if(req.params.source === "dropbox") {
            console.log(req.files);
            dropboxApi.uploadFile(req, res, req.files.file_upload.name, next);
        } else if(req.params.source === "local-storage") {
            uploadFile(req, res, next);
        } else {
            return next({
                status: 401,
                message: "No storage option have been chosen."
            });
        }
        return;
    } catch(err) {
        return next({
            status: 500,
            message: "Something went wrong, while uploading the file."
        });
    }
});

router.get("/fetch/:source", async(req, res, next) => {
    try {
        return dropboxApi.getDropboxFiles(req, res, next);
    } catch(err) {
        return next({
            status: 500,
            message: "Something went wrong, while getting the requested files."
        });
    }
});

module.exports = router;

  