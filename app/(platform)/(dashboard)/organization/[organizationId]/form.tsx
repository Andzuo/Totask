"use client";

import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use.actions";
import { createBoard } from "@/actions/create-board/index";

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

      execute({ title })
   }

   return (
      <form action={onSubmit}>
         <div className="flex flex-col space-y-2">
            <FormInput errors={fieldErrors as { title?: string[] | undefined; }}/>
         </div>
         <FormButton />
      </form>
   );
};
