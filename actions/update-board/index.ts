"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, id } = data;

    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
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

    revalidatePath(`/board/${id}`);
    return { data: board };
}

export const updateBoard = CreateSafeAction(UpdateBoard, handler);