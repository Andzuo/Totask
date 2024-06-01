import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"/>
                Suas áreas de trabalho
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col text-center gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm"> Criar nova Área de trabalho</p>
                        <span className="text-xs">
                            5 restantes
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`
                                Free Worksapaces can have up to 5 open boards. For unlimited
                                boards upgrade this workspace.
                            `}
                        >
                            <HelpCircle 
                                className="absolute bttom-2 right-2 h-[14px] w-[14px] text-neutral-500"
                            />
                        </Hint>    
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}   