import { Button } from "@material-ui/core"; // นำเข้า Button จาก Material-UI
import { DataGrid } from "@material-ui/data-grid"; // นำเข้า DataGrid สำหรับแสดงข้อมูลในรูปแบบตาราง
import axios from "axios"; // นำเข้า axios สำหรับเรียกใช้งาน API
import React, { useEffect, useState } from "react"; // นำเข้า React, useEffect, และ useState
import { AiOutlineEye } from "react-icons/ai"; // นำเข้าไอคอน AiOutlineEye
import { Link } from "react-router-dom"; // นำเข้า Link สำหรับการเชื่อมโยงหน้าใน React Router
import { server } from "../../server"; // นำเข้า URL ของเซิร์ฟเวอร์จากตัวแปรที่กำหนดไว้ใน server

// สร้างฟังก์ชัน AllEvents เพื่อแสดงรายการอีเวนต์ทั้งหมด
const AllEvents = () => {
  // สร้างสถานะ events สำหรับเก็บข้อมูลอีเวนต์
  const [events, setEvents] = useState([]);

  // ใช้ useEffect เพื่อดึงข้อมูลอีเวนต์เมื่อคอมโพเนนต์นี้ถูกสร้างขึ้น
  useEffect(() => {
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true }) // เรียก API เพื่อนำข้อมูลอีเวนต์ทั้งหมดมา
      .then((res) => {
        setEvents(res.data.events); // เก็บข้อมูลอีเวนต์ลงใน state
      });
  }, []);

  // กำหนดคอลัมน์ต่างๆ ของตาราง
  const columns = [
    { field: "id", headerName: "รหัสสินค้า", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "ชื่อสินค้า",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "ราคา",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "จำนวนคงเหลือ",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "ขายออกแล้ว",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      // สร้างปุ่มสำหรับดูรายละเอียดสินค้า
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  // สร้างอาร์เรย์ row สำหรับเก็บข้อมูลอีเวนต์ที่จะนำมาแสดงใน DataGrid
  const row = [];

  // ถ้ามีข้อมูลอีเวนต์ จะเพิ่มข้อมูลลงใน row
  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "THB " + item.discountPrice, // แปลงราคาเป็น THB
        Stock: item.stock, // จำนวนสินค้าคงเหลือ
        sold: item.sold_out, // จำนวนสินค้าที่ขายออกแล้ว
      });
    });

  // คืนค่า JSX เพื่อแสดงผล
  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row} // ข้อมูลแถว
        columns={columns} // คอลัมน์
        pageSize={10} // จำนวนแถวต่อหน้า
        disableSelectionOnClick // ปิดการเลือกแถวเมื่อคลิก
        autoHeight // ปรับความสูงอัตโนมัติ
      />
    </div>
  );
};

export default AllEvents; // ส่งออกคอมโพเนนต์ AllEvents
