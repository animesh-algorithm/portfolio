import React from "react";

const Blogs = () => {
  return (
    <div id="blogs" className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Blogs</h1>
      <ul className="flex flex-col gap-2">
        <li>
          <a
            href="https://example.com"
            className="text-white/40"
            target="_blank"
          >
            Blog 1
          </a>
        </li>
        <li>
          <a
            href="https://example.com"
            className="text-white/40"
            target="_blank"
          >
            Blog 2
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Blogs;
