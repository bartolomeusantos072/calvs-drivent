import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentsSchema } from "@/schemas/payments-schemas";
import { getPayments, postPayments } from "@/controllers/payments-controller";

const paymentsRouter = Router();
paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(paymentsSchema), postPayments);

export { paymentsRouter };
