import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
const CreditCard=()=>{
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const [cvc,setCvc]=useState("");
    const [expiry,setExpiry]=useState("");
    const [focused,setFocused]=useState("");
    const [expiryMonthSelect,setExpiryMonthSelect]=useState("");
    const [expiryYearSelect,setExpiryYearSelect]=useState("");
    //for expiry date
    let months=["01","02","03","04","05","06","07","08","09","10","11","12"];
    let year=[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
    //useEffect for expirydate select
    useEffect(()=>{
        setExpiry(expiryMonthSelect+expiryYearSelect);
    },[expiryMonthSelect,expiryYearSelect])
   return(
    <div className='flex justify-center items-center mt-20'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex justify-center items-center'>
            <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focused}
            name={name}
            number={number}
            />
        </div>
        <div className='flex justify-center items-center  px-20'>
            <form className='pt-20'>
                <input 
                 className='border-2 px-6 py-2'
                 placeholder='Card Number' 
                 type='number'
                 name="number" 
                 onChange={(e)=>{setNumber(e.target.value);}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                <input
                 className='border-2 px-6 py-2'
                 placeholder='Holder Name' 
                 type='text'
                 name="name" 
                 onChange={(e)=>{setName(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                <input
                 className='border-2 px-6 py-2'
                 placeholder='CVC' 
                 type='number'
                 name="cvc" 
                 onChange={(e)=>{setCvc(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <br/>
                 <br/>
                 <select
                 className='border-2 px-6 py-2'
                 name="expiry"
                 onChange={(e)=>setExpiryMonthSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                 >
                        {months.map((single)=><option>{single}</option>)}
                 </select>
                 <select
                 className='border-2 px-10 py-2'
                 name="expiry"
                 onChange={(e)=>setExpiryYearSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                   >
                       {year.map((single)=><option>20{single}</option>)}
                 </select>
                 <br/>
                 <br/>
                 <div className='text-center'>
                    <button
                    type="submit"
                    className='btn bg-[#2578f5] px-5 py-2 rounded-lg text-white hover:text-[#2578f5] hover:bg-white'
                    >
                        PAY
                    </button>
                 </div>
            </form>
        </div>
      </div>
    </div>
   )
}
export default CreditCard;