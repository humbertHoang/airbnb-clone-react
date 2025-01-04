import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-[#f7f7f7] mt-10">
      <div className="container mx-auto px-2 py-6 md:px-4 md:py-10 lg:px-0 lg:py-12">
        {/* Top Section */}
        <div className="grid grid-cols-12 gap-6">
          {[
            {
              title: 'Giới thiệu',
              links: [
                'Phương thức hoạt động',
                'Trang tin tức',
                'Nhà đầu tư',
                'Airbnb Plus',
              ],
            },
            {
              title: 'Cộng đồng',
              links: [
                'Sự đa dạng cảm giác thân thuộc',
                'Đối tác liên kết Airbnb',
                'Lượt giới thiệu của khách',
                'Airbnb.org',
              ],
            },
            {
              title: 'Đón tiếp khách',
              links: [
                'Cho thuê nhà',
                'Tổ chức trải nghiệm',
                'Trung tâm tài nguyên',
                'Trung tâm cộng đồng',
              ],
            },
            {
              title: 'Hỗ trợ',
              links: [
                'Trung tâm hỗ trợ',
                'Các tùy chọn hủy',
                'Hỗ trợ khu dân cư',
                'Tin cậy an toàn',
              ],
            },
          ].map((section, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <div>
                <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {section.links.map((link, idx) => (
                    <li
                      className="cursor-pointer transition-all hover:text-gray-800"
                      key={idx}
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-center border-t pt-4 text-sm text-gray-500 md:flex-row">
          <span>© 2024 Airbnb Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
