import { Request } from "express";
import multer from "multer";
import { dirname, join } from "path"; // untuk merge file path location

export const uploader = (dirName?: string, filePrefix?: string) => {
  const defaultDir = join(__dirname, "../../public"); // define directory utama

  const configStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const fileDestination = dirName ? defaultDir + dirName : defaultDir;
      console.log("Destination :", fileDestination);
      cb(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const existName = file.originalname.split(".");
      console.log("Original filename :", existName);
      const extension = existName[existName.length - 1];
      console.log("extention name :", extension);
      if (filePrefix) {
        const newName = filePrefix + Date.now() + "." + extension;
        cb(null, newName);
      } else {
        cb(null, file.originalname);
      }
    },
  });

  return multer({ storage: configStore });
};
