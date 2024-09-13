import React, { useEffect, useState } from "react"; // นำเข้า React และ hooks useEffect และ useState
import { useDispatch, useSelector } from "react-redux"; // นำเข้า hooks สำหรับการใช้ Redux
import { DataGrid } from "@material-ui/data-grid"; // นำเข้า DataGrid เพื่อแสดงข้อมูลในรูปแบบตาราง
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // นำเข้าไอคอนสำหรับปุ่มลบและดูตัวอย่าง
import { Button } from "@material-ui/core"; // นำเข้าปุ่มจาก Material-UI
import styles from "../../styles/styles"; // นำเข้าการกำหนดสไตล์
import { RxCross1 } from "react-icons/rx"; // นำเข้าไอคอนสำหรับปุ่มปิดหน้าต่าง
import axios from "axios"; // นำเข้า axios สำหรับเรียกใช้งาน API
import { server } from "../../server"; // นำเข้าตัวแปรเซิร์ฟเวอร์
import { toast } from "react-toastify"; // นำเข้า toast สำหรับแสดงข้อความแจ้งเตือน
import { getAllSellers } from "../../redux/actions/sellers"; // นำเข้า action สำหรับดึงข้อมูลผู้ขายทั้งหมด
import { Link } from "react-router-dom"; // นำเข้า Link สำหรับการเชื่อมโยงหน้า

// ฟังก์ชัน AllSellers สำหรับแสดงข้อมูลผู้ขายทั้งหมด
const AllSellers = () => {
  const dispatch = useDispatch(); // ใช้ hook สำหรับการ dispatch action
  const { sellers } = useSelector((state) => state.seller); // ดึงข้อมูลผู้ขายจาก Redux store
  const [open, setOpen] = useState(false); // สถานะสำหรับควบคุมการแสดง/ซ่อนหน้าต่างยืนยันการลบ
  const [userId, setUserId] = useState(""); // สถานะสำหรับเก็บ ID ของผู้ขายที่จะลบ

  // ใช้ useEffect เพื่อดึงข้อมูลผู้ขายเมื่อคอมโพเนนต์นี้ถูกแสดง
  useEffect(() => {
    dispatch(getAllSellers()); // เรียก action เพื่อดึงข้อมูลผู้ขายทั้งหมด
  }, [dispatch]);

  // ฟังก์ชัน handleDelete สำหรับลบผู้ขาย
  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true }) // ส่งคำขอลบผู้ขายไปยัง API
      .then((res) => {
        toast.success(res.data.message); // แสดงข้อความแจ้งเตือนเมื่อการลบสำเร็จ
      });

    dispatch(getAllSellers()); // ดึงข้อมูลผู้ขายทั้งหมดอีกครั้งหลังจากลบเสร็จ
  };

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    { field: "id", headerName: "รหัสผู้ขาย", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "ชื่อ",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "อีเมล",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "ที่อยู่ผู้ขาย",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "วันที่เข้าร่วม",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "ดูร้านค้า",
      type: "number",
      sortable: false,
      // แสดงปุ่มสำหรับดูร้านค้าของผู้ขาย
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "ลบผู้ขาย",
      type: "number",
      sortable: false,
      // แสดงปุ่มสำหรับลบผู้ขาย
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  // สร้างข้อมูลแถวจากรายการผู้ขาย
  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10), // เก็บเฉพาะวันที่จาก createdAt
        address: item.address,
      });
    });

  // คืนค่า JSX สำหรับแสดงข้อมูลผู้ขายและหน้าต่างยืนยันการลบ
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">ผู้ใช้ทั้งหมด</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row} // ข้อมูลแถว
            columns={columns} // คอลัมน์
            pageSize={10} // จำนวนแถวต่อหน้า
            disableSelectionOnClick // ปิดการเลือกเมื่อคลิก
            autoHeight // ปรับความสูงอัตโนมัติ
          />
        </div>
        {open && ( // แสดงหน้าต่างยืนยันการลบเมื่อสถานะ open เป็นจริง
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} /> // ปุ่มปิดหน้าต่าง
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                คุณแน่ใจหรือว่าต้องการลบผู้ใช้นี้?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  ยกเลิก
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  ยืนยัน
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers; // ส่งออกคอมโพเนนต์ AllSellers
