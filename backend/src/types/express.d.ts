/**
 * Extensions de types Express.
 * Ce fichier servira a typer les proprietes ajoutees aux requetes, par exemple req.user apres authentification.
 */
export {};

declare global {
  declare namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
