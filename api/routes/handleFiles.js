const express = require('express');
const router = express.Router();
const dropboxApi = require("../handlers/dropboxApi");

/**
 *  Method: GET
 *  Status: Public
 *  Handler: fetchFiles
 *  Description: get 25 most resent files from dropbox
 */
router.get("/fetch", async(req, res, next) => {
    try {
        return dropboxApi.fetchFiles(req, res, next);
    } catch(err) {
        return next({
            status: 500,
            message: "Something went wrong, while getting the requested files."
        });
    }
});

/**
 *  Method: GET
 *  Status: Public
 *  Handler: downloadFile
 *  Description: Download specific file from Dropbox to Computer
 */
router.get("/download", async(req, res, next) => {
    try {
        return dropboxApi.downloadFile(req, res, next);
    } catch(err) {
        return next({
            status: 500,
            message: "Something went wrong, while getting the requested files."
        });
    }
});

/**
 *  Method: GET
 *  Status: Public
 *  Handler: uploadFile
 *  Description: Upload file to Dropbox
 */
router.post("/upload", async(req ,res, next) => {
    try {
       dropboxApi.uploadFile(req, res, req.files.file_upload.name, next);
       return;
    } catch(err) {
        return next({
            status: 500,
            message: "Something went wrong, while uploading the file."
        });
    }
});

module.exports = router;

  