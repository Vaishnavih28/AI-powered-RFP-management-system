import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
    return (
        <div className="p-5 flex shadow-sm border-b justify-between">
            <div>

            </div>
            <div>
                <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage alt="Icon" />
                    <AvatarFallback>VH</AvatarFallback>
                </Avatar>


            </div>
        </div>

    )
}

export default Header