import { Rate } from "antd";

const CommentList = ({ comments = [] }) => {
  return (
    <div className="w-full">
      <div className="flex max-h-96 flex-col gap-4 overflow-y-auto overflow-x-hidden border border-gray-300 bg-gray-50 p-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-4 rounded-md border border-gray-300 bg-white p-4 transition-shadow"
            >
              <img
                src={
                  comment.avatar ||
                  "https://www.nuockhoangtinhkhiet24h.com/upload/img/inuser/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                }
                alt={comment.tenNguoiBinhLuan}
                className="h-12 w-12 flex-shrink-0 rounded-full border border-gray-300 object-cover"
              />
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-4">
                  <h3 className="truncate text-lg font-semibold text-gray-900">
                    {comment.tenNguoiBinhLuan || "Anonymous"}
                  </h3>
                  <Rate disabled defaultValue={comment.saoBinhLuan} />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(comment.ngayBinhLuan).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-2 line-clamp-3 text-gray-700">
                  {comment.noiDung || "No content provided."}
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
