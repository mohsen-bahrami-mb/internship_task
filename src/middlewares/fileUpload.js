const multer = require('multer');

function setStorage(path) {
    // a function for set a path to save where file save on server
    return multer.diskStorage({
        destination: function (req, file, callBack) {
            callBack(null, path);
        },
        filename: function (req, file, callBack) {
            const uniqeName = new Date().getTime().toString(32) + "-" + file.originalname;
            callBack(null, uniqeName);
        }
    });
}

function setLimits(sizeInByte) {
    // a function for set limits for file to save on server
    return {
        fileSize: sizeInByte
    }
}

function setfileFilter(ftileTypesArray) {
    // a function for set type (format) limit for file to save on server
    // it get the an array of types)(mimetype) in arguments
    // see mimtypes in bottom of this file
    return function (req, file, callBack) {
        const allowTypes = [...ftileTypesArray];
        if (!allowTypes.includes(file.mimetype)) {
            const error = new Error(`just accept this file types: ${allowTypes}`);
            return callBack(error, false);
        }
        callBack(null, true);
    }
}

function upload(path, size, fileTypes) {
    // set all of the "multer" properties with call functions
    const storage = setStorage(path);
    const limits = setLimits(size);
    const fileFilter = setfileFilter(fileTypes);
    return multer({ storage, limits, fileFilter });
}

module.exports = { upload };

/** ** mimetypes:
 * image/gif
 * image/jpeg
 * image/pjpeg
 * image/png
 * image/svg+xml
 * image/tiff
 * image/webp
 * audio/aac
 * audio/mp3
 * audio/mpeg
 * audio/ogg
 * audio/wav
 * audio/webm
 * video/mp4
 * video/mpeg
 * video/ogg
 * video/quicktime
 * video/webm
 * video/x-ms-wmv
 * application/vnd.ms-excel
 * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * application/vnd.ms-powerpoint
 * application/vnd.openxmlformats-officedocument.presentationml.presentation
 * application/msword
 * application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * application/pdf
 * application/x-javascript
 * application/x-shockwave-flash
 * application/zip
 * application/x-rar-compressed
 * application/octet-stream
 * text/plain
 * text/csv
 * text/tab-separated-values
**/