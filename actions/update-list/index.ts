"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, id, boardId } = data;

    let list;

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            error: "Error updating board",
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
}

export const updateList = CreateSafeAction(UpdateList, handler);