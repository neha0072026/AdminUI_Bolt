import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  items: { name: string; path?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="mb-4 text-sm breadcrumbs">
      <ul className="flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.path ? (
              <Link
                to={item.path}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
