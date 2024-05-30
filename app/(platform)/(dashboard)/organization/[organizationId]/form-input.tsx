"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
   errors?: {
      title?: string[];
   },
}

export const FormInput = ({ errors }: FormInputProps) => {
   const { pending } = useFormStatus();

   return (
      <div>
         <Input
            type="title"
            name="title"
            required
            placeholder="Coloque o nome da sua Área de trabalho"
            disabled={pending}
         />
         {errors?.title ? (
            <div>
               {errors.title.map((error: string) => (
                  <p key={error} className="text-rose-500">
                     {error}
                  </p>
               ))}
            </div>
         ) : null}
      </div>
   );
};
