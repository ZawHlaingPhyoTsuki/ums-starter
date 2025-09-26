import { NextFunction, Request, Response } from "express";
import { z } from "zod";

type ValidateProps = {
  schema: z.Schema<any>;
  target: "BODY" | "QUERY";
};

const validate = (props: ValidateProps) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { schema, target } = props;

    const validation = schema.safeParse(
      target === "BODY" ? req.body : req.query
    );

    if (!validation.success) {
      const formattedErrors = validation.error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        error: "Validation failed",
        details: formattedErrors,
      });
    }

    // Replace request data with parsed/validated data
    if (target === "BODY") {
      req.validatedBody = validation.data;
    } else {
      req.validatedQuery = validation.data
    }

    next();
  };
};

const validateRequestQuery = (schema: z.Schema<any>) => {
  return validate({
    schema,
    target: "QUERY",
  });
};

const validateRequestBody = (schema: z.Schema<any>) => {
  return validate({
    schema,
    target: "BODY",
  });
};

export { validateRequestBody, validateRequestQuery}