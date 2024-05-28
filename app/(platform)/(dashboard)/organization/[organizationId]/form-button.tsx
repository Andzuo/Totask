import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormButton = () => {
   const { pending } = useFormStatus();
   return (
      <Button disabled={pending} className="mt-2" type="submit">
         Criar
      </Button>
   );
};
