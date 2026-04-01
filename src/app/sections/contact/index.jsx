"use client";

import React, { useEffect, useRef } from "react";
import { IMaskInput } from "react-imask";

function Contact() {
  const nameRef = useRef(null);
  const selectRef = useRef(null);
  const phoneRef = useRef(null);
  const mapRef = useRef(null);
  const placemarkRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const select = selectRef.current.value;
    const phone = phoneRef.current.value.trim();

    const token = "8002417328:AAE6NVoyOv8inp3xTFveNwAg6X95bzcJh2c";
    const chat_id = "-4605763808";
    const text = `Ism: ${name}\nTelefon: ${phone}\nSavol: ${select}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id,
          text,
        }),
      });

      nameRef.current.value = "";
      phoneRef.current.value = "";
      selectRef.current.selectedIndex = 0;
      alert("Xabar yuborildi!");
    } catch (err) {
      console.error("Telegramga yuborishda xatolik:", err);
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY_HERE&lang=ru_RU";
    script.onload = () => {
      window.ymaps.ready(() => {
        const initialCoords = [41.513266, 60.607986];
        const map = new window.ymaps.Map("map", {
          center: initialCoords,
          zoom: 16,
          controls: [],
        });

        const placemark = new window.ymaps.Placemark(initialCoords, {
          hintContent: "Bino",
          balloonContent: "Bu bino joylashuvi",
        });

        map.geoObjects.add(placemark);

        mapRef.current = map;
        placemarkRef.current = placemark;
      });
    };
    document.body.appendChild(script);
  }, []);

  // 🧭 Location update function
  const changeLocation = (coords) => {
    if (mapRef.current && placemarkRef.current) {
      mapRef.current.setCenter(coords, 16);
      placemarkRef.current.geometry.setCoordinates(coords);
    }
  };

  return (
    <section id="contact" className="container">
      <div className="w-full flex flex-col-reverse lg:flex-row gap-10 relative mt-10">
        <div className="w-full lg:w-[50%] h-[400px] relative">
          <div className="z-10 w-full flex gap-2 mt-2">
            <button
              onClick={() => changeLocation([41.513266, 60.607986])}
              className="text-sm lg:text-lg bg-[#FFC045] text-white py-2 lg:py-4 w-full border-[1px] cursor-pointer hover:bg-transparent hover:text-[#ffc045] transition-all duration-200 ease-in-out"
            >
              Birinchi bino
            </button>
            <button
              onClick={() => changeLocation([41.528585, 60.608650])}
              className="text-sm lg:text-lg bg-[#FFC045] text-white py-2 lg:py-4 w-full border-[1px] cursor-pointer hover:bg-transparent hover:text-[#ffc045] transition-all duration-200 ease-in-out"
            >
              Ikkinchi bino
            </button>
            {/* <button
              onClick={() => changeLocation([41.512000, 60.606000])}
              className="text-sm lg:text-lg bg-[#FFC045] text-white py-2 lg:py-4 w-full border-[1px] cursor-pointer hover:bg-transparent hover:text-[#ffc045] transition-all duration-200 ease-in-out"
            >
              Uchunchi bino
            </button> */}
          </div>
          <div
            id="map"
            className="w-full h-[340px] mt-5 absolute"
          ></div>
          <div className="w-full h-[340px] mt-5 pointer-events-none shadow-[inset_0px_0px_20px_40px_#ffffff]  absolute"></div>
        </div>

        <div className="w-full lg:w-[50%]">
          {/* <h1 className="text-4xl text-center text-[#FFC045]">Aloqa</h1> */}
          <form onSubmit={handleSubmit} className="form flex flex-col gap-6 ">
            <div className="flex flex-col gap-2">
              <label className="text-2xl text-[#FFC045]" htmlFor="name">
                Ismingiz
              </label>
              <input
                required
                ref={nameRef}
                className="name p-3 text-lg bg-white border-[#FFC045] border-[1px] border-solid outline-none"
                type="text"
                placeholder="Ismingiz..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-2xl text-[#FFC045]" htmlFor="phone">
                Telefon
              </label>
              <IMaskInput
                mask="+998 00 000 00 00"
                lazy={true} // bo‘sh joylarni ham ko‘rsatadi
                unmask={true} // qiymatni mask bilan saqlaydi
                inputRef={phoneRef}
                placeholder="Telefon raqamingiz..."
                className="name p-3 text-lg bg-white border-[#FFC045] border-[1px] border-solid outline-none"
                required
              />

            </div>
            <div className="mt-5">
              <label htmlFor="select"></label>
              <select
                ref={selectRef}
                required
                className="w-full p-4 text-lg bg-white text-gray-500 border-[#FFC045] border-[1px] border-solid outline-none"
                name="select"
                id="select"
              >
                <option className="bg-white" value="">
                  Sizga qanday yordam bera olamiz?
                </option>
                {/* <option value="Kvartira sotib olmoqchiman">Kvartira sotib olmoqchiman.</option> */}
                <option value="Uy sotib olmoqchiman">Uy haqida ma'lumot olmoqchiman.</option>
                <option value="Uy sotib olmoqchiman">Uy sotib olmoqchiman.</option>
                <option value="Ma'lumot olmoqchiman">Ma'lumot olmoqchiman.</option>
                <option value="Boshqa">Boshqa</option>
              </select>
            </div>
            <button className="bg-[#FFC045] text-white text-xl mt-5 p-4 cursor-pointer border-[1px] border-solid border-[#ffc045] hover:bg-transparent hover:text-[#ffc045] transition-all duration-300 ease-in-out">
              YUBORISH
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
