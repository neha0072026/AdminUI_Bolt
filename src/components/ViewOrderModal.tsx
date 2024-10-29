import React, { useState } from "react";
import { X, Package, Truck, Info } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  billingInfo?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email?: string;
    phone?: string;
  };
  shippingInfo?: {
    method: string;
    tracking?: string;
    estimatedDelivery?: string;
    cost: number;
  };
}

interface ViewOrderModalProps {
  order: Order;
  onClose: () => void;
}

type TabType = "info" | "products" | "shipping";

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({ order, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  const tabs = [
    { id: "info", label: "Order Info", icon: Info },
    { id: "products", label: "Products", icon: Package },
    { id: "shipping", label: "Shipping", icon: Truck },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-hidden">
      <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Order #{order.id}
            </h2>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 focus:outline-none ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Order Details
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Order Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{order.date}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Total Amount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Customer
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.customer}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.status}
                    </dd>
                  </div>
                </dl>
              </div>

              {order.billingInfo && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Billing Information
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {order.billingInfo.address1}
                        {order.billingInfo.address2 && <br />}
                        {order.billingInfo.address2}
                        <br />
                        {order.billingInfo.city}, {order.billingInfo.state}{" "}
                        {order.billingInfo.zip}
                        <br />
                        {order.billingInfo.country}
                      </dd>
                    </div>
                    {order.billingInfo.email && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {order.billingInfo.email}
                        </dd>
                      </div>
                    )}
                    {order.billingInfo.phone && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {order.billingInfo.phone}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Items
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "shipping" && order.shippingInfo && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Shipping Details
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Shipping Method
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.shippingInfo.method}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Shipping Cost
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${order.shippingInfo.cost.toFixed(2)}
                    </dd>
                  </div>
                  {order.shippingInfo.tracking && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Tracking Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {order.shippingInfo.tracking}
                      </dd>
                    </div>
                  )}
                  {order.shippingInfo.estimatedDelivery && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Estimated Delivery
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {order.shippingInfo.estimatedDelivery}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
