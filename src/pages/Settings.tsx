import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CreditCard,
  Users,
  Mail,
  DollarSign,
  Globe,
  Lock,
  Percent,
  Layers,
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

interface SettingItem {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

const settingItems: SettingItem[] = [
  {
    icon: Package,
    title: "General",
    description: "Basic store settings and configuration",
    link: "/settings/general",
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Manage shipping zones and methods",
    link: "/settings/shipping",
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Configure payment gateways and options",
    link: "/settings/payment",
  },
  {
    icon: Users,
    title: "Users",
    description: "Manage user accounts and permissions",
    link: "/settings/users",
  },
  {
    icon: Mail,
    title: "Emails",
    description: "Customize email templates and notifications",
    link: "/settings/emails",
  },
  {
    icon: DollarSign,
    title: "Currency",
    description: "Set up currencies and exchange rates",
    link: "/settings/currency",
  },
  {
    icon: Globe,
    title: "Languages",
    description: "Manage store languages and translations",
    link: "/settings/languages",
  },
  {
    icon: Lock,
    title: "Privacy",
    description: "Configure privacy and data protection settings",
    link: "/settings/privacy",
  },
  {
    icon: Percent,
    title: "Taxes",
    description: "Set up tax rates and rules",
    link: "/settings/taxes",
  },
  {
    icon: Layers,
    title: "Integrations",
    description: "Enhance Workflows with Advanced Integrations",
    link: "/settings/integrations",
  },
];

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Settings" }]}
      />
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingItems.map((item, index) => (
          <Link to={item.link} key={index} className="group">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg h-full flex flex-col items-start justify-start p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex-shrink-0 mb-4">
                <item.icon
                  className="h-8 w-8 text-gray-400 group-hover:text-primary-600 transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
