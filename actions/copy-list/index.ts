"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";

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
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
            include: {
                cards: true,
            },
        });

        if (!listToCopy) {
            return {
                error: "List not found",
            }
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - copia`,
                order: newOrder,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order,
                        })),
                    },
                },
            },
            include: {
                cards: true,
            },
        });
    } catch (error) {
        return {
            error: "Erro ao copiar",
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const copyList = CreateSafeAction(CopyList, handler);