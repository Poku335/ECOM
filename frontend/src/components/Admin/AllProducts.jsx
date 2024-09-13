import { Button } from "@material-ui/core"; // นำเข้า Button จาก Material-UI
import { DataGrid } from "@material-ui/data-grid"; // นำเข้า DataGrid สำหรับแสดงข้อมูลเป็นตาราง
import React, { useEffect } from "react"; // นำเข้า React และ useEffect
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // นำเข้าไอคอน AiOutlineDelete และ AiOutlineEye
import { Link } from "react-router-dom"; // นำเข้า Link สำหรับการเชื่อมโยงไปยังหน้าอื่น
import axios from "axios"; // นำเข้า axios สำหรับการเรียกใช้งาน API
import { useState } from "react"; // นำเข้า useState สำหรับการจัดการสถานะ
import { server } from "../../server"; // นำเข้า server URL จากตัวแปรที่ถูกกำหนดไว้ใน server

// สร้างฟังก์ชัน AllProducts สำหรับแสดงสินค้าทั้งหมด
const AllProducts = () => {
  // สร้างสถานะ data เพื่อนำข้อมูลผลิตภัณฑ์มาเก็บไว้ใน state
  const [data, setData] = useState([]);

  // useEffect จะทำการเรียกข้อมูลเมื่อคอมโพเนนต์ถูกสร้างขึ้น
  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true }) // เรียกข้อมูลสินค้าทั้งหมดจาก API
      .then((res) => {
        setData(res.data.products); // เก็บข้อมูลสินค้าที่ได้มาใน state
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
      headerName: "สต็อก",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "ขายออก",
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
      // แสดงปุ่มดูตัวอย่าง
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  // สร้างอาร์เรย์ row สำหรับเก็บข้อมูลของสินค้าที่จะนำมาแสดงใน DataGrid
  const row = [];

  // ถ้ามีข้อมูลสินค้า จะเพิ่มข้อมูลลงใน row
  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "THB " + item.discountPrice, // แปลงราคาเป็น THB
        Stock: item.stock,
        sold: item?.sold_out, // ถ้ามีข้อมูล sold_out ให้แสดง
      });
    });

  // คืนค่า JSX เพื่อแสดงผล
  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row} // ข้อมูลแถว
          columns={columns} // คอลัมน์
          pageSize={10} // จำนวนแถวต่อหน้า
          disableSelectionOnClick // ปิดการเลือกแถวเมื่อคลิก
          autoHeight // ปรับความสูงอัตโนมัติ
        />
      </div>
    </>
  );
};

export default AllProducts; // ส่งออกคอมโพเนนต์ AllProducts
