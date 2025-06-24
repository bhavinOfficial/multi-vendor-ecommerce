import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNavs } from "../navigation/index.js";
import { BiLogInCircle } from "react-icons/bi";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs("admin");
    setAllNav(navs);
  }, []);
  return (
    <div>
      <div onClick={() => setShowSidebar(false)} className={`fixed duration-200 ${!showSidebar ? "invisible" : "visible"} w-screen h-screen top-0 left-0 z-10 border bg-red-500`}></div>
      <div
        className={`w-[260px] fixed bg-[#283046] z-50 top-0 left-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : 'left-[-260px] lg:left-0'}`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img
              src="/images/bird_2.png"
              alt="logo image"
              className="w-full h-full"
            />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav &&
              allNav.length > 0 &&
              allNav.map((nav, i) => (
                <li key={i}>
                  <Link
                    to={nav.path}
                    className={`${
                      pathname === nav.path
                        ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500"
                        : "text-[#d0d2d6] font-normal duration-200"
                    } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                  >
                    <span>{nav.icon}</span>
                    <span>{nav.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1">
                  <span><BiLogInCircle /></span>
                  <span>Logout</span>
                </button>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
