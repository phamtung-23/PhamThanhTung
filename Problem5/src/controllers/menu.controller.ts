import Menu from "@models/menu";
import { IMenu } from "types/menu";

import { NextFunction, Request, Response } from "express";


export default class MenuController {
  constructor(){}

  /**
   *
   * @method "post"
   * @path "/"
   * @param req
   * @param res
   * @param next
   */
  public async createMenu(req: Request<{}, {}, IMenu>, res: Response, next: NextFunction) {
    try {
      const body = req.body as Pick<IMenu, "name" | "description" | "price">;
      const menu: IMenu = new Menu({
        name: body.name,
        description: body.description,
        price: body.price,
      });

      const newMenu: IMenu = await menu.save();

      next({
        code: 0,
        message: "success",
        data: newMenu,
      });
    } catch (error) {
      next({
        code: false,
        message: error.message,
      });

    }
  }

  /**
   *
   * @method "get"
   * @path "/"
   * @param req
   * @param res
   * @param next
   */
  public async getMenus(req: Request, res: Response, next: NextFunction) {
    try {
      const { field, sort } = req.query; // Extract field and sort from query parameters

      let sortCriteria: any = {};
      if (typeof field === 'string' && sort) {
        sortCriteria[field] = sort === 'desc' ? -1 : 1;
      }

      const menus: IMenu[] = await Menu.find({}).sort(sortCriteria);
      next({
        code: 0,
        message: "success",
        data: menus,
      });
    } catch (error) {
      next({
        code: false,
        message: error.message,
      });
    }
  }

  /**
   *
   * @method "get"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async retrieveMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const menu: IMenu | null = await Menu.findById({ _id: id });

      next({
        code: 0,
        message: "success",
        data: menu,
      });
    } catch (error) {
      next({
        code: false,
        message: error.message,
      });
    }
  }

  /**
   *
   * @method "put"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async updateMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        body,
      } = req;

      const updateMenu: IMenu | null = await Menu.findByIdAndUpdate(
        { _id: id },
        body,
        { new: true }
      );

      next({
        code: 0,
        message: "success",
        data: updateMenu,
      });
    } catch (error) {
      next({
        code: false,
        message: error.message,
      });
    }
  }

  /**
   *
   * @method "delete"
   * @path "/:id"
   * @param req
   * @param res
   * @param next
   */
  public async deleteMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;

      const deleteMenu: IMenu | null = await Menu.findByIdAndDelete({ _id: id });

      next({
        code: 0,
        message: "success",
        data: deleteMenu,
      });
    } catch (error) {
      next({
        code: false,
        message: error.message,
      });
    }
  }
}