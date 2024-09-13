import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {

    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            {" "}
            <>
                {data && data?.status === "อยู่ระหว่างดำเนินการ" ? (
                    <h1 className="text-[20px]">คำสั่งซื้อของคุณกำลังอยู่ในระหว่างการดำเนินการที่ร้านค้า</h1>
                ) : data?.status === "Transferred to delivery partner" ? (
                    <h1 className="text-[20px]">
                        คำสั่งซื้อของคุณกำลังส่งไปยังพาร์ทเนอร์จัดส่ง
                    </h1>
                ) : data?.status === "Shipping" ? (
                    <h1 className="text-[20px]">
                        คำสั่งซื้อของคุณกำลังเดินทางกับพาร์ทเนอร์จัดส่งของเรา
                    </h1>
                ) : data?.status === "Received" ? (
                    <h1 className="text-[20px]">
                        คำสั่งซื้อของคุณอยู่ในเมืองของคุณแล้ว คนจัดส่งของเราจะนำส่งให้
                    </h1>
                ) : data?.status === "On the way" ? (
                    <h1 className="text-[20px]">
                        คนจัดส่งของเรากำลังจะนำส่งคำสั่งซื้อของคุณ
                    </h1>
                ) : data?.status === "จัดส่งแล้ว" ? (
                    <h1 className="text-[20px]">คำสั่งซื้อของคุณได้รับการจัดส่งแล้ว!</h1>
                ) : data?.status === "อยู่ระหว่างดำเนินการคืนเงิน" ? (
                    <h1 className="text-[20px]">การคืนเงินของคุณกำลังดำเนินการ!</h1>
                ) : data?.status === "Refund Success" ? (
                    <h1 className="text-[20px]">การคืนเงินของคุณสำเร็จแล้ว!</h1>
                ) : null}
            </>

        </div>
    )
}

export default TrackOrder;
