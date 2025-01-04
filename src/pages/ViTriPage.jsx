import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const ViTriPage = () => {
  const { viTriId } = useParams();
  const [listChoO, setListChoO] = useState([]);
  const navigate = useNavigate()

  const getChoOTheoViTri = async () => {
    try {
      if (viTriId) {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${viTriId}`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        });
        setListChoO(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Fetch rooms every time viTriId changes
  useEffect(() => {
    getChoOTheoViTri();
  }, [viTriId]);

  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-0">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Chỗ ở tại khu vực bạn đã chọn</h1>
          <div className="h-[80vh] overflow-y-auto">
            {listChoO.map((choO) => (
              <div onClick={()=>navigate(`/room/${choO.id}`)}
                key={choO.id}
                className="flex items-center justify-between border-b border-gray-300 p-4 gap-4"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-1/4">
                    <img
                      src={choO.hinhAnh}
                      alt={choO.tenPhong}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-3/4">
                    <h2 className="text-lg font-semibold">{choO.tenPhong}</h2>
                    <p className="line-clamp-2 text-gray-600">{choO.moTa}</p>
                    <p className="text-lg font-semibold">
                      {(choO.giaTien * 24000).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      / đêm
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block w-full md:w-1/2 mt-4 md:mt-0">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8217735299718!2d106.69563232852825!3d10.789309516729396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292591b672e5%3A0xb0efbe20cbbe911d!2zVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBM4bqtcCBUcsOsbmggQ3liZXJTb2Z0IC0gUXXhuq1uIDE!5e0!3m2!1svi!2s!4v1735987664970!5m2!1svi!2s`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ViTriPage;
