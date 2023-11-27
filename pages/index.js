//compoents
import Link from 'next/link'
import Navbar from '../components/Navbar'
export default function Home() {
  return (
   <main>
        <Navbar></Navbar>
        <div className='mt-10 grid grid-cols-5'>
            <div className='col-span-1'></div>
            <div className='col-span-1 text-center'>
          <button className='bg-blue-500 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                <Link href="/register">REGISTER</Link>
          </button>
            </div>
            <div className='col-span-1 text-center'>
          <button className='bg-blue-500 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                <Link href="/delete">DELETE</Link>
                </button>
            </div>
            <div className='col-span-1 text-center'>
          <button className='bg-blue-500 rounded-md px-10 py-5 text-[20px] text-white hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500'>
                <Link href="/update">UPDATE</Link>
          </button>
            </div>
            <div className='col-span-1'></div>
        </div>
   </main>
  )
}
