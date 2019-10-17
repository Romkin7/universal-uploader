// Dropbox configuration
const fetch = require('node-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ 
    accessToken: process.env.APP_ACCESS_TOKEN,
    fetch
});

/**
 *  Method: GET
 *  Status: Public
 *  Description: get 25 most resent files from dropbox
 */
module.exports.fetchFiles = async(req, res, next) => {
    try {
        dbx.filesListFolder({path: '', limit: 25})
        .then(function(response) {
            let files = response.entries;
            // Map all files paths into array
            const paths = files.filter(file => file['.tag'] === 'file')
            .map(file => ({
                path: file.path_lower,
                size: 'w32h32'
            }))
            //get thumbnails for files. note!! Dropbox only returns 25 thumbnails at a time.
            dbx.filesGetThumbnailBatch({
                entries: paths
            }).then(resWithThumbnails => {
                // make a copy of state.files
                const newStateFiles = [...files]
                // loop through the file objects returned from dbx
                resWithThumbnails.entries.forEach(file => {
                    // figure out the index of the file we need to update
                    let indexToUpdate = files.findIndex(
                        stateFile => file.metadata.path_lower === stateFile.path_lower
                    )
                    // put a .thumbnail property on the corresponding file
                    newStateFiles[indexToUpdate].thumbnail = file.thumbnail
                });
                files = newStateFiles;
                return res.status(200).json(files);
            }).catch((err) => {
                return next(err);
            })
        })
        .catch(function(error) {
            return next({
                status: 400,
                message: error
            });
        });
    } catch(err) {
        return next(err);
    }
}

/**
 *  Method: GET
 *  Status: Public
 *  Description: Download specific file from Dropbox to Computer
 */
module.exports.downloadFile = (req, res, next) => {
    try {
        console.log(req.query.filename);
        dbx.filesDownload({path: req.query.filename}).then((response) => {
            console.log(response);
            res.download(response);
            return;
        }).catch((err) => {
            return next({
                status: 403,
                message: "Something went wrong while downloading file."
            });
        });
    } catch(err) {
        return next(err);
    }
};

/**
 *  Method: POST
 *  Status: Public
 *  Description: Upload file to Dropbox
 */
module.exports.uploadFile = async(req, res, filename, next) => {
    try {
        const args = {
            contents: req.files.file_upload.data,
            path: "/"+filename.split(" ").join(""),
            mode: 'add', // other modes are: 
            autorename: true,
            mute: false,
            strict_conflict: false
        };
        await dbx.filesUpload(args);
        res.status(201).json({
            message: "File was succesfully uploaded to Dropbox!"
        });
    } catch(err) {
        return next(err);
    }
};