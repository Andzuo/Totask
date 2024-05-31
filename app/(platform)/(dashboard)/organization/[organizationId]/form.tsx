"use client";

import { createBoard } from "@/actions/create-board/index";

import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use.actions";
import { FormInput } from "@/components/form/form-input";

export const Form = () => {
   const { execute, fieldErrors} = useAction(createBoard, {
      onSuccess: (data) => {
         console.log(data, "sucess")
      },
      onError: (error) => {
         console.error("error")
      }
   });

   const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;

      console.log({title})

      execute({ title })
   }

   return (
      <form action={onSubmit}>
         <div className="flex flex-col space-y-2">
            <FormInput 
               label=" Área de trabalho"
               errors={fieldErrors as { title?: string[] | undefined; }}
                id="title"/>
         </div>
         <FormSubmit>
            Salvar
         </FormSubmit>
      </form>
   );
};
