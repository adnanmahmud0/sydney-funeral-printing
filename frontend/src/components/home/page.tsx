
"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const industriesData = [
  {
    name: "A5 Booklets/Order of Ceremony",
    description:
      "Revolutionary medical solutions and digital health platforms that improve patient outcomes and streamline healthcare delivery.",
    image: "./home/Order-of-Ceremony.jpg",
    imageAlt: "Healthcare technology illustration",
    url: "http://shadcnblocks.com/blocks",
  },
  {
    name: "Folded Cards",
    description:
      "Cutting-edge financial technology solutions that transform banking, payments, and investment management for the digital age.",
    image: "./home/Folded-Cards.jpg",
    imageAlt: "Financial technology illustration",
    url: "http://shadcnblocks.com/blocks",
  },
  {
    name: "Flat Cards",
    description:
      "Comprehensive online retail platforms and marketplace solutions that drive sales and enhance customer experiences.",
    image: "./home/Flat-Cards.png",
    imageAlt: "E-commerce platform illustration",
    url: "http://shadcnblocks.com/blocks",
  },
  {
    name: "Bookmarks",
    description:
      "Innovative learning management systems and educational technology that empower students and educators worldwide.",
    image: "./home/Bookmarks.jpg",
    imageAlt: "Educational technology illustration",
    url: "http://shadcnblocks.com/blocks",
  },
  {
    name: "Easel Posters",
    description:
      "Innovative learning management systems and educational technology that empower students and educators worldwide.",
    image: "./home/Easel-Posters.jpg",
    imageAlt: "Educational technology illustration",
    url: "http://shadcnblocks.com/blocks",
  },
];

const Industries1 = () => {
  return (
    <section className="py-12">
      <div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {industriesData.map((industry, index) => (
            <a href={industry.url} key={index}>
              <div className="group relative overflow-hidden bg-muted h-[250px] w-full border-primary border-3">
                {/* Image */}
                <motion.img
                  src={industry.image}
                  alt={industry.imageAlt}
                  className="h-full w-full object-cover transition-all duration-300"
                  whileHover={{ filter: "blur(4px)" }}
                />

                {/* FULL-WIDTH Title Background */}
                <div className="absolute bottom-0 left-0 w-full bg-primary py-2 px-4">
                  <h3 className="text-base font-medium text-white text-center">
                    {industry.name}
                  </h3>
                </div>

                {/* Button on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-medium text-white shadow-lg">
                    <Plus className="size-4" />
                    View
                  </button>
                </motion.div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries1 };
