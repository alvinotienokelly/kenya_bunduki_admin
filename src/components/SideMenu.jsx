import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaRegFileAlt,
  FaRegHandshake,
  FaClipboardList,
  FaDatabase,
  FaTasks,
  FaFlag,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/noble_capital_logo.svg";
import Cookies from "js-cookie";

const SideMenu = () => {
  const location = useLocation();

  const getLinkClasses = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path))
      ? "flex items-center text-white bg-primary px-2 py-1.5 rounded text-[14px]"
      : "flex items-center text-white hover:bg-primary hover:text-white px-2 py-1.5 rounded dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700";
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    window.location.assign("/accounts/login");
  };

  return (
    <div className="hidden md:flex flex-col bg-black text-primary dark:bg-gray-900 dark:text-gray-300 w-64 h-screen justify-between p-4">
      <div className="flex flex-col">
        {/* <img src={logo} className="h-[80px] mb-6" alt="Noble Capital Logo" /> */}
        <div className="space-y-4 font-medium w-full">
          <Link
            to="/dashboard/admin"
            className={getLinkClasses(["/dashboard/admin", "/dashboard/admin"])}
          >
            <svg
              width="24"
              height="24"
              style={{ marginRight: "8px" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H6.8C7.9201 3 8.48016 3 8.90798 3.21799C9.28431 3.40973 9.59027 3.71569 9.78201 4.09202C10 4.51984 10 5.0799 10 6.2V6.8C10 7.9201 10 8.48016 9.78201 8.90798C9.59027 9.28431 9.28431 9.59027 8.90798 9.78201C8.48016 10 7.9201 10 6.8 10H6.2C5.0799 10 4.51984 10 4.09202 9.78201C3.71569 9.59027 3.40973 9.28431 3.21799 8.90798C3 8.48016 3 7.9201 3 6.8V6.2Z"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 17.2C3 16.0799 3 15.5198 3.21799 15.092C3.40973 14.7157 3.71569 14.4097 4.09202 14.218C4.51984 14 5.0799 14 6.2 14H6.8C7.9201 14 8.48016 14 8.90798 14.218C9.28431 14.4097 9.59027 14.7157 9.78201 15.092C10 15.5198 10 16.0799 10 17.2V17.8C10 18.9201 10 19.4802 9.78201 19.908C9.59027 20.2843 9.28431 20.5903 8.90798 20.782C8.48016 21 7.9201 21 6.8 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V17.2Z"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6.2C14 5.0799 14 4.51984 14.218 4.09202C14.4097 3.71569 14.7157 3.40973 15.092 3.21799C15.5198 3 16.0799 3 17.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V6.8C21 7.9201 21 8.48016 20.782 8.90798C20.5903 9.28431 20.2843 9.59027 19.908 9.78201C19.4802 10 18.9201 10 17.8 10H17.2C16.0799 10 15.5198 10 15.092 9.78201C14.7157 9.59027 14.4097 9.28431 14.218 8.90798C14 8.48016 14 7.9201 14 6.8V6.2Z"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 17.2C14 16.0799 14 15.5198 14.218 15.092C14.4097 14.7157 14.7157 14.4097 15.092 14.218C15.5198 14 16.0799 14 17.2 14H17.8C18.9201 14 19.4802 14 19.908 14.218C20.2843 14.4097 20.5903 14.7157 20.782 15.092C21 15.5198 21 16.0799 21 17.2V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H17.2C16.0799 21 15.5198 21 15.092 20.782C14.7157 20.5903 14.4097 20.2843 14.218 19.908C14 19.4802 14 18.9201 14 17.8V17.2Z"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            to="/dashboard/bookings-management"
            className={getLinkClasses(["/dashboard/bookings-management"])}
          >
            <svg
              width="24"
              style={{ marginRight: "8px" }}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2.05752V3.2C14 4.88016 14 5.72024 14.327 6.36197C14.6146 6.92646 15.0735 7.3854 15.638 7.67302C16.2798 8 17.1198 8 18.8 8H19.9425M14 2.05752C13.6065 2 13.136 2 12.349 2H10.4C8.15979 2 7.03968 2 6.18404 2.43597C5.43139 2.81947 4.81947 3.43139 4.43597 4.18404C4 5.03968 4 6.15979 4 8.4V15.6C4 17.8402 4 18.9603 4.43597 19.816C4.81947 20.5686 5.43139 21.1805 6.18404 21.564C7.03968 22 8.15979 22 10.4 22H13.6C15.8402 22 16.9603 22 17.816 21.564C18.5686 21.1805 19.1805 20.5686 19.564 19.816C20 18.9603 20 17.8402 20 15.6V9.65097C20 8.864 20 8.39354 19.9425 8M14 2.05752C14.0957 2.07151 14.1869 2.0889 14.2769 2.11052C14.6851 2.20851 15.0753 2.37012 15.4331 2.58944C15.8368 2.83681 16.1827 3.18271 16.8745 3.87451L18.1255 5.12548C18.8173 5.81724 19.1632 6.1632 19.4106 6.56686C19.6299 6.92475 19.7915 7.31493 19.8895 7.72307C19.9111 7.81313 19.9285 7.90429 19.9425 8M9 14.6662L11.3412 17.0049C12.4672 15.0359 14.0256 13.3483 15.8987 12.0692"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Bookings Management
          </Link>
          {/* <Link to="/dashboard/transactions" className={getLinkClasses(['/dashboard/transactions'])}>
            <FaFileInvoice size={24} className="mr-2" /> Transactions
          </Link> */}

          <Link
            to="/dashboard/gun-types-management"
            className={getLinkClasses(["/dashboard/gun-types-management"])}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ marginRight: "8px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H10M4 18H10M4 6H20M21 18.5L19.6214 17.1214M19.6214 17.1214C20.1657 16.5771 20.5 15.8271 20.5 15C20.5 13.3414 19.1586 12 17.5 12C15.8414 12 14.5 13.3414 14.5 15C14.5 16.6586 15.8414 18 17.5 18C18.3272 18 19.0771 17.6657 19.6214 17.1214Z"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Gun Types Management
          </Link>
          <Link
            to="/dashboard/shooting-line-management"
            className={getLinkClasses(["/dashboard/shooting-line-management"])}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ marginRight: "8px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Shooting Line Management
          </Link>
          <Link
            to="/dashboard/payments-transactions"
            className={getLinkClasses(["/dashboard/payments-transactions"])}
          >
            <svg
              width="24"
              style={{ marginRight: "8px" }}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0004 10.303V11.1322M12.0004 11.1322H11.2326C10.3846 11.1322 9.69713 11.8746 9.69713 12.7905C9.69713 13.7064 10.3846 14.4488 11.2326 14.4488L12.7681 14.4488C13.6162 14.4488 14.3036 15.1913 14.3036 16.1072C14.3036 17.0231 13.6162 17.7655 12.7681 17.7655H12.0004M12.0004 11.1322H12.8165C13.3443 11.1322 13.8098 11.4197 14.0862 11.8577M12.0004 17.7655V18.5947M12.0004 17.7655H11.1843C10.6565 17.7655 10.1909 17.478 9.91453 17.04M14.8871 6.98758C14.3011 6.79509 13.6824 6.69011 13.0368 6.69011H10.9639C10.642 6.69011 10.3267 6.71622 10.0189 6.76626M14.8871 6.98758C21.0721 9.01901 23.622 20.7963 15.8092 21.7648C13.2797 22.0784 10.7211 22.0784 8.19153 21.7648C0.00759697 20.7503 3.19433 7.87572 10.0189 6.76626M14.8871 6.98758L16.6644 2.54428L16.0145 2.28428C14.7993 1.79821 13.4227 1.94155 12.3337 2.66753C11.4567 3.25225 10.3832 3.4646 9.34961 3.25787L8.37278 3.06251L10.0189 6.76626"
                stroke="white"
                stroke-opacity="0.84"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Payments & Transactions
          </Link>

          {/* <Link
            to="/dashboard/target-companies"
            className={getLinkClasses(['/dashboard/target-companies'])}
          >
            <FaClipboardList size={24} className="mr-2" /> Target Companies
          </Link>
          <Link to="/dashboard/audit-logs" className={getLinkClasses(['/dashboard/audit-logs'])}>
            <FaDatabase size={24} className="mr-2" /> Audit Logs
          </Link> */}
        </div>
      </div>
      <div className="flex flex-col w-full border-t border-primary dark:border-gray-700 font-medium">
        <Link
          to="/dashboard/settings"
          className={getLinkClasses(["/dashboard/settings"])}
        >
          <IoSettingsOutline size={24} className="mr-2" /> Settings
        </Link>
        <button
          onClick={logout}
          className="flex items-center text-[15.5px] hover:bg-primary hover:text-white p-2 rounded mt-2 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FiLogOut size={24} className="mr-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
