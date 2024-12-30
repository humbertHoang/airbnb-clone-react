import { Rate } from 'antd';
import React from 'react';


const CommentList = ({ comments = [] }) => { 
  return (
    <div className="w-full">
      <div className=" max-h-96 flex flex-col gap-4 border border-gray-300 bg-gray-50 p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-4 p-4  border-b-2 bg-white transition-shadow border border-gray-300"
            >
              <img
                src={
                  comment.avatar ||
                  'https://www.nuockhoangtinhkhiet24h.com/upload/img/inuser/Avatar-Facebook-tr%E1%BA%AFng.jpg'
                }
                alt={comment.tenNguoiBinhLuan}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {comment.tenNguoiBinhLuan || 'Anonymous'}
                  </h3>
                  <Rate disabled defaultValue={comment.saoBinhLuan} />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(comment.ngayBinhLuan).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {comment.noiDung || 'No content provided.'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
