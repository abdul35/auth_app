import { randomUUID } from "crypto";
import { Request, Response } from "express";
import formidable, { File } from "formidable";
import fs from 'fs';

import { logger } from "@logger/index";
import { FileService } from "@services/file.service";
import { FileToRecord } from "common/file.type";

const fileService = new FileService();

export class FileController {
    constructor() { }

    public async upload(req: Request, res: Response) {
        try {
            const form = formidable({ keepExtensions: true });
            form.parse(req, async (error, fields, { file }) => {
                const filepRrops = file as File;
                const newName = randomUUID() + '.' + filepRrops.originalFilename;
                const newPath = './static/' + newName;
                (file as FileToRecord).originalFilename = newName;

                await fileService.saveFile(file as FileToRecord, res.locals.userId);

                fs.copyFile(filepRrops.filepath, newPath, (err) => {
                    (!err) ? logger.info('File uploaded!') : res.status(400).send('File not uploaded!');
                })
            })
            return res.status(200).send('File uploaded!');
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }

    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const { list_size, page } = req.query;
            const list = await fileService.gitFileList(Number(list_size), Number(page));

            return res.json(list);
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }
    }

    public async download(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return res.status(400).send('Invalid passed param id');
            const result = await fileService.getFile(Number(id));

            if (!result) {
                logger.error('File not found');
                return res.status(400).send('File not found');
            }
            fs.readdir('./static', (err, files) => {
                if (err) {
                    logger.error(err.message);
                    return res.sendStatus(500).send(err.message);
                }

                const needlyFile = files[files.indexOf(result.originalName)];

                return res.download(`./static/${needlyFile}`, needlyFile.slice(37), (err) => {
                    if (err) {
                        logger.error(err.message);
                        return res.status(500).send(err.message);
                    }
                });
            });

        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const form = formidable();

            if (!id) return res.status(400).send('Invalid passed param id');

            await fileService.delete(Number(id));


            form.parse(req, async (error, fields, { file }) => {
                const filepRrops = file as File;
                const newName = randomUUID() + '.' + filepRrops.originalFilename;
                const newPath = './static/' + newName;
                (file as FileToRecord).originalFilename = newName;

                await fileService.saveFile(file as FileToRecord, Number(id));

                fs.copyFile(filepRrops.filepath, newPath, (err) => {
                    (!err) ? logger.info('File updated!') : res.status(400).send('File not updated!');
                })
            })
            return res.status(200).send('File updated!');
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).send('Invalid passed param id');

            return await fileService.delete(Number(id));
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }
    }

    public async getFile(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) return res.status(400).send('Invalid passed param id');

            const result = await fileService.getFile(Number(id));

            return res.send(result);
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            res.send(err.message);
            throw error;
        }
    }

}