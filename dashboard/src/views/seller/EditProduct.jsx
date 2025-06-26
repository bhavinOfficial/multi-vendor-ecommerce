import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const EditProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Sports",
    },
    {
      id: 2,
      name: "Mobile",
    },
    {
      id: 3,
      name: "Jersey",
    },
    {
      id: 4,
      name: "Pant",
    },
    {
      id: 5,
      name: "Watch",
    },
  ];
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState(categories);
  const [searchValue, setSearchValue] = useState("");

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValues = allCategories.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategories(srcValues);
    } else {
      setAllCategories(categories);
    }
  };
  const [images, setImages] = useState([]);
  const [imagesShow, setImagesShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length) {
        console.log(img);
        console.log(files[0]);
    } 
  };

//   const removeImage = (i) => {
//     const filterImages = images.filter((image, index) => index !== i);
//     const filterImagesUrls = imagesShow.filter((image, index) => index !== i);
//     setImages(filterImages);
//     setImagesShow(filterImagesUrls);
// };

  useEffect(() => {
      setState({
      name: "Men's Premium soft...",
      description: "Men's Premium soft...",
      discount: 10,
      price: 455,
      brand: "Easy",
      stock: 10,
    });
    setCategory("Sports");
    setImagesShow([
        '/images/bird_2.png',
        '/images/bird_2.png',
        '/images/bird_2.png'
    ]);
  }, []);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full bg-[#283046] p-4 rounded-md pb-10">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold ">
            Edit Product
          </h1>
          <Link
            to="/seller/dashboard/products"
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            Products
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col md:flex-row gap-4 w-full text-[#d0d2d6] mb-3">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="product name"
                  name="name"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="product brand"
                  name="brand"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full text-[#d0d2d6] mb-3">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  placeholder="--select category--"
                  onClick={() => setCateShow(!cateShow)}
                  type="text"
                  id="category"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      type="text"
                      placeholder="search"
                      className="w-full px-3 py-1 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] oerflow-hidden"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-auto">
                    {allCategories.map((c, i) => {
                      return (
                        <span
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            category === c.name && "bg-indigo-500"
                          }`}
                          key={i}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategories(categories);
                          }}
                        >
                          {c.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  placeholder="product stock"
                  name="stock"
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full text-[#d0d2d6] mb-3">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="price"
                  name="price"
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Discount (in %)</label>
                <input
                  type="number"
                  id="discount"
                  min="0"
                  placeholder="discount"
                  name="discount"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="brand">Description</label>
              <textarea
                rows="4"
                id="description"
                placeholder="description"
                name="description"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs-gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
                    {
                        imagesShow.map((img, i) => <div>
                            <label htmlFor={i}>
                                <img src={img} alt="" />
                            </label>
                            <input onChange={(e) => changeImage(img, e.target.files)} type="file" id={i} className="hidden" />
                        </div>)
                    }
            </div>
            <div className="flex">
              <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
