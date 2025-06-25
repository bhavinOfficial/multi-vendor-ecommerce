import { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {

    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: '',
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


  return <div className="px-2 md:px-7 py-5">
    <div className="w-full bg-[#283046] p-4 rounded-md">
        <div className="flex justify-between items-center pb-4">
            <h1 className="text-[#d0d2d6] text-xl font-semibold ">
                Add Product
            </h1>
            <Link to='/seller/dashboard/products' className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2">Products</Link>
        </div>
        <div>
            <form>
                <div className="flex flex-col md:flex-row gap-4 w-full text-[#d0d2d6] mb-3">
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name">Product name</label>
                        <input type="text" id='name' placeholder='product name' name='name' className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]" onChange={inputHandle} value={state.name}/>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="brand">Product brand</label>
                        <input type="text" id='brand' placeholder='product brand' name='brand' className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]" onChange={inputHandle} value={state.brand}/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full text-[#d0d2d6] mb-3">
                    <div className="flex flex-col w-full gap-1 relative">
                        <label htmlFor="category">Category</label>
                        <input type="text" id='name' placeholder='product name' name='name' className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]" onChange={inputHandle} value={state.name}/>
                        <div className={`absolute top-[101%] bg-slate-800 w-full transition-all ${cateShow ? "scale-100" : "scale-0"}`}>

                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="stock">Stock</label>
                        <input type="text" id='stock' placeholder='product stock' name='stock' className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]" onChange={inputHandle} value={state.stock}/>
                    </div>
                </div>
            </form>
        </div>
    </div>
  </div>;
};

export default AddProduct;
