import React from 'react';
import ListItem from './list_item';

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearPathHistory();
    this.props.clearCheckedItems();
    this.props.getItems();
  }

  render() {
    const items = this.props.items;
    const statuses = this.props.statuses;

    const statusesToDisplay = {};
    Object.values(items).forEach((item) => {
      if (!statusesToDisplay[item.statusId]) {
        statusesToDisplay[item.statusId] = [];
      }
      statusesToDisplay[item.statusId].push(item);
    });

    return (
      <div className='frame'>
        <h1>
          Your Items
        </h1>
        <div id={'ranking-list'}>
          { this.orderList(statusesToDisplay) }
        </div>
      </div>
    );
  }

  orderList(statusesToDisplay) {
    const distributors = this.props.distributors;
    const invoices = this.props.invoices;
    const notes = this.props.notes;
    const users = this.props.users;
    const checkedItems = this.props.checkedItems;
    const toggleCheckedItem = this.props.toggleCheckedItem;

    return Object.keys(statusesToDisplay).map((statusId) => {
      const status = this.props.statuses[statusId];
      const itemArray = statusesToDisplay[statusId];

      const itemList = itemArray.map((item) => {
        return <ListItem
          action={toggleCheckedItem.bind('clickAction', item.id)}
          key={item.id}
          item={item}
          distributor={distributors[item.distributorId]}
          invoice={invoices[item.invoiceId]}
          notes={notes}
          checked={checkedItems[item.id]}
          users={users}
          currentUser={this.props.currentUser} />;
      });

      return (
        <div key={status.id}>
          <h2>{status.name}</h2>
          {itemList}
        </div>
      );

    });
  }
}

export default Main;
