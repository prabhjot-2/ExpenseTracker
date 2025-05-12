import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { LuImage,LuX } from "react-icons/lu"

const EmojiPickerPopup = ({icon,onSelect}) => {
    const [isOpen,setIsOpen]=useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
    <div className="flex items-center gap-4 cursor-pointer"
        onClick={()=>setIsOpen(true)}
    >
        <div className="">
        {icon ? (<img src={icon} alt="Icon" className=""/>

        ):(
            <LuImage/>
        )}

        </div>
        <p className="">
            {icon? "Chnage Icon": "Pick Icon"}
        </p>
    </div>
    {isOpen && (
        <div className=""
            >
            <button  className=" "
            onClick={()=>setIsOpen(false)}
            >
                <LuX/>
            </button>
            
            <EmojiPicker 
                open={isOpen}
                onEmojiClick={(emoji)=>onSelect(emoji?.imageUrl || "")}
            />
        </div>
        )
    }
      
    </div>
  )
}

export default EmojiPickerPopup
