import { BsImage } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { messageClear, profile_image_upload } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector((state) => state.auth);

  const add_image = (e) => {
    if (e.target.files.length) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  }

    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
      }
  
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    }, [successMessage, errorMessage, dispatch]);



  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full bg-[#283046] rounded-md p-4 text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                  htmlFor="img"
                >
                  <img
                    src={userInfo?.image}
                    alt="profile"
                    className="w-full h-full"
                  />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImage />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" className="hidden" id="img" onChange={add_image} />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>{userInfo?.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>{userInfo?.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>{userInfo?.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>{userInfo?.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {userInfo?.paymentStatus === "active" ? (
                      <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo?.paymentStatus}
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      type="text"
                      id="Shop"
                      placeholder="shop name"
                      name="shopName"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="division">Division</label>
                    <input
                      type="text"
                      id="division"
                      placeholder="division"
                      name="price"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="name">District</label>
                    <input
                      type="text"
                      id="district"
                      placeholder="district"
                      name="district"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="subDistrict">Sub District</label>
                    <input
                      type="text"
                      id="subDistrict"
                      placeholder="sub-district"
                      name="subDistrict"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    />
                  </div>
                  <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                    Add
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>Sheikh Fashion</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division: </span>
                    <span>Rangpur</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>Kurigram</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District: </span>
                    <span>Nageshwari</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="email"
                    name="email"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    placeholder="old password"
                    name="old_password"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="oldPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="new password"
                    name="new_password"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  />
                </div>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
