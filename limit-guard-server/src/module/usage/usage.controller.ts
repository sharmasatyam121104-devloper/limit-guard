import {  Response } from "express";
import * as usageService from "./usage.service";
import { SessionInterface } from "../user/user.interface";

export const getUsageData = async (req: SessionInterface, res: Response) => {
    const userId = req.userId as string;
    const data = await usageService.getUsageData(userId);
    res.json(data);
};