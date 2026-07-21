import { Request, Response } from "express";
import * as playGroundService from "./playGround.services"
import PlayGroundRouter from "./playGround.routes";
import { getRoutes } from "./utils/getRoutes";

export const getProducts = (req: Request, res: Response)=>{
    const data = playGroundService.getProducts()
    res.json({data})
}

export const getStudents = (req: Request, res: Response)=>{
    const data = playGroundService.getStudents()
    res.json({data})
}

export const getEmployees = (req: Request, res: Response)=>{
    const data = playGroundService.getEmployees()
    res.json({data})
}

export const getMovies = (req: Request, res: Response)=>{
    const data = playGroundService.getMovies()
    res.json({data})
}

export const getBooks = (req: Request, res: Response)=>{
    const data = playGroundService.getBooks()
    res.json({data})
}



export const getApiList = (req: Request, res: Response) => {
  const routes = getRoutes(PlayGroundRouter);

  res.json({
    totalApis: routes.length,
    routes,
  });
};