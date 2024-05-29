import { z } from "zod";

export const CreateBoard = z.object({
   title: z
      .string({
         required_error: "title é obrigatório",
         invalid_type_error: "title é obrigatório",
      })
      .min(3, {
         message: "title deve ter no mínimo 3 caracteres",
      }),
});
