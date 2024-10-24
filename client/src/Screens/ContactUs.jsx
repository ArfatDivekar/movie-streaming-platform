import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaLocationDot } from "react-icons/fa6";

const ContactData = [
  {
    id: 1,
    title: "Email Us",
    info: "Have a question, suggestion, or just want to share your thoughts with us? Feel free to drop us an email at",
    icon: IoMdMail,
    contact: "arfatdivekar21@gmail.com",
  },
  {
    id: 2,
    title: "Call Us",
    info: "Need immediate assistance or prefer to talk to someone directly? Give us a call at",
    icon: FaPhone,
    contact: "8856900914",
  },
  {
    id: 1,
    title: "Location",
    info: "Chiplun, Ratnagiri - 415605",
    icon: FaLocationDot,
    contact: "",
  },
];

const ContactUs = () => {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
              key={item.id}
            >
              <span className="flex-colo w-20 h-20 m-3 rounded-full bg-main text-submain text-2xl hover:text-subMain">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                {item.info}{" "}
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
