import React, { useState, useEffect, useRef } from "react";
import "./FurnitureStore.css";

const FurnitureStore: React.FC = () => {
  const furnitureData = [
    {
      id: 1,
      category: "Coffee Tables",
      name: "Stella Coffee Table - 1 Unit",
      price: "$210 or financing",
      image: "images/tinywow_1_28381075.webp",
    },
    {
      id: 2,
      category: "Coffee Tables",
      name: "Stella Coffee Tables - 2 Units",
      price: "$420 or financing",
      image: "images/tinywow_2_28381081.webp",
    },
    {
      id: 3,
      category: "Coffee Tables",
      name: "Pluto Coffee Table",
      price: "$135 or financing",
      image: "images/tinywow_3_28381089.webp",
    },
    {
      id: 4,
      category: "Coffee Tables",
      name: "Stella Coffee Tables - 3 Units",
      price: "$630 or financing",
      image: "images/tinywow_4_28381113.webp",
    },
    {
      id: 5,
      category: "Coffee Tables",
      name: "Pluto Coffee Table",
      price: "$135 or financing",
      image: "images/tinywow_5_28381124.webp",
    },
    {
      id: 6,
      category: "Coffee Tables",
      name: "Stella Coffee Table - 1 Unit",
      price: "$210 or financing",
      image: "images/STELLA LIFT-TOP 1 CLOSED CONFIG 1.webp",
    },
    {
      id: 7,
      category: "Coffee Tables",
      name: "Stella Coffee Tables - 2 Units",
      price: "$420 or financing",
      image: "images/tinywow_6_28381143.webp",
    },
    {
      id: 8,
      category: "Coffee Tables",
      name: "Stella Coffee Tables - 3 Units",
      price: "$630 or financing",
      image: "images/STELLA LIFT-TOP 3 CLOSED CONFIG 3.webp",
    },
    {
      id: 9,
      category: "Side Tables",
      name: "Solis Adjustable Table",
      price: "$180 or financing",
      image: "images/tinywow_7_28381247.webp",
    },
    {
      id: 10,
      category: "Side Tables",
      name: "Solis Adjustable Table",
      price: "$180 or financing",
      image: "images/tinywow_8_28381358.webp",
    },
    {
      id: 11,
      category: "Side Tables",
      name: "Solis Adjustable Table",
      price: "$180 or financing",
      image: "images/tinywow_9_28381369.webp",
    },
    {
      id: 99,
      category: "Side Tables",
      name: "Stella Coffee Table - 1 Unit",
      price: "$210 or financing",
      image: "images/STELLA LIFT-TOP 1 CLOSED CONFIG 1.webp",
    },
    {
      id: 100,
      category: "Side Tables",
      name: "Stella Coffee Table - 1 Unit",
      price: "$210 or financing",
      image: "images/tinywow_1_28381075.webp",
    },
    {
      id: 101,
      category: "Side Tables",
      name: "Pluto Side Table",
      price: "$85 or financing",
      image: "images/tinywow_10_28381395.webp",
    },
    {
      id: 102,
      category: "Side Tables",
      name: "Pluto Side Table",
      price: "$85 or financing",
      image: "images/tinywow_11_28381418.webp",
    },
    {
      id: 12,
      category: "Media Units",
      name: "Stella Media Unit - 3 Units",
      price: "$475 or financing",
      image: "images/tinywow_22_28385308.webp",
    },
    {
      id: 103,
      category: "Media Units",
      name: "Stella Media Unit - 3 Units",
      price: "$475 or financing",
      image: "images/tinywow_20_28385292.webp",
    },
    {
      id: 104,
      category: "Media Units",
      name: "Stella Media Unit - 3 Units | No Doors",
      price: "$435 or financing",
      image: "images/STELLA TV 3 HOLE (1).webp",
    },
    {
      id: 105,
      category: "Media Units",
      name: "Stella Media Unit - 4 Units",
      price: "$435 or financing",
      image: "images/STELLA TV 4 DOOR-HOLE-HOLE-DOOR.webp",
    },
    {
      id: 106,
      category: "Media Units",
      name: "Stella Media Unit - 4 Units",
      price: "$620 or financing",
      image: "images/tinywow_16_28381530.webp",
    },
    {
      id: 107,
      category: "Media Units",
      name: "Stella Media Unit - 4 Units",
      price: "$620 or financing",
      image: "images/tinywow_13_28381505.webp",
    },
    {
      id: 108,
      category: "Media Units",
      name: "Stella Media Unit - 3 Units",
      price: "$475 or financing",
      image: "images/tinywow_15_28381520.webp",
    },
    {
      id: 71,
      category: "Table Bundles",
      name: "Pluto Table Set | 1 Coffee Table & 1 Side Table",
      price: "$195",
      image: "images/tinywow_17_28385269.webp",
      discount: "10%",
    },
    {
      id: 110,
      category: "Table Bundles",
      name: "Pluto Table Set | 1 Coffee Table & 2 Side Tables",
      price: "$225",
      image: "images/tinywow_18_28385277.webp",
      discount: "15%",
    },
    {
      id: 111,
      category: "Table Bundles",
      name: "Stella Table Set | 2-Unit Media & 2-Unit Coffee Table",
      price: "$505",
      image: "images/tinywow_20_28385292.webp",
      discount: "15%",
    },
    {
      id: 112,
      category: "Table Bundles",
      name: "Stella Table Set | 2-Unit Media & 1 Side Table",
      price: "$465",
      image: "images/tinywow_21_28385302.webp",
      discount: "10%",
    },
    {
      id: 113,
      category: "Table Bundles",
      name: "Stella Table Set | 3-Unit Media & 2-Unit Coffee Table",
      price: "$715",
      image: "images/tinywow_22_28385308.webp",
      discount: "10%",
    },
    {
      id: 114,
      category: "Table Bundles",
      name: "Stella Table Set | 3-Unit Media & 1 Side Table",
      price: "$580",
      image: "images/tinywow_23_28385315.webp",
      discount: "20%",
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
  const [isScrolled, setIsScrolled] = useState(false);

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

    setIsScrolled(window.scrollY > 0);
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
      <div className={`header-menu ${isScrolled ? "scrolled" : ""}`}>
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
                    <a href={""}>
                      <div className="image-container">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </a>
                    <div className="furniture-details">
                      <div className="furniture-info">
                        <div className="furniture-name">{item.name}</div>
                        <div className="furniture-price">
                          {item.price}&nbsp;&nbsp;|&nbsp;&nbsp;
                        </div>
                        {item.discount ? (
                          <div className="furniture-discount">
                            <div className="furniture-discount">
                              {"Save " + item.discount}
                            </div>
                            <div className="furniture-customize">
                              <a className="customize-link" href="">
                                Customize
                              </a>
                            </div>{" "}
                          </div>
                        ) : (
                          <div className="furniture-customize-inline">
                            <a className="customize-link" href="">
                              Customize
                            </a>
                          </div>
                        )}
                      </div>
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
