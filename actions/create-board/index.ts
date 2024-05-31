"use server";

import { auth } from "@clerk/nextjs/server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-actions";

import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
   const { userId } = auth();

   if (!userId) {
      return {
         error: "User not found",
      };
   }

   const { title } = data;

   let board;

   try {
      board = await db.board.create({
         data: {
            title,
         },
      });
   } catch (error) {
      return {
         error: "failed to create",
      };
   }

   revalidatePath(`/board/${board.id}`);

   return { data: board };
};

export const createBoard = CreateSafeAction(CreateBoard, handler);
