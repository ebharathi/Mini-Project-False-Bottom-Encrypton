import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
const UpdateCreditCard=({propname=true,propnumber=true,propcvc=true,propexpiry=true})=>{
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const [cardNumber,setCardNumber]=useState([]);
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
        setExpiry(expiryMonthSelect+expiryYearSelect.substring(2));
    },[expiryMonthSelect,expiryYearSelect])
    //handle iput change for number
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && index >= 0 && index <= 3) {
            setCardNumber(prevArray => {
                const newArray = [...prevArray];
                newArray[index] = value; 
                let n=""; 
                newArray.map((i)=>{
                      n+=i;
                 })
                 console.log("Number ------>",n)
                 setNumber(n);
                return newArray;
              });
        }
      };
      useState(()=>{
        let n=""; 
        cardNumber.map((i)=>{
              n+=i;
         })
         setNumber(n);
      },[cardNumber])
      function moveToNext(currentInput, nextInputId) {
        var maxLength = 4;
        if (currentInput.target.value.length >= maxLength) {
            var nextInput = document.getElementById(nextInputId);

            if (nextInput) {
                nextInput.focus();
            }
        }
      }
      //form submit function
      const handleSubmit=async(e)=>{
        e.preventDefault();
         console.log("CARD NUMBER--->",number);
         console.log("CVC--->",cvc);
         console.log("EXPIRY DATE--->",expiry);
         console.log("NAME-->",name);
         //code to send request to python
         let options={
            url:'',//python router
            method:'POST',
            data:{
                cardHoldername:name,
                cardNo:number,
                cardCVC:cvc,
                expiry:expiry
            }
         }
         await axios(options)
         .then((response)=>{
              console.log("RESPONSE FROM PYTHON BACKEND--------->",response);
         })
      }
   return(
    <div className='flex justify-center items-center mt-20'>
      <div className='flex flex-col'>
        <div className='text-center'>
            <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focused}
            name={name}
            number={number}
            />
        </div>
        <div className='flex justify-center items-center  px-20 '>
            <form className='pt-10'>
            <div className='text-center py-3'>
            <input
                 className='border-1 border-[#70706f] w-full px-6 py-2 rounded-md outline-none'
                 placeholder='CARD HOLDER' 
                 type='text'
                 maxLength={    30}
                 name="name" 
                 value={name}
                 onChange={(e)=>{setName(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
            </div>
                 <div className='my-2 flex justify-center items-center'>
                     <ReCAPTCHA sitekey="6LfuaBUpAAAAAPcnG95Ak3oOBd8bqh2dKBwYe4qN" />
                 </div>
                 <div className='text-center'>
                    <button
                     onClick={(e)=>handleSubmit(e)}
                    className='btn bg-black  px-5 py-2 rounded-lg text-white w-full hover:text-[black] hover:border-1 hover:border-black hover:bg-white'
                    >
                        UPDATE
                    </button>
                 </div>
            </form>
        </div>
      </div>
    </div>
   )
}
export default UpdateCreditCard;