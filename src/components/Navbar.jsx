import React from 'react'
import { FaHome } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-900 text-white py-2.5'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>
                iTask
            </span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:scale-110 transition-all duration-75 my-2'><FaHome /></li>
        <li className='cursor-pointer hover:scale-110 transition-all duration-75 my-2'><GrTasks /></li>
        </ul>  
    </nav>
  )
}

export default Navbar