import { useState } from 'react';

export default function Tabs({ defaultValue, items }) {
  const [activeTab, setActive] = useState(
    defaultValue ?? items[0].value,
    );
    
  return (
    <div className="tabs">
      <div className="tabs-list">
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === activeTab;

          return (
            <button
              key={itemValue}
              type="button"
              className={[
                'tabs-list-item',
                isActiveValue && 'tabs-list-item--active', 
              ]
              .filter(Boolean)
              .join(' ')}
              onClick={() => {
                setActive(itemValue);
              }}>
              {label}
              </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
           <div key={itemValue} hidden={itemValue !== activeTab}>
            {panel}
          </div>
        ))}
        </div>
   </div> 
  );
}
