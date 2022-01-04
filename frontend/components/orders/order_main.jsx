import React from 'react';
import ListItem from './list_item';
import {Link} from 'react-router-dom';
import EmptyDiv from '../general/empty_div';

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
    const screenData = this.props.screenData;

    const statusesToInclude = screenData.statusesToInclude;
    const statusesToDisplay = {};
    Object.values(items).forEach((item) => {
      if (!statusesToInclude[item.statusId]) return;
      if (!statusesToDisplay[item.statusId]) {
        statusesToDisplay[item.statusId] = [];
      }
      statusesToDisplay[item.statusId].push(item);
    });

    const titlebarLink = screenData.topLink ?
      (<Link to={screenData.topLink.link} >{screenData.topLink.text}</Link>) :
      (<EmptyDiv/>);

    return (
      <div className='frame'>
        <div className='link-titlebar'>
          <h1>{screenData.title}</h1>
          {titlebarLink}
        </div>
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
          action={this.maybeToggleCheckedItem.bind(this, item.id)}
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

  maybeToggleCheckedItem(itemId) {
    // Nothing here yet, but maybe in the future
    this.props.toggleCheckedItem(itemId);
  }
}

export default Main;
