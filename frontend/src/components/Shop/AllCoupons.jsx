import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [value, setValue] = useState(null);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${server}/coupon/get-coupon/${seller._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setIsLoading(false);
                setCoupons(res.data.couponCodes);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, [dispatch]);

    const handleDelete = async (id) => {
        axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
            toast.success("ลบรหัสคูปองเรียบร้อยแล้ว!")
        });
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/coupon/create-coupon-code`,
                {
                    name,
                    minAmount,
                    maxAmount,
                    selectedProducts,
                    value,
                    shopId: seller._id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("สร้างรหัสคูปองเรียบร้อยแล้ว!");
                setOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const columns = [
        { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "รหัสคูปอง",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "ค่าใช้จ่าย",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    coupons &&
        coupons.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                price: item.value + " %",
                sold: 10,
            });
        });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 cursor-pointer`}
                            onClick={() => setOpen(true)}
                        >
                            <span className="text-white">สร้างรหัสคูปอง</span>
                        </div>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                    {open && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <h5 className="text-[30px] font-Poppins text-center">
                                    สร้างรหัสคูปอง
                                </h5>
                                {/* สร้างรหัสคูปอง */}
                                <form onSubmit={handleSubmit} aria-required={true}>

                                    <div>
                                        <label className="pb-2">
                                            ชื่อ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="ป้อนชื่อรหัสคูปองของคุณ..."
                                        />
                                    </div>

                                    <div>
                                        <label className="pb-2">
                                            เปอร์เซ็นต์ส่วนลด{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="value"
                                            value={value}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="ป้อนค่าใช้จ่ายของรหัสคูปอง..."
                                        />
                                    </div>

                                    <div>
                                        <label className="pb-2">จำนวนเงินขั้นต่ำ</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={minAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setMinAmount(e.target.value)}
                                            placeholder="ป้อนจำนวนเงินขั้นต่ำของรหัสคูปอง..."
                                        />
                                    </div>

                                    <div>
                                        <label className="pb-2">จำนวนเงินสูงสุด</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={maxAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setMaxAmount(e.target.value)}
                                            placeholder="ป้อนจำนวนเงินสูงสุดของรหัสคูปอง..."
                                        />
                                    </div>

                                    <div>
                                        <label className="pb-2">ผลิตภัณฑ์ที่เลือก</label>
                                        <select
                                            className="w-full mt-2 border h-[35px] rounded-[5px]"
                                            value={selectedProducts}
                                            onChange={(e) => setSelectedProducts(e.target.value)}
                                        >
                                            <option value="เลือกผลิตภัณฑ์ที่เลือก">
                                                เลือกผลิตภัณฑ์
                                            </option>
                                            {products &&
                                                products.map((i) => (
                                                    <option value={i.name} key={i.name}>
                                                        {i.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <input
                                            type="submit"
                                            value="สร้าง"
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AllCoupons;
