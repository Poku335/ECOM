import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
    return (
        <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
            {/* รายการเดี่ยว */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard" className="w-full flex items-center">
                    <RxDashboard
                        size={30}
                        color={`${active === 1 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        แดชบอร์ด
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-orders" className="w-full flex items-center">
                    <FiShoppingBag
                        size={30}
                        color={`${active === 2 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        การสั่งซื้อทั้งหมด
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-products" className="w-full flex items-center">
                    <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        สินค้าทั้งหมด
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link
                    to="/dashboard-create-product"
                    className="w-full flex items-center"
                >
                    <AiOutlineFolderAdd
                        size={30}
                        color={`${active === 4 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        เพิ่มสินค้า
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-events" className="w-full flex items-center">
                    <MdOutlineLocalOffer
                        size={30}
                        color={`${active === 5 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        โปรโมชั่น
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-event" className="w-full flex items-center">
                    <VscNewFile
                        size={30}
                        color={`${active === 6 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        สร้างโปรโมชั่น
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link
                    to="/dashboard-withdraw-money"
                    className="w-full flex items-center"
                >
                    <CiMoneyBill
                        size={30}
                        color={`${active === 7 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        ถอนเงิน
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-messages" className="w-full flex items-center">
                    <BiMessageSquareDetail
                        size={30}
                        color={`${active === 8 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        กล่องข้อความร้าน
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-coupouns" className="w-full flex items-center">
                    <AiOutlineGift
                        size={30}
                        color={`${active === 9 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        รหัสส่วนลด
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-refunds" className="w-full flex items-center">
                    <HiOutlineReceiptRefund
                        size={30}
                        color={`${active === 10 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 10 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        คืนเงิน
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/settings" className="w-full flex items-center">
                    <CiSettings
                        size={30}
                        color={`${active === 11 ? "crimson" : "#555"}`}
                    />
                    <h5
                        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 11 ? "text-[crimson]" : "text-[#555]"}`
                        }
                    >
                        การตั้งค่า
                    </h5>
                </Link>
            </div>
        </div>
    );
};

export default DashboardSideBar;
