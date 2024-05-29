"use client";

import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useState } from "react";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
   const initialState = { message: "", errors: { title: [] } }; // Update initial state object
   const [state, dispatch] = useFormState(create, initialState);

   return (
      <form action={dispatch}>
         <div className="flex flex-col space-y-2">
            <FormInput errors={state?.errors} />
         </div>
         <FormButton />
      </form>
   );
};
