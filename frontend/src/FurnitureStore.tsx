import React, { useState, useEffect, useRef } from "react";
import tableData from "./tableData.json";
import "./FurnitureStore.css";

// Header component
const Header = () => (
  <>
    <h1 className="h1-class">Tables</h1>
    <span className="span-class">A perfect pairing to your sofa.</span>
  </>
);

// CategoryMenu component
const CategoryMenu = ({ categories, activeCategory, isScrolled }) => {
  const handleCategoryClick = (category) => {
    const sectionId = category.replace(/\s+/g, "");
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`header-menu ${isScrolled ? "scrolled" : ""}`}>
      {categories.map((category) => (
        <div
          key={category}
          className={`category-item ${activeCategory === category ? "active" : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

// FurnitureItem component
const FurnitureItem = ({ item, activeCategory }) => (
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
        <ColorDisplay color={item.color} />
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
);

// ColorDisplay component
const ColorDisplay = ({ color }) => (
  <div className={`color-container color-container-${color}`}>
    <span className="color-name">{color}</span>
    <div className={`color-display color-display-${color}`}></div>
  </div>
);

// FurnitureStore component
const FurnitureStore: React.FC = () => {
  const furnitureData = tableData;
  const categories = ["Coffee Tables", "Side Tables", "Media Units", "Table Bundles"];
  const [activeCategory, setActiveCategory] = useState(null);
  const hasSetInitialCategoryRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const determineInitialActiveCategory = () => categories[0];

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
      if (rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
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
      <Header />
      <CategoryMenu categories={categories} activeCategory={activeCategory} isScrolled={isScrolled} />
      <div className="furniture-store">
        {categories.map((category) => (
          <div key={category} id={category.replace(/\s+/g, "")} className="category-section">
            <h1 className="sub-heading">{category}</h1>
            <div className="furniture-container">
              {groupedFurniture[category] &&
                groupedFurniture[category].map((item) => (
                  <FurnitureItem key={item.id} item={item} activeCategory={activeCategory} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureStore;

