import { Router } from "express";
import MenuController from "@controllers/menu.controller";
import validateRequest from '@middleware/validateRequest';
import { menuBodySchema, menuQuerySchema, menuParamSchema } from '@validations/menu.validation';

const router: Router = Router();
const menuController = new MenuController();

router.get("/", validateRequest({ query: menuQuerySchema }), menuController.getMenus);
router.post("/", validateRequest({ body: menuBodySchema }), menuController.createMenu);
router.put("/:id", validateRequest({ body: menuBodySchema, params: menuParamSchema }), menuController.updateMenu);
router.delete("/:id", validateRequest({ params: menuParamSchema }), menuController.deleteMenu);
router.get("/:id", validateRequest({ params: menuParamSchema }), menuController.retrieveMenu);

export default router;