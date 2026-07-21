import { Router } from "express";

const excludedRoutes = ["/api-list"];

export const getRoutes = (router: Router) => {
  return (router as any).stack
    .filter(
      (layer: any) =>
        layer.route &&
        !excludedRoutes.includes(layer.route.path)
    )
    .map((layer: any) => ({
      path: layer.route.path,
      methods: Object.keys(layer.route.methods).map((m) =>
        m.toUpperCase()
      ),
    }));
};