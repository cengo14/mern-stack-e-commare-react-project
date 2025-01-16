import { AiOutlineProduct } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const menuItems = [
  {
    name: "Profil",
    url: "/profile",
    icon: <CiUser />,
  },
  {
    name: "Panel",
    url: "/admin",
    icon: <MdOutlineAdminPanelSettings />,
    role: "admin",
  },
  {
    name: "Ürünler",
    url: "/products",
    icon: <AiOutlineProduct />,
  },
  {
    name: "Sepet",
    url: "/cart",
    icon: <IoCartOutline />,
  },
  {
    name: "Çıkış",
    url: "#",
    icon: <IoIosLogOut />,
  },
];

export const categoryList = [
  "Elektronik",
  "Giyim",
  "Ev Aletleri",
  "Spor",
  "Kozmetik",
];

export const ratingList = ["1", "2", "3", "4", "5"];
