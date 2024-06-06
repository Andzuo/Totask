"use client";

import { List } from "@prisma/client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-actions";

import { deleteList } from "@/actions/delete-list";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;

}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {
    const {execute: executeDelete} = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success("Lista deletada com sucesso");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({id, boardId});
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Adicionar Card
                </Button>
                <form>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copiar Lista
                    </FormSubmit> 
                </form>
                <Separator />
                <form
                    action={onDelete}
                >
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Deletar Lista
                    </FormSubmit> 
                </form>
            </PopoverContent>
        </Popover>
    );
};