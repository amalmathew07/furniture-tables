import React, { useState, useEffect, useRef } from "react";
import "./FurnitureStore.css";

const FurnitureStore: React.FC = () => {
  const furnitureData = [
    {
      id: 1,
      category: "Coffee Tables",
      name: "Coffee Table 1",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 2,
      category: "Coffee Tables",
      name: "Coffee Table 1",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 3,
      category: "Coffee Tables",
      name: "Coffee Table 1",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 4,
      category: "Coffee Tables",
      name: "Coffee Table 1",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 5,
      category: "Coffee Tables",
      name: "Coffee Table 1",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 6,
      category: "Side Tables",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 7,
      category: "Side Tables",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 8,
      category: "Side Tables",
      name: "Media Units",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 9,
      category: "Side Tables",
      name: "Media Units",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 10,
      category: "Media Units",
      name: "Media Units",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 11,
      category: "Media Units",
      name: "Table Bundles",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 12,
      category: "Media Units",
      name: "Table Bundles",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 61,
      category: "Media Units",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 71,
      category: "Table Bundles",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 62,
      category: "Table Bundles",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 73,
      category: "Table Bundles",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 63,
      category: "Table Bundles",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
    {
      id: 74,
      category: "Table Bundles",
      name: "Side Tables",
      price: "$100",
      image: "images/ECLIPSE.webp",
    },
  ];

  const categories = [
    "Coffee Tables",
    "Side Tables",
    "Media Units",
    "Table Bundles",
  ];

  const [activeCategory, setActiveCategory] = useState(null);
  const hasSetInitialCategoryRef = useRef(false);

  useEffect(() => {
    const determineInitialActiveCategory = () => {
      const furnitureElements = document.querySelectorAll(".furniture-item");

      furnitureElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          rect.top < window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          return element.getAttribute("data-category");
        }
      });

      return categories[0];
    };

    if (!hasSetInitialCategoryRef.current) {
      setActiveCategory(determineInitialActiveCategory());
      hasSetInitialCategoryRef.current = true;
    }
  }, [categories]);

  const handleScroll = () => {
    const furnitureElements = document.querySelectorAll(".furniture-item");
    let currentCategory = activeCategory;

    furnitureElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (
        rect.top < window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentCategory = element.getAttribute("data-category");
      }
    });

    setActiveCategory(currentCategory);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeCategory]);

  const groupedFurniture = furnitureData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="body-class">
        <h1 className="h1-class">Tables</h1>
        <span className="span-class">A perfect pairing to your sofa.</span>
      <div className="header-menu">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-item ${
              activeCategory === category ? "active" : ""
            }`}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="furniture-store">
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h1 className="sub-heading">{category}</h1>
            <div className="furniture-container">
              {groupedFurniture[category] &&
                groupedFurniture[category].map((item) => (
                  <div
                    key={item.id}
                    className={`furniture-item ${
                      item.category === activeCategory ? "active" : ""
                    }`}
                    data-category={item.category}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="furniture-details">
                      <div className="furniture-name">{item.name}</div>
                      <div className="furniture-price">{item.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureStore;
