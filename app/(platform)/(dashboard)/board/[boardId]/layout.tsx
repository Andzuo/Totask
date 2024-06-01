import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { title } from "process";
import { BoardNavbar } from "./_components/board.navbar";

export async function generateMetadata({
    params
}: {
    params: {boardId: string};
}) {
    const {orgId} = auth();

    if (!orgId) {
        return {
            title: "Área de trabalho"
        };
    };

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        },
    });

    return {
        title: board?.title || "Área de trabalho",
    }
}

const BoardIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {boardId: string};
}) => {
    const {orgId} =auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        },
    });

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative bg-no-repeat bg-center bg-cover h-full"
            style={{ backgroundImage: `url(${board.imageFullUrl})`}}
        >
            <BoardNavbar id={params.boardId}/>
            <div className="absolute inset-0 bg-black/10"/>
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    );
}

export default BoardIdLayout;