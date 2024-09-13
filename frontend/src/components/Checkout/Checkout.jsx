import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [userInfo, setUserInfo] = useState(false);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const paymentSubmit = () => {
        if (address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
            toast.error("กรุณากรอกที่อยู่สำหรับการจัดส่ง!")
        } else {
            const shippingAddress = {
                address1,
                address2,
                zipCode,
                country,
                city,
            };

            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user,
            }

            // อัพเดตข้อมูลใน local storage ด้วยคำสั่งนี้
            localStorage.setItem("latestOrder", JSON.stringify(orderData));
            navigate("/payment");
        }
    };

    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    );

    // นี่คือตัวแปรค่าขนส่ง
    const shipping = subTotalPrice * 0.1; // 10%

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = couponCode;

        await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {

            const shopId = res.data.couponCode?.shopId;

            const couponCodeValue = res.data.couponCode?.value;

            if (res.data.couponCode !== null) {
                const isCouponValid =
                    cart && cart.filter((item) => item.shopId === shopId);

                if (isCouponValid.length === 0) {
                    toast.error("รหัสคูปองไม่สามารถใช้ได้กับร้านค้านี้");
                    setCouponCode("");
                } else {

                    const eligiblePrice = isCouponValid.reduce(
                        (acc, item) => acc + item.qty * item.discountPrice,
                        0
                    );
                    const discountPrice = (eligiblePrice * couponCodeValue) / 100;
                    setDiscountPrice(discountPrice);
                    setCouponCodeData(res.data.couponCode);
                    setCouponCode("");
                }
            }
            if (res.data.couponCode === null) {
                toast.error("รหัสคูปองไม่ถูกต้อง!");
                setCouponCode("");
            }
        });
    };

    const discountPercentenge = couponCodeData ? discountPrice : "";

    const totalPrice = couponCodeData
        ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
        : (subTotalPrice + shipping).toFixed(2);

    console.log(discountPercentenge);

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo
                        user={user}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        address1={address1}
                        setAddress1={setAddress1}
                        address2={address2}
                        setAddress2={setAddress2}
                        zipCode={zipCode}
                        setZipCode={setZipCode}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        handleSubmit={handleSubmit}
                        totalPrice={totalPrice}
                        shipping={shipping}
                        subTotalPrice={subTotalPrice}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        discountPercentenge={discountPercentenge}
                    />
                </div>
            </div>
            <div
                className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className="text-white">ไปที่หน้าชำระเงิน</h5>
            </div>
        </div>
    );
};

const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    userInfo,
    setUserInfo,
    address1,
    setAddress1,
    address2,
    setAddress2,
    zipCode,
    setZipCode,
}) => {
    return (
        <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500]">ที่อยู่จัดส่ง</h5>
            <br />
            <form>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">ชื่อเต็ม</label>
                        <input
                            type="text"
                            value={user && user.name}
                            required
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">อีเมล</label>
                        <input
                            type="email"
                            value={user && user.email}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">หมายเลขโทรศัพท์</label>
                        <input
                            type="number"
                            required
                            value={user && user.phoneNumber}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">รหัสไปรษณีย์</label>
                        <input
                            type="number"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                            className={`${styles.input}`}
                        />
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">ประเทศ</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                เลือกประเทศของคุณ
                            </option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">เมือง</label>
                        <select
                            className="w-[95%] border h-[40px] rounded-[5px]"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                เลือกเมืองของคุณ
                            </option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">ที่อยู่1</label>
                        <input
                            type="address"
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">ที่อยู่2</label>
                        <input
                            type="address"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    couponCode,
    setCouponCode,
    discountPercentenge,
}) => {
    return (
        <div className="w-full bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500]">ตะกร้าสินค้า</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="w-full flex">
                    <div className="w-[70%]">
                        <label className="block pb-2">รหัสคูปอง</label>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[30%]">
                        <button
                            type="submit"
                            className={`${styles.button} h-[40px] mt-8 w-full`}
                        >
                            <h5 className="text-white">ใช้คูปอง</h5>
                        </button>
                    </div>
                </div>
            </form>
            <div className="w-full flex justify-between mt-6">
                <h5 className="text-[15px] font-[400]">ยอดรวม</h5>
                <h5 className="text-[15px] font-[400]">{subTotalPrice.toFixed(2)} THB</h5>
            </div>
            <div className="w-full flex justify-between mt-6">
                <h5 className="text-[15px] font-[400]">ค่าขนส่ง</h5>
                <h5 className="text-[15px] font-[400]">{shipping.toFixed(2)} THB</h5>
            </div>
            <div className="w-full flex justify-between mt-6">
                <h5 className="text-[15px] font-[400]">ส่วนลด</h5>
                <h5 className="text-[15px] font-[400]">- {discountPercentenge ? discountPercentenge.toFixed(2) : "0.00"} THB</h5>
            </div>
            <div className="w-full flex justify-between mt-6">
                <h5 className="text-[15px] font-[400]">ยอดรวมสุทธิ</h5>
                <h5 className="text-[15px] font-[400]">{totalPrice} THB</h5>
            </div>
        </div>
    );
};

export default Checkout;
