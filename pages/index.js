//compoents
import Link from 'next/link'
import Navbar from '../components/Navbar'
export default function Home() {
  return (
   <main>
      <Navbar></Navbar>
      <div className='grid grid-cols-8'>
         <div className='col-span-2'></div>
         <div className='col-span-2 bg-img-home'>
          
         </div>
        <div className='col-span-2 grid grid-cols-1 pt-60 pb-40'>
          <div className='text-center py-5'>
              <button className='bg-blue-500 w-60 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                  <Link href="/register">REGISTER</Link>
              </button>
          </div>
          <div className='text-center py-5'>
             <button className='bg-blue-500 w-60 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                  <Link href="/delete">DELETE</Link>
            </button>
          </div>
          <div className='text-center py-5'>
            <button className='bg-blue-500 w-60 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                  <Link href="/update">UPDATE</Link>
            </button>
          </div>  
         </div>
         <div className='col-span-2'></div>
         
      </div>
   </main>
  )
}
