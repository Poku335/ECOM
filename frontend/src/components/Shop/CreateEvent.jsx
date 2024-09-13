import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.events);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("สร้างโปรโมชั่นสำเร็จ!");
            navigate("/dashboard-events");
            window.location.reload();
        }
    }, [dispatch, error, success]);

    const handleImageChange = (e) => {
        e.preventDefault();

        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);
        newForm.append("start_Date", startDate.toISOString());
        newForm.append("Finish_Date", endDate.toISOString());
        dispatch(createevent(newForm));
    };

    return (
        <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">สร้างโปรโมชั่น</h5>
            {/* สร้างฟอร์มกิจกรรม */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        ชื่อโปรโมชั่น <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ป้อนชื่อโปรโมชั่นของคุณ..."
                    />
                </div>  
                <br />
                <div>
                    <label className="pb-2">
                        รายละเอียด <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="ป้อนรายละเอียดของโปรโมชั่น..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        หมวดหมู่ <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="เลือกหมวดหมู่">เลือกหมวดหมู่</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">แท็ก</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="ป้อนแท็กโปรโมชั่นของคุณ..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">ราคาเดิม</label>
                    <input
                        type="number"
                        name="price"
                        value={originalPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="ป้อนราคาโปรโมชั่น..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        ราคา (ลดราคา) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={discountPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="ป้อนราคาโปรโมชั่นหลังลดราคา..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        จำนวนสินค้าคงคลัง <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={stock}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="ป้อนจำนวนสินค้าคงคลังของโปรโมชั่น..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        วันที่เริ่มโปรโมชั่น <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="price"
                        id="start-date"
                        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleStartDateChange}
                        min={today}
                        placeholder="ป้อนวันที่เริ่มโปรโมชั่น..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        วันที่สิ้นสุดโปรโมชั่น <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="price"
                        id="end-date"
                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleEndDateChange}
                        min={minEndDate}
                        placeholder="ป้อนวันที่สิ้นสุดโปรโมชั่น..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">รูปภาพโปรโมชั่น</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                    />
                    <div className="w-full flex justify-center flex-wrap mt-3">
                        {images &&
                            images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    className="h-[100px] w-[100px] object-cover rounded-md m-1"
                                    alt=""
                                />
                            ))}
                    </div>
                </div>
                <br />
                <button
                    type="submit"
                    className="w-full flex justify-center items-center text-white bg-blue-500 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    สร้างโปรโมชั่น
                    <AiOutlinePlusCircle className="ml-3" />
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
