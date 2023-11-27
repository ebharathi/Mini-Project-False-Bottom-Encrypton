import Navbar from "@/components/Navbar";
import UpdateCreditCard from "@/components/UpdateCreditCard";
import { useState } from "react";
const Update = () => {
    const [blur, setIsBlur] = useState(false);
    const [val, setVal] = useState("");
    const [selectedOption, setSelectedOption] = useState("0");
    const updateCardInfos = async (name) => {
        setIsBlur(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("value entered-->", val," for-->",selectedOption);
    }
    return (
        <main className="relative">
            <Navbar></Navbar>
            <div className={`grid grid-cols-6 pt-20`}>
                <div className="col-span-1"></div>
                <div className="col-span-2 bg-img3"></div>
                <div className="col-span-2">
                   <UpdateCreditCard updateCardInfos={updateCardInfos}></UpdateCreditCard>
                </div>
                <div className="col-span-1"></div>
            </div>
            <div className={`${blur?'block':'hidden'}  bg-[#a3a2a2] shadow-xl  rounded-lg text-black w-96    absolute top-40 left-[38%]`}>
                <div className="relative">
                    <div className="text-center py-10">
                           <select className="px-5 py-2 rounded-lg w-80" onChange={(e)=>setSelectedOption(e.target.value)}>
                              <option value={"0"}>CARD NUMBER (1st FOUR DIGITS)</option>
                              <option value={"1"}>CARD NUMBER (2nd FOUR DIGITS)</option>
                              <option value={"2"}>CARD NUMBER (3rd FOUR DIGITS)</option>
                              <option value={"3"}>CARD NUMBER (4th FOUR DIGITS)</option>
                              <option value="cvc">CARD CVC</option>
                              <option value="expiry">EXPIRY</option>
                        </select>
                        <input value={val} onChange={(e)=>setVal(e.target.value)} className="my-5 px-5 py-2 rounded-lg w-80" maxLength={4} />
                        <button className="mt-1 mb-3 px-5 py-2 rounded-md text-white bg-black border-1 border-black hover:text-black hover:bg-white" onClick={(e)=>handleSubmit(e)}>
                             UPDATE MY CARD
                        </button>
                    </div>
                    <span className="absolute top-0 right-3 text-[20px] cursor-pointer text-white" onClick={()=>setIsBlur(false)}>X</span>
               </div>
            </div>
        </main>
    )
}
export default Update;