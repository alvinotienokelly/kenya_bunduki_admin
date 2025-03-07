import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import { getAcceptedDealsForInvestor } from "../../services/api_service";
import Modal from "../../elements/Modal";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const navigate = useNavigate();

  const getDeals = async () => {
    try {
      const response = await getAcceptedDealsForInvestor();
      if (response.status) {
        setDeals(response.deals);
      } else {
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch deals", error);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  const handleWithdrawClick = (deal) => {
    setSelectedDeal(deal);
    setModalContent("confirm");
    setShowModal(true);
  };

  const handleConfirmWithdraw = () => {
    setModalContent("loading");
    setTimeout(() => {
      setDeals((prevDeals) =>
        prevDeals.filter((d) => d.id !== selectedDeal.id)
      );
      setModalContent("success");
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
    setSelectedDeal(null);
  };

  const renderShimmer = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <tr
        key={index}
        className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </td>
      </tr>
    ));

  return (
    <Layout
      title="My Deals"
      rightContent={
        <div className="flex items-center px-2 border -mt-6 rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="outline-none py-1 px-3 text-[14px] text-gray-400"
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {loading ? (
          renderShimmer()
        ) : deals.length === 0 ? ( // Check if deals are empty
          <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FaExclamationTriangle size={48} className="text-yellow-500 mb-4" />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              No Deals Available
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You currently don't have any deals.
            </p>
          </div>
        ) : (
          deals.map((deal) => (
            <div
              key={deal.id}
              className="border w-full pr-4 justify-between border-gray-200 dark:border-gray-600 flex items-center rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-[30%] h-auto object-cover rounded-l-lg"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALYAwgMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABGEAABAwIEAwUECAMFBwUBAAABAgMRAAQFEiExBkFREyJhcYEUMpGhByNCUrHB0fAVYuEzcpKy8RYkNENTgqJEVGODwib/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMThd4q1ddIkQjOTMgJBygj0qy4rwgYlbtYkwYVH1wy69JqvIFshROZ11YSVFKt8v9DWk4ZuWlMuWrozZ0wQrxifhNBzm9aSi1W6lvIlJCSeajrp+dVPTf1rW8Z2iMPcbtQfqwSuealK3PwgVkzEd0kjxoCoUKFA628pIyKyqQPsrEj06ekUvKw77iuyUdkrMpPkeXr8aj0KBa0KbOVacqhymkU809lSEOpDjX3VHby6Ub7GVIcaVnZWYCo1B6EcjQMUKOhQFR0KFAKFChQCjAoVd8KYEvG8SQ3B7MHvnkKClyqjSi1G9dkvcL4fXbqw5pkB5KYzjrXI8Qt/Zrx5n7iooI9ChQoCoUdFQChQoUHRb23tXNnIuETCFjQk8vOozTdxY3wdCy6F/aHegH8eXnpV+nDrG7zPhZagggLSF5/8MefKs7fKNgUtFaVbHOkCFDkIjNqPGqLziPDE41g6LptIL7PcUBrpIM67nTyrnd1h7pd7JpvkVqg5iB1J2GxrqGFY+w0hpLqg2wqcwP2yogD0mdPAUzjuEJubG9ewxtQW6gBaUDQHkE+vpUHJKHOrJWG3Ld4LZDRW4kALy7GSBp4SYnyorjCLmzWyq4aPZuLy/Pb9KCvn+WaMdn9oKB6gitVf8HXFqyHe2RkVcdkJB7oyzn8tRVacAuV27rrTLgS2ROdOwJOp8u78aCqDIc/s1JUfunuk/lS2XV2rhDjeZJ0cbVoCOngeh5b0pm0dN03b9me0WSEJPMgkR8RFaPA+F73F21NKbOZLaVtrUQAETBOfkBvrppyJFBmru3QzkdZJXbuaoJHxSfEc/So9dBwjAeHheHCF3zmK3J+sWhlfYMIKehhSlHcfYq7VwLYLV9XaYUB07K6V8/aB+FBySKFdSvOBUNtq7PB7O5TH/pHnmXAf/scWPlWTucDwwPpty9f4bc7KauUBwfGEKPok0Ga+zSa0bnClwi17UYlhimgrUl1Scp6KzJhM+NQk8PXyzlZVYPH/AOO/YUT5DPPyoK1hsvOobT7yjA867Jw/hzPD+AIzR7Q+nXrWW4H4Rv04j7XiFhcJaZEj6skK9RIrW3Nwq7uFdoktJbMBKhBqiCi3dVcdo0idzPOuacR5jij2cEKnUGuyWVypCu42nKkVzPjVCHb1bwABBOgoMrQoUKgFFR0VAKFChQduwfCXF2SUpJbCkzmPvddh+vL4UWO4alt5NvcXSVJM5TlAAV4GBVhdYxmLdjh4zsoahWRZSpwAECSNgY0gbAVV8QWF24lpL+fLEDMudeg0B5b/AKVRQP5W0o9nuHG3WFAqLqIUJO48PHfwrR4CjFi2Gi6HQsBYUFElQ2kfejQ+sUrhbCjiIZZvlAraEpStIKk9CNNvxG9aS0tTZOO2ylhtbSiuzcglKTEqSFcwQBvuBsDrQFYYC0q9Q492YfYgKUo95J5TyKTME+PUUfEQw1FjcFttLkt5oInvDVCh0KVBQjoddqhYzxAhz2e8tyUPgFIbVuuBJbPiJmP5ZGhrLvvm5xW6cDsNOuhBzKEypE69OcyNd6gt3sURjaTYStpq6YK0DLlykEx5H7PlFKdxZh7CnLZ1oILcM3KAD3kpVPd2J7kc9hVRh47F5523VEujJnWR3CQY566bHXY8qqXXbht26UpJFwpzPBIAKpmSD9k98T5awqKC3trNh62XeXikKXaNfVkKUFOEo0XO4AVJ9SDrrUXiLFncF4Vw/B7ZZbuMRZTd3SuaW1f2TY8MvePio+FRwkXq3LFlbdu8kLLfaOpaQlMEkLCjCI8OpAovpWtnrfiO0W4gFpywt+xWlYWhaQnLKSNCJHKgY4Bu7a3xHs3HmmnXISM+gV4Tt6H0rtdk3nSM4hXMV5o1Agjaui/R/wAePYUtuwxlansPnKl5UqXb9PEo8Nxy6EOwN2wG1NYpw9h2N2irXE7VD6I0n3h4pO4PlVoyEuoQ42tK0LSFJUkghQOoII3p9CYMUHCOLuEMV4LcTfWTi7vCpyhxSjnZGmio2HiNDzGwrPfw61xlsPWGVp8kJU0YSFKOySNAlR5RCVfynun065bt3LC2X20ONKSQpCxIUDuCOkem9efvpF4Re4JxhN1h6SvCbuQgLkhGneaXzI5gmDHimg0GF4VY2WHsgWqQ+EwpxSAlYMExOh2qShjEwy46jEL9psaZV3BdT5BDmZPyprg/F/4vhBw0tm6dlKw465CiyJgkx7wWEtqVGygrWp2JMcR2dmH7hFne2CFJC7a3b7JbWn/LI96Nu9PmDtRkb/iS9w/2kNdi8yFdipwsBCc/Tu6ExvAFV13ifCF2tSX2Mek7rbeZ0PgCmuu8AYfhWIcKv2awi8t3bh1xYUmAoLJIMbjmk8wpCq5r9I30a3HDhXiGFBb+GFUqESpg+P8AL41BQpwDDcT14exftX/s2l832LivBKgSgnwkGs662tl1bTqChxCilSTyIpuS2oEb0/m7cxML5+NAzRUtxotEhQgikb0AoUKFBscMxw21ylboClCChUT2ZjUgbcz+zVi3cXVzbuOe0qeW64HEuFRkgaQRvudtvhFZW1ZReLDYKkPRAPJR6eB/GtFwvnsbtbeINr7GJnLOSNJHMfuao1dliNuwo+0AsrUDvrBjUHXeZIPOJ1qrxzG1v5fZn8q0nvJKgc41kchGpIPIgjmDVRxVcELS32qUlI7jkkpWk8ldOWvI+GtUypu2UyChxDQJQlPeIESI8tR5R41BJdv7jELohYCsn1rhM6ZRqT1MZp8/KJKnG2HFlp0lt1wr7x5ZVwD4gHb9KjSq3aRcNFpOdaiqNgoQOkgkcv1gGy8pWRXbhJM9wpKiRE/LkRrQSWzkcKW1OK7Ps1BRVpM7g+IjeetUuN3p9qU0w4o6ySFbTy8Kcu7tCEZxBQnugA6nSANtuVVrDOcKcXOY6mSBQScBX2V37RKMoSpDiXDotKgUqB1B2J2qy4hdfd4N4cS46y+zbu3jDS0znSApBKCf+6R4KqvS4QkFKEx1WkAT4aipzLoxHh7FcNQczlstGItCI0A7N0D0KFeTZoM3Gu8+NPMkJggDTeedMBXWpDJQox9qg6t9EfF/Yvt8O4m4exdJ9hcUqShR17Oeh5dDpzrsAnnvzryh32lpW2ooUkghYMEHkR6/CvRnAfEn+0nDrN47HtjX1VyAIHaDn6iD60GnQdag8UYFbcSYDdYXdwlLyYQ5/wBNf2VDyPy86mpOtPIOh3nx2oPMPDNw/gePP2t4S09aqcDgPLKCHU+qM0eKUmujYDxc3heIjC8bQ4ChwILjgBSogwT+FZz6UrFFl9KDTqU5UXrCHlDlOVSFf5K19/wva4qzarvHT2jrAUQlRlKsiJjT73LUazppQXfZs8KcVtPMFCMJxpWUgK0YuDEEfyq0HnHVVbApQ6hbbqUKSuUlChoRzBHyiuH8S4LxWbu1Untb+wYaSiLcfWBATBSpG+aCo6TJmNa6TwRxE5i+HqaxAZMRtVdncBSCgq17i8p1Ep+YUKDlf0scAHAHVYthDR/hbqocaiTbqP8A+T8tudczUCD3dwa9iXdsxf2rtndthdu+gocRyKTXl3jjhpzhbiC4w50LW1oth0/bbOxPjyPlQRsOQMWtFWZT/vjQK7eN3I1KfPpVREEg70uzuHbW5auGFZHGlBSVeI5/hWu4itMHxHhz+PWCwxiBeAurTONc32kjz3oMdQoiESZB9DpQoNY2hl23QXvq3JTK0jQmBqfHTfwII1mra6xYeypZu0p9pSnuPpn0159J3iAfClQtCmHWzoAQT4DkfQj8KiPBZXD7SlNIXBOmh8R+Xw2qoecC33C845mbRpmImOcKHXn0O2+lB8C3uEvsPiOyCCgokhO0Tud+U+fMuPXCHxkafSyRoVAmIG2vTY+dRi6lCFtyYJnISdVdaigUgOOZVdolspiDGcTMGddPGlZyGQicoQZhRCgOvl+FNOOKWoKMdoRos+9NQrl7NDLR8zEQKASLm6K1D6vcDrQuFmco3pHaAQ233QOdTWLe2cBLjyieY0iOu1BXrafUmUgHqOdO4PeO4TijN4hsFbSpLatnEkEKQfApJB860dn7A1uPI9RTtxYYXfAQ/kX97aDQUHEeGM2F8hdie0w68QH7RzmUExlP8ySCk+KTVeGVBhLuZJSpWUgLEpI6jcee1a+0trdqzVhGLvoOHOOdpbXqAVexvbZlAa5FCAryBERVRiWD3GFXCbfEGQhSk5mlA5kPJ5KQoaKFBXNP5khK63H0V4wML4hNqVQxiCOyV4LElJ/Ef9wrBvoCV6bVIsrly2uGrhr32VpWn+8DI/CqPU7NwlUVKQocqx+H4mlxDa0KhKkgjyq6YvkZCpawlI1USqNB+/3NQYT6UMPRiHHWBhS8iRZr7Zf3EZlSr0TnPpSG+L2nMQUwEpyrJ7QwcrXLaZO3yp/i25bxC/fdCSFusBhIIMpYkqKlaaFZOgMwn+/pn1WDLLRyQAE6nMCQodSCfHyoNT/GUJQQq4QhqBuomfyn+lJ/2rtQ+A3iTuZJ3KCU/Mfv4VzTHcRSoENOd8gzr7x0n/T9aqLXF3MNcQVgOlWqkk+74DxoPQmFcZ4e6oNXtw2yvZLpJyq+O3KqT6bMBRinC6cVZTNxh/eKpmWle8PwPpWcwxy1v7S1fghLpKQCNutbXgK8b4i4UvbR1tXsodctWiozmbKRH4mg81KEEjxrY8PtM4twLjWH9kj2yxUL5lwDvFA0Wn4a1lb+3XZ3j9q6IWw4ppXmkx+VaT6MLlLPFbDLn9ldNuW7g6hST/SgywUiB3j/AIaFJuMzNw60FGELKfgaKguzdITALKg5MjKqNPL18qbS48FoTnWUlIzKb3PQETGnWmwtaWwjOspBkBWsUypaTM77+91oH1PrJKcylSSApQAJHOkFwDKDsNBzpiR7p2Tt0ppxwnegeW/lTm+1y/1qOVxqdzvrSAZ1oc6BxJSN96WHQNBtTQFLCZFA52yuSoFKFwoayoxyprJQ7OgkJuFaj3Z3nmPGrTC+IbqxtVWakM3uHFUmyvU5muspOhQfEEetUgRSgI7uaJoNEtnhu/OZl69wh3mh5s3TAPgtMLHwNNfwFlR+o4hwZxB70qcdQqP7qm5FUmZQiFafGns7hISlUKOyv2KDpFljuFYaw02/i6Xi0gJi1t3VlUCNCoIT/wCVWFpxQ5iqQzhFopoDZ15QccnqlIGVJnrm6g1zrC8OL7o7ZQQkbkjbSd9utae1cbRbm0wl8e2ZQnUwQNidYgekfGg1DNolklx8dsqQVLkEkncknUnen7jDbe+YVbOh4pUNkiCOvy8qp2zc2jtogp9qUUjtlHKEpHKTEidNunQVd4dY4i/eLUFf7ovuobQjLA3Vy0G2p6xVGXV9F9itR7K7uzrsSkwPKAfXwqFiX0ZuW1updupalA90TOaN9OWkV1TD7MhJQ42QpBzEmTJ3kkmJ9dPCrm2UGmyq4QIAmCQITp0oOF4biKrBu1tLgFt+3uSFA7AZVa+Vdx4bDC+GsPu8PZSzbrYSsNISE5dNYA8a519IGB4feYjb3tiUj6xKXSk6ExpJ5nwNdXwFlljB7a0QElDbQRljSIjWoPMP0k26bfjnGG0CAbjN/iAV+dQeEVlniG0fCsoZX2il7BIA1PwrSfShw1d4ZxXcIBceQ6kONOrVKijaCTuRsfCKyLSbm3aeaSEjtgEKVzCZmPlQR7t1T1286gKKVuKUO7yJoUsNGB32/wDDRUD64yqjbbamVmDHShII0n1pB1NAQMk00aejemQnWgA2owKWEUAnWgNtrOeWnTensv7NBnSR3vSlLchMa/GgaWpSIjagVuL2TIoBSVESknyVU5lAjRI9JoK/s3Y1TpRpa6gj8KsFJP2QQfE0SErKsi4g9P8ASgioZUO8EpP93f51Z4bh3aqjsnlqicuUa69QaW2WWohCFmNlEyf3p41psOxZOCMhvEnU25iRawl19O2sH3PVQ8jQPYVg6m2XV3zqWLVMKWhDxCh5qGn4cqsGMWw10FuxaYlpcOvlYCQI0IiStQHKOe+9KtLt3Fbcli2faZUZT9txSuRlQyJ8wBH3tNbTD8MZtcMVb3ibZsqBzHUkkD3jMSZ1Jjpod6olWr2GCweetWzcuwMvcUpxzSAIA10gcydJ5UeF37uItlx1ns1IXnLSnD3Ej7xEQNQdvLrR4c9Y4bahtrsstwVr7o97SMyjusz1Os+NSQ/a2Kwm0XLiiE5pKipRgadTtrtoT0oJFriLoVcIcdQkHuthGhHhEbyJiPPwRiF68VKbSsKA1JToZG8kfv8ACmnrxhTgJBULdS+4kbkRr8/gajXWJNpt/wDeUNpSBlS2N5M/pFBT8Q4imysmQ4oJdcuArJpqkDSP3pp6dC4MxD2yybIUVE6gkzPx/KuQ8TYZdYu27dNqU4poylMnQVpPooxZ5R9iuAUlBnvGI8vl8T6waz6UeF/49hzd1arU1fWZKm1hM5gd0Hz/AB9a8+XVkXHVi2xK2Xr/AGSyWlDwhVes1uJWgIcBAJgka1ybijhv2i4uW7ixtHwFEpdb70A6jOP7VH97vJ8BQcc/hGIf+1SfHOn9aFa08Ian/wDmL1Xii+QQfIztQoMNvRikClJ50BqVlHnSW96QRKoqQ2zrukeJoHkBJGqZpzKOQA8kyaW0y3AzLQT1Jiny0hLebMr+WABQV7uhI19aZCFLVpUghK16hRJ2JqytrFfZDOrIJ3J1oIdnaLBBSnN112q1bYBGhkjkBNPsWykKKW0Kyq8cs+Z6VLDCQgFQBTOhB7s9KoqVoWCQQAOginrCydvblDDDa3Frk6EJCQNyTsAOZP4VIUwp64S00jMtaoAH4eH78ak3LyGWVYfYLBbVo+6k/wBuqf8AIOQ9ekENuPW2GyjCz2l0B3r5Q1HXstO6P5vePKNjEt2C0PabpRaakkIgFbpnkD/mPzp1AS0cxAU4nXXUI85qahphhpN/igLynNbe1KiC9GmZZ3S2I5akiBAEgp20xS87H2l9z2HDySEJZSC46RuETqo/zHRPj7pF7i1wtpF5eIKlPJ/3Wy7ym22kyM6+bknQAnXUnuwCqza/iDz2K4uc1pbAApAy51D3W0p2A1AgbSBpMhizWvFcct3rsjNdPgBKRASjQQP5QnQeRoLxi1urtIZurmFtDtXioyVOyCQT91CZTHX4Cd7RbtsJDv1zoe3VpCRvPmdazbOK+0Kxt8ry90q9O1SVekTVacVfedysHKYgfv1+RoNTi/EgYdWW8qlvEq7o0GbT5fOaq7Vq8uc95cFZSk6AbDff4fKoeG4ckOoW+cy0kAgHcD89flWttGZUlCU5gdQEwM0EmD8tfLpQWWCWuZzIv3YlK9801WCyVgXF6OzBS2pUjRUFO8zP5DatbglukpSiI7QA5gN9f6/Kqz6RErt7qzum0xliD0PI/wBOlBrsRxAW1sXWUqcCEBa0ITOnX08K5Z9I11cX1xY4jgyim7yqCHW1f8U3vlHJZSd0HXwO9a23xNbGFe1rSUuNohAAnQjYDcieQ9BMTjfZm7hu6vcAaQ8y4c97gzqzkcMaOMqGqF8wR6HlQY48c42glKlQpOh+sdT8s+lHWiGO4GBDmPYmyse807hyFrQfuqVzI2JoUHNp1paYOgiT03ohlH2SfwpXaECEiOmUVBIYt0I/tVgeHP16VJZtG3hJOQDYTvVck5DrHoalMPqTBBnwG9BI7NSR3EpPWaSs5wGySEncCjU6XO8swBsIpy2twpeY94R96aBy2tFrhTU93moafKrvD0QOzdWJHuwklU+AFRrcCAEqSgR7o1PqatrZOZOZSsqRshPdnx8aobFsCqG85I3DiiCf6Uvspk5pyjpAA8KebMqLQjXll/fx/Sh2cr17qNyY2H7/ABoIjivZbdSgMrrwhM7hHM+u3l51WLc7FJOoMc9xUm9dC3FriIgIH79arnZUSBvvHWiF2z6Mrl3eoK7S3IloGO3WZyonlMEk8kgxqRUJ3Eb7ELztFHtX3lBISkQCSYCQOQ2AA2qdirHZW1rZp0DbXarHVa9fknKKd4WtQnG2nz7tq27c+qEFQPxCaihxPiQt+ywWxVmt7A5XFj/mvfaV5ST8TypjDbhbWMoWB/wrDmn82RRP/kpVRmrTM4jMmQSAo+f7NWGF2/a3yiRCnkOgeZSr86CNhLavaLtlzVtTCyfHKpKj8kn41Y4NYlCgFlIU3IEgd4yBv+9qewlhH8RQt4wkudmo/wAiwQfkanrHY/V+6424G1D+5VEptCcylJ7pR7unPT5iT5zWh4fYV2cDvLQglKt9SNPn+FZgLDmQDQCVDw/e8VquH1QSMylBSACR5yPWg1WCthPZBBlIByn1/So3HVoLn2VIExoR4VYYKjupWqcsDLPjrVffvOXWPd33GxlPTy/f6UHOuPb52wdtLFK+zMd3+U/ZPxj4nrWfsMWWlwXttLT40eQDpJP+VR9EqM7KVVv9LRbVibYckFIgKTrl8x/r5VgWXXLa47VCg6hU5gk+8DoQfPUVB0T/AGqsjq5bM5z703YRrz7p28uVCsoh5KkJKbixKSJBdT3yP5vHrR0GaSkqOnLfpFGtQ/5Zgfj/AEoKMDsxsfepFANOQijBUNlRQilJTQGFqA60628pI+1rzHIUlASTB3qYwy3l1Ea70BNXLiMoTqeSTVg1fXTTSkJzKcc99R2A5R++VItW2WocyJcIJgq61PS+wqMydBtQOW7l2YAWqSNVZYB9fyqevtkW3ZLJUtWqzzPQD99KYYvPrEpZQlI6qO9TW1lYOZP/AJH9aoqXkfAaDyphljtblpo7OLSn4mKtblkZSoCBUXDtMVt+7MOA/nRBYiO2v318isgeQ0Hyqx4dtwGcWd+0jD1x6kD8JqmW/LijESTV9w5cIbsb9StlhDSvJRg0FMhgDbapliAxe2zp2S4Cryn/AFpkK7586fb1OlBJft+yu3GOSJbPpI/IU5if1zzVzlOV9uSB9/ZfrOvkqnrlHaKbe/6jYJ/vDRQ+VSrS2DzamV7KOZJ6K/rt6DpQQsPZ1SSRqTIHl/rW14fsHFLSsCEgkketRMHwRXaDMnpW4trRNjalSU7JJPhRTV/ctWFoW/CPLlWRau3GsQeQFZpII8RU/EwpVw0pLilNKc1HKspxs4rCLwutfabkef6UGT46xVq7xV2NFpGXNEjyNZNaAtY7KQsfYJ/D9Dr509irwunlXO4cPeP3VVDBnRQmNjUBEamSuf340KX2q/8Ar0KBsijAoCj50C0ppYROlJQadQrX3ZoAGKebZOU5d/OlIUie8kzvpFSmlCDOcHqRtQBu1cUEkzPKQQKs7ewSpJOZA018qYbdiMihlHIp/pU63xBUALSdPupk0E22sAmClR2G4qYu1WgkkgjxIH79ajMYglEpb7qoJMwo+cflNNPXBUG+0C4I0Ag/6771RLcbBZUVZfNJmBVeyhIvElOVCEyc23Kg7dFEAvJWg8ifj58qr3H7qRlEJJ15COlBDfaUDOU+tTcPfLeF4iiIUezUPQ0vKXFZlIGbckeVR28oUtCpIMz0O4A/fWgNu4lZHjM9Kn269RVO22AszBTJBIqwtSoLbUfcMg+oOv78KI0OHudokMnrmT58x+FavB8POZtSkzWWwy0U4EGAqDl/fz+Irb2TqmUoASoqyyFdSKK09lbIaSFIGvMdaPErtTNqpTaVKgcjVcMVdUEp7Apn7SjpSLti5vEFCVDId4VrQU4xOyvUrjuuJMKbUK5j9IuLm+vS0lZhoRBrdYzgn8PQu7dXBA0zc65fxmpDt+1dNxlfbzCOtBnwogwr3Tv+tEtMEgUkmTSgoRlV6HpUCIoU5kX9yaFA3OtKFChQLBpaVFOooUKB1DiyqZPxqQl9aSmTInajoUDrVw5mStBgKO3kafRdFOqiokRtHU0KFBJYuwSMyTB18amsKbfeEhQRGY66nrQoUEzs2EJ7IIidgAI9fjUtFsi4dShSQIOUkDnpB+dChQJNs32wQe9mlInw0/OoF9hgShQSvXQj4x+VChVEJu1S4tbSiQlyFaedXGHWIXapKld5oGf5tNKFCiNJhlnlaMLgkSmOUVp7JQdtghQ72Q6jyFChRT6AGGSSM2WPXSrK2cgEAaFM0dCg5f8AShjVylItEGG1DWudXS1O4BbuKPeaeUkeR1oUKgpzufOhQoUAoUKFB//Z"
                  alt=""
                />
                <div className="flex flex-col">
                  <h2 className="text-lg px-4 font-semibold">
                    Name: {deal.project}
                  </h2>
                  <p className="text-sm px-4 text-gray-500 dark:text-gray-400">
                    Deal Size: {deal.deal_size}
                  </p>
                  <p className="text-sm px-4 text-gray-500 dark:text-gray-400">
                    Region: {deal?.region}
                  </p>
                  <p className="text-sm px-4 text-gray-500 dark:text-gray-400">
                    Sector: {deal?.sector}
                  </p>
                </div>
              </div>
              <div className="w-[240px] flex items-center gap-4">
                <button
                  onClick={() => handleWithdrawClick(deal)}
                  className="bg-red-500 text-[13px] text-white px-2 py-1 w-1/2 rounded"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => navigate(`/dashboard/deals/${deal.deal_id}`)}
                  className="border border-primary text-primary font-medium w-1/2 text-[13px] px-2 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal title="Withdraw Interest" onClose={closeModal}>
          {modalContent === "confirm" && (
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-600 mb-4">
                Are you sure you want to withdraw interest in{" "}
                <strong>{selectedDeal?.project}</strong>?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmWithdraw}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Yes, Withdraw
                </button>
                <button
                  onClick={closeModal}
                  className="border border-gray-300 text-gray-600 px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {modalContent === "loading" && (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Processing your request...</p>
            </div>
          )}
          {modalContent === "success" && (
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                className="w-16 h-16 text-green-500 mb-4 border-4 border-green-500 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Interest Withdrawn
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You have successfully withdrawn your interest.
              </p>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default MyDeals;
