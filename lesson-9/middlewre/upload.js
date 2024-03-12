import * as path from "node:path";
import * as crypto from "node:crypto";

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "tmp"));
    },
    filename: (req, file, cb) => {
        // originalname = avatar.jpg
        const extname = path.extname(file.originalname); // .jpg
        const basename = path.basename(file.originalname, extname); // avatar
        const suffix = crypto.randomUUID();

        cb(null, `${basename}-${suffix}${extname}`);
    },
});

export default multer({
    storage,
});