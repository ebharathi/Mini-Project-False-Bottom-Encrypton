import Navbar from "@/components/Navbar";
import UpdateCreditCard from "@/components/UpdateCreditCard";
import { list } from "postcss";
import { useEffect, useState } from "react";
import axios from "axios";
const Update = () => {
    const [blur, setIsBlur] = useState(false);
    const [val, setVal] = useState("");
    const [list1, setList1] = useState("");
    const [list2, setList2] = useState("");
    const [list3, setList3] = useState("");
    const [name, setName] = useState("");
    const [item1,setItem1]=useState("")
    const [item2,setItem2]=useState("")

    const [selectedOption, setSelectedOption] = useState(0);

    const [success, setSuccess] = useState(false);
    const updateCardInfos = async (name) => {
        setIsBlur(true);
        setName(name)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("value entered-->", val, " for-->", selectedOption);
        await axios.post("http://localhost:8000/admin/update", {
            name: name,
            index: selectedOption,
            temp: [parseInt(list1), parseInt(list2), parseInt(list3)],
            temp1:[parseInt(item1),parseInt(item2)]
        }).then((response) => {
            console.log("response--->", response)
            if(response.data.error=="false")
              setSuccess(true);
        })
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
                              <option value={0}>CARD NUMBER (1st FOUR DIGITS)</option>
                              <option value={1}>CARD NUMBER (2nd FOUR DIGITS)</option>
                              <option value={2}>CARD NUMBER (3rd FOUR DIGITS)</option>
                              <option value={3}>CARD NUMBER (4th FOUR DIGITS)</option>
                              <option value={4}>CARD CVC</option>
                              <option value={5}>EXPIRY</option>
                        </select>
                        <div className="grid grid-cols-3 px-14">
                                <input value={list1} onChange={(e)=>setList1(e.target.value)} className="my-5 px-5 py-2 rounded-lg w-20" maxLength={1} />
                                <input value={list2} onChange={(e)=>setList2(e.target.value)} className="my-5 px-5 py-2 rounded-lg w-20" maxLength={1} />
                                <input value={list3} onChange={(e)=>setList3(e.target.value)} className="my-5 px-5 py-2 rounded-lg w-20" maxLength={1} />
                        </div>
                        <div className="grid grid-cols-2 px-20">
                                <input value={item1} onChange={(e)=>setItem1(e.target.value)} className="my-2 px-5 py-2 rounded-lg w-24" maxLength={1} />
                                <input value={item2} onChange={(e)=>setItem2(e.target.value)} className="my-2 px-5 py-2 rounded-lg w-24" maxLength={1} />
                        </div>
                        <button className={`mt-1 mb-3 px-5 py-2 rounded-md text-white bg-black border-1 border-black hover:text-black hover:bg-white ${success?'bg-green-500 text-white':''}`} onClick={(e)=>handleSubmit(e)}>
                            {success?'SUCCESSFULLY UPDATED':'UPDATE MY CARD'}
                        </button>
                    </div>
                    <span className="absolute top-0 right-3 text-[20px] cursor-pointer text-white" onClick={()=>setIsBlur(false)}>X</span>
               </div>
            </div>
        </main>
    )
}
export default Update;