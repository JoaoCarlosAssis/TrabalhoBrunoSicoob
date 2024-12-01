import Image from "next/image";
import logo from '../../../public/logo.png'

export function HeaderMenu(){
    return(
        <div className="p-8 bg-[#003641] flex justify-between w-full">
            <div>
                <Image src={logo} width={100} alt="Logo siccob"/>
            </div>
        </div>
    )
}