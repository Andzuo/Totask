"use client";

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-actions";
import { createBoard } from "@/actions/create-board/index";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { X } from "lucide-react";
import { toast } from "sonner";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
        const { execute, fieldErrors} = useAction(createBoard, {
           onSuccess: (data) => {
              console.log(data, "sucess")
              toast.success("Área de trabalho criada!")
           },
           onError: (error) => {
              console.error(error, "error")
              toast.error(error);
           }
        });
        const onSubmit = (formData: FormData) => {
            const title = formData.get("title") as string;
            console.log("Formulário enviado com título:", title);
            execute({ title })
        };


    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Cria uma nova Área de trabalho
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto aw-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput className="outline-none"
                            id="title"
                            label="Título"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Criar
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}