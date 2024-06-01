import { z } from "zod";

export const CreateBoard = z.object({
   title: z
      .string({
         required_error: "título é obrigatório",
         invalid_type_error: "título é obrigatório",
      })
      .min(3, {
         message: "título deve ter no mínimo 3 caracteres",
      }),
   image: z.string({
      required_error: "imagem é obrigatório",
      invalid_type_error: "imagem é obrigatório",
   }),
});
