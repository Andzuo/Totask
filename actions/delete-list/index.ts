"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data;

    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
        });
    } catch (error) {
        return {
            error: "Erro ao deletar",
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const deleteList = CreateSafeAction(DeleteList, handler);