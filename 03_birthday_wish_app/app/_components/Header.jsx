import React from 'react'
import Image from "next/image"
import { button } from "components/ui/button"

function Header (){
    return (
        <div className= 'p-5'>
            <Image src={'./logo.svg'}
            alt = 'logo'
            width={160}
            height={100}
            />
            <button> Get Started </button>
             </div>

    )
}

export default Header