

import { RiUser3Line } from "react-icons/ri";
import {useAuth} from "../../store/hooks.ts";
import {useNavigate} from "react-router-dom";




export function UserIcon() {
    const {isAuth, name} = useAuth()
    const nav  = useNavigate()


 
    return (
      <div>
          {isAuth ?
              <div className='bg-[#eeeeef] w-[50px] h-[50px] rounded-full flex justify-center items-center'>
               
                  <p className="text-[black] text-[18px] font-['Inter-ExtraBold']">{
                      // @ts-ignore
                      name[0].toUpperCase()}</p>
              </div> :
              <div onClick={() => nav('/market/sign-up')} className="nav-icon">
                  <RiUser3Line/>
              </div>
              }
              </div>
              );
          }