import React from 'react';
import ListItem from './list_item';
import {Link} from 'react-router-dom';
import EmptyDiv from '../general/empty_div';
import FloatingImageButton from '../general/floating_image_button';

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
    if (!this.props.loggedIn) return <EmptyDiv/>;

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

    const editButtonPath = this.props.currentUser.ordermaster ?
      '/ordermaster/edit' :
      '/orders/edit';
    const editButton = this.props.checkedItems && Object.keys(this.props.checkedItems).length !== 0 ?
      <FloatingImageButton path={editButtonPath} image={window.edit} /> :
      <EmptyDiv/> ;

    return (
      <div className='frame'>
        <div className='link-titlebar'>
          <h1>{screenData.title}</h1>
          {titlebarLink}
        </div>
        <div id={'ranking-list'}>
          { this.orderList(statusesToDisplay) }
        </div>
        {editButton}
      </div>
    );
  }

  orderList(statusesToDisplay) {
    const distributors = this.props.distributors;
    const invoices = this.props.invoices;
    const notes = this.props.notes;
    const users = this.props.users;
    const checkedItems = this.props.checkedItems || {};
    const toggleCheckedItem = this.props.toggleCheckedItem;

    return Object.keys(statusesToDisplay).map((statusId) => {
      const status = this.props.statuses[statusId];
      const itemArray = statusesToDisplay[statusId];

      const itemList = itemArray.map((item) => {
        const actionCb = this.props.toggleCheckedItem ?
          this.maybeToggleCheckedItem.bind(this, item.id) :
          undefined;

        return <ListItem
          action={actionCb}
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
