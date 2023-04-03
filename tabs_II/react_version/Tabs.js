import { useId, useState } from 'react';

function getTabListItemId(tabsId, value) {
  return tabsId + '-tabs-' + value;
}

function getTabPanelId(tabsId, value) {
  return tabsId + '-tabPanel-' + value;
}

export default function Tabs({ defaultValue, items }) {
  const tabsId = useId();
  const [value, setValue] = useState(
    defaultValue ?? items[0].value,
  );

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist"> 
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === value;

          return (
            <button
              id={getTabListItemId(tabsId, itemValue)}
              key={itemValue}
              type="button"
              className={[
                'tabs-list-item',
                isActiveValue && 'tabs-list-item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setValue(itemValue);
              }}
              role='tab'  // a11y rqmts
              aria-controls={getTabPanelId(
                tabsId, 
                itemValue,
                )} // a11y rqmts              
              aria-selected={isActiveValue}  // a11y rqmts                
              >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
          <div
            key={itemValue} 
            id={getTabPanelId(tabsId, itemValue)} 
            aria-labelledBy={getTabListItemId(
              tabsId, 
              itemValue,
              )} // a11y rqmts          
            role='tabpanel' // a11y rqmts
            hidden={itemValue !== value}
            >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
