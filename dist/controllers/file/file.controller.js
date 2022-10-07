"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const crypto_1 = require("crypto");
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("@logger/index");
const file_service_1 = require("@services/file.service");
const fileService = new file_service_1.FileService();
class FileController {
    constructor() { }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = (0, formidable_1.default)({ keepExtensions: true });
                form.parse(req, (error, fields, { file }) => __awaiter(this, void 0, void 0, function* () {
                    const filepRrops = file;
                    const newName = (0, crypto_1.randomUUID)() + '.' + filepRrops.originalFilename;
                    const newPath = './static/' + newName;
                    file.originalFilename = newName;
                    yield fileService.saveFile(file, res.locals.userId);
                    fs_1.default.copyFile(filepRrops.filepath, newPath, (err) => {
                        (!err) ? index_1.logger.info('File uploaded!') : res.status(400).send('File not uploaded!');
                    });
                }));
                return res.status(200).send('File uploaded!');
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { list_size, page } = req.query;
                const list = yield fileService.gitFileList(Number(list_size), Number(page));
                return res.json(list);
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
    download(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).send('Invalid passed param id');
                const result = yield fileService.getFile(Number(id));
                if (!result) {
                    index_1.logger.error('File not found');
                    return res.status(400).send('File not found');
                }
                fs_1.default.readdir('./static', (err, files) => {
                    if (err) {
                        index_1.logger.error(err.message);
                        return res.sendStatus(500).send(err.message);
                    }
                    const needlyFile = files[files.indexOf(result.originalName)];
                    return res.download(`./static/${needlyFile}`, needlyFile.slice(37), (err) => {
                        if (err) {
                            index_1.logger.error(err.message);
                            return res.status(500).send(err.message);
                        }
                    });
                });
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const form = (0, formidable_1.default)();
                if (!id)
                    return res.status(400).send('Invalid passed param id');
                yield fileService.delete(Number(id));
                form.parse(req, (error, fields, { file }) => __awaiter(this, void 0, void 0, function* () {
                    const filepRrops = file;
                    const newName = (0, crypto_1.randomUUID)() + '.' + filepRrops.originalFilename;
                    const newPath = './static/' + newName;
                    file.originalFilename = newName;
                    yield fileService.saveFile(file, Number(id));
                    fs_1.default.copyFile(filepRrops.filepath, newPath, (err) => {
                        (!err) ? index_1.logger.info('File updated!') : res.status(400).send('File not updated!');
                    });
                }));
                return res.status(200).send('File updated!');
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).send('Invalid passed param id');
                return yield fileService.delete(Number(id));
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400).send('Invalid passed param id');
                const result = yield fileService.getFile(Number(id));
                return res.send(result);
            }
            catch (error) {
                const err = error;
                index_1.logger.error(err.message);
                res.send(err.message);
                throw error;
            }
        });
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map