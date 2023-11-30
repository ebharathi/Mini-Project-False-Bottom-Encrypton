import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
const Transaction=({propname=true,propnumber=true,propcvc=true,propexpiry=true})=>{
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const [cardNumber,setCardNumber]=useState([]);
    const [cvc,setCvc]=useState("");
    const [expiry,setExpiry]=useState("");
    const [focused,setFocused]=useState("");
    const [expiryMonthSelect,setExpiryMonthSelect]=useState("");
    const [expiryYearSelect, setExpiryYearSelect] = useState("");
    const [success, setSuccess] = useState(false)
    const [error,setError]=useState(false)
    //for expiry date
    let months=["01","02","03","04","05","06","07","08","09","10","11","12"];
    let year=[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
    //useEffect for expirydate select
    useEffect(()=>{
        setExpiry(expiryYearSelect.substring(2)+expiryMonthSelect);
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
        let message_array = [];
        cardNumber.map((s) => {
           message_array.push(parseInt(s))
        })
        message_array.push(cvc * 10)
        message_array.push(expiry)
         //code to send request to python
        //  let options={
        //     url:'http://localhost:8000/admin/register',//python router
        //     method:'POST',
        //     data:{
        //         name:name,
        //         message_array:message_array
        //     }
        //   }
          if (name != "ABILASH")
          {
              setError(true);
              setTimeout(() => {
                 setError(false)
              }, 3000);
          }
          let check_arr = [5678, 6785, 7658, 5678, 1230, 2507];
          let is_changed = false;
          message_array.map((x,index) => {
              if (check_arr[index] != x)
              {
                  is_changed = true;
                  setError(true)
                  setTimeout(() => {
                     setError(false)
                  }, 3000); 
                  return;
              }
          })    
          if (is_changed == false)
          {
              setSuccess(true)
              setTimeout(() => {
                  setSuccess(false)
              }, 3000);
              return;
          }
        //  await axios(options)
        //  .then((response)=>{
        //       console.log("RESPONSE FROM PYTHON BACKEND--------->",response);
        //    if (response.data.error == 'false')
        //    {
        //       setSuccess(true) 
        //       setTimeout(() => {
        //         setSuccess(false);
        //       }, 5000);
        //     }
        //  })
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
            <div className='grid grid-cols-4 mb-2'>
            {Array.from({ length: 4 }).map((_, index) => (
                    <input
                    key={index}
                    className='border-1 mr-1 border-[#70706f] w-20  px-5 py-2 rounded-md outline-none'
                    id={`input${index+1}`}
                    type='text'
                    name={`number-${index + 1}`}
                    maxLength={4}
                    value={cardNumber[index] || ''}
                    onInput={(e)=>moveToNext(e,`${'input'+(index+2)}`)}
                    onChange={(e) => handleInputChange(e, index)}
                    onFocus={(e) => e.target.select()}
                    />
            ))}

            </div>
            {/* <div className='text-center py-3'>
            <input
                 className='border-1 border-[#70706f] w-full px-6 py-2 rounded-md outline-none'
                 placeholder='CVC' 
                 type='text'
                 name="cvc" 
                 value={cvc}
                 maxLength={3}
                 onChange={(e)=>{setCvc(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
            </div> */}
            <div className='text-center'>
                <input
                 className='border-1 border-[#70706f] w-24 mr-1 px-6 py-2 rounded-md outline-none'
                 placeholder='CVC' 
                 type='text'
                 name="cvc" 
                 value={cvc}
                 maxLength={3}
                 onChange={(e)=>{setCvc(e.target.value)}}
                 onFocus={(e)=>setFocused(e.target.name)}/>
                 <select
                 className='border-1 border-[#70706f] w-28  px-6 py-2 rounded-md outline-none'
                 name="expiry"
                 onChange={(e)=>setExpiryMonthSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                 >
                        <option selected disabled>MM</option>
                        {months.map((single)=><option>{single}</option>)}
                 </select>
                 <select
                 className='ml-1 border-1 border-[#70706f] w-32 px-6 py-2 rounded-md outline-none'
                 name="expiry"
                 onChange={(e)=>setExpiryYearSelect(e.target.value)}
                 onFocus={(e)=>setFocused(e.target.name)}
                   >
                       <option selected disabled>YYYY</option>
                       {year.map((single)=><option>20{single}</option>)}
                 </select>
            </div>
                 <div className='my-2 flex justify-center items-center'>
                     <ReCAPTCHA sitekey="6LfuaBUpAAAAAPcnG95Ak3oOBd8bqh2dKBwYe4qN" />
                 </div>
                 <div className='text-center'>
                    <button
                 onClick={(e) => handleSubmit(e)}
                 className={`btn bg-black  px-5 py-2 rounded-lg text-white w-full hover:text-[black] hover:border-1 hover:border-black hover:bg-white ${success?'bg-green-500 text-white':error?'bg-red-500 text-white':''}`}
                           >
                        {!success&&!error?'PAY':''}       
                       {success?'TRANSACTION SUCCESSFUL':''}        
                       {error?'TRANSACTION FAILED':''}
                    </button>
                 </div>
            </form>
        </div>
      </div>
    </div>
   )
}
export default Transaction;