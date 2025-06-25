import React from 'react'

function Navbar() {
  return (
   <>
<nav className='bg-slate-600 flex justify-between text-white items-center p-3'>
    <div>
 <span className='text-2xl font-bold mx-8'>iTask</span>
</div>

 <ul className='flex gap-4 mx-6'>
    <li className='text-white cursor-pointer'>Home</li>
    <li className='text-white cursor-pointer'>YourTasks</li>
    </ul>       
</nav>
   </>
  )
}
export default Navbar;
