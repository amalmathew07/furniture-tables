import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { format } from 'date-fns';

interface PickingList {
  [itemName: string]: number;
}

interface ChildItem {
  name: string;
  quantity: number;
}

interface ParentItem {
  parentItem: string;
  childItems: ChildItem[];
}

interface PackingListItem {
  orderNumber: number;
  orderDate: string;
  lineItems: ParentItem[];
  shippingAddress: string;
  customerName: string;
}

interface WarehouseData {
  pickingList: PickingList;
  packingList: PackingListItem[];
}

const WarehouseUI: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [warehouseData, setWarehouseData] = useState<WarehouseData | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('both'); // Default to showing both lists

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearch = async () => {
    // Fetch warehouse data from the API based on the selected date
    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
      const response = await fetch(`http://localhost:3001/api/warehouse?orderDate=${formattedDate}`);
      const data = await response.json();
      setWarehouseData(data);
    } catch (error) {
      console.error('Error fetching warehouse data:', error);
    }
  };

  const renderList = () => {
    switch (selectedOption) {
      case 'picking':
        return (
          <div className="picking-list">
            <h2>Picking List</h2>
            {Object.entries(warehouseData?.pickingList || {}).map(([itemName, quantity]) => (
              <p key={itemName} className="lineItem">
                {itemName}: {quantity}
              </p>
            ))}
          </div>
        );
      case 'packing':
        return (
          <div className="packing-list">
            <h2>Packing List</h2>
            {warehouseData?.packingList.map((packingListItem) => (
              <div key={packingListItem.orderNumber}>
                <h3>Order #{packingListItem.orderNumber}</h3>
                <p className="order-date">Order Date: {packingListItem.orderDate}</p>
                <h4 className="line-item">Line Items</h4>
                {packingListItem.lineItems.map((parentItem) => (
                  <div key={parentItem.parentItem} className="lineItem">
                    <p>{parentItem.parentItem}</p>
                    {parentItem.childItems.map((childItem, index) => (
                      <p key={index} className="childProduct">
                        {String.fromCharCode(97 + index)}. {childItem.name} X {childItem.quantity}
                      </p>
                    ))}
                  </div>
                ))}
                <p className="shipping">Ship to: {packingListItem.customerName} , {packingListItem.shippingAddress}</p>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <>
            <div className="picking-list">
              <h2>Picking List</h2>
              {Object.entries(warehouseData?.pickingList || {}).map(([itemName, quantity]) => (
                <p key={itemName} className="lineItem">
                  {itemName}: {quantity}
                </p>
              ))}
            </div>
            <div className="packing-list">
              <h2>Packing List</h2>
              {warehouseData?.packingList.map((packingListItem) => (
                <div key={packingListItem.orderNumber}>
                  <h3>Order #{packingListItem.orderNumber}</h3>
                  <p className="order-date">Order Date: {packingListItem.orderDate}</p>
                  <h4 className="line-item">Line Items</h4>
                  {packingListItem.lineItems.map((parentItem) => (
                    <div key={parentItem.parentItem} className="lineItem">
                      <p>{parentItem.parentItem}</p>
                      {parentItem.childItems.map((childItem, index) => (
                        <p key={index} className="childProduct">
                          {String.fromCharCode(97 + index)}. {childItem.name} X {childItem.quantity}
                        </p>
                      ))}
                    </div>
                  ))}
                  <p className="shipping">Ship to: {packingListItem.customerName} , {packingListItem.shippingAddress}</p>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="warehouse">
      <h1>Warehouse Data</h1>
      <div className="search-container">
        <label>Date:</label>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <button onClick={handleSearch}>Search</button>
        <div className="options">
          <label>Show:</label>
          <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
            <option value="both">Both Packing and Picking Lists</option>
            <option value="picking">Picking List</option>
            <option value="packing">Packing List</option>
          </select>
        </div>
      </div>
      {warehouseData && renderList()}
    </div>
  );
};

export default WarehouseUI;

