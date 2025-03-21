/**per gestire Form date , per carricare nuove info , distenazione salvataggio!! collegando a router come Store"Controller"*/

import multer from "multer";

const storage = multer.diskStorage({
    destination: "./public/img/movies",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const upload = multer({storage})

export default upload