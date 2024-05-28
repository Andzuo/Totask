import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Board } from "./board";

const OrganizationIdPage = async () => {
   const boards = await db.board.findMany();

   return (
      <div className="flex flex-col space-y-4">
         <form action={create}>
            <input
               type="title"
               name="title"
               required
               placeholder="Coloque o nome da sua Área de trabalho"
               className="border-blak border p-1"
            />
            <Button className="" type="submit">
               Criar
            </Button>
         </form>
         <div className="space-y-2">
            {boards.map((board) => (
               <div key={board.id}>
                  <Board key={board.id} title={board.title} id={board.id} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default OrganizationIdPage;
