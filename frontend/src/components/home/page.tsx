"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoriesData, Category } from "@/data/categoriesData";

const Industries1 = () => {
  const router = useRouter();

  const handleClick = (category: Category) => {
    router.push(`/categories/${category.id}`);
  };

  return (
    <section className="py-12">
      <div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {categoriesData.map((category, index) => (
            <div
              key={index}
              onClick={() => handleClick(category)}
              className="cursor-pointer"
            >
              <div className="group relative overflow-hidden bg-muted h-[250px] w-full border-primary border-3">
                <motion.img
                  src={category.image}
                  alt={category.imageAlt}
                  className="h-full w-full object-cover transition-all duration-300"
                  whileHover={{ filter: "blur(4px)" }}
                />

                <div className="absolute bottom-0 left-0 w-full bg-primary py-2 px-4">
                  <h3 className="text-base font-medium text-white text-center">
                    {category.name}
                  </h3>
                </div>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries1 };
