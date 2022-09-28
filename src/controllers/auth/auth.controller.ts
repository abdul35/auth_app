import { Request, Response } from "express";

export class AuthController {
    constructor() { }

    public signin(req: Request, res: Response): Response {
        try {
            return res.send('Sign in is work');
        } catch (error) {
            throw error;
        }
    }

    public signup(req: Request, res: Response) {
        try {
            return res.send('signup is work')
        } catch (error) {

        }
    }

    public refresh(req: Request, res: Response) {
        try {
            return res.send('refresh is work')
        } catch (error) {

        }
    }

    public logout(req: Request, res: Response) {
        try {
            return res.send('logout is work')
        } catch (error) {

        }
    }

    public info(req: Request, res: Response) {
        try {
            return res.send('info is work')
        } catch (error) {

        }
    }

}
