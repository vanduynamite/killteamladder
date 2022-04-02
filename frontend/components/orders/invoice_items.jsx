import React from 'react';
import ButtonLink from '../general/button_link';
import ListItem from './list_item';
import {Link} from 'react-router-dom';
import EmptyDiv from '../general/empty_div';
import FloatingImageButton from '../general/floating_image_button';

class InvoiceItems extends React.Component {

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
    const screenData = this.props.screenData;

    const usersToInclude = this.props.users;
    const usersToDisplay = {};
    Object.values(items).forEach((item) => {
      if (!usersToInclude[item.userId]) return;
      if (!usersToDisplay[item.userId]) {
        usersToDisplay[item.userId] = [];
      }
      usersToDisplay[item.userId].push(item);
    });

    const titlebarLink = screenData.topLink ?
      (<Link to={screenData.topLink.link} >{screenData.topLink.text}</Link>) :
      (<EmptyDiv/>);

    const buttonPath = '/ordermaster/createinvoice';
    const fab =  this.shouldShowFab() ?
      <FloatingImageButton path={buttonPath} image={window.add} /> :
      <EmptyDiv/> ;

    return (
      <div className='frame'>
        <div className='link-titlebar'>
          <h1>{screenData.title}</h1>
          {titlebarLink}
        </div>
        { this.ordermasterNavigation() }
        <div id={'ranking-list'}>
          { this.orderList(usersToDisplay) }
        </div>
        {fab}
      </div>
    );
  }

  orderList(usersToDisplay) {
    const distributors = this.props.distributors;
    const notes = this.props.notes;
    const users = this.props.users;
    const invoices = this.props.invoices;
    const checkedItems = this.props.checkedItems || {};
    const toggleCheckedItem = this.props.toggleCheckedItem;

    return Object.keys(usersToDisplay).map((userId) => {
      const user = this.props.users[userId];
      const itemArray = usersToDisplay[userId];

      const itemList = itemArray.map((item) => {
        const actionCb = this.props.toggleCheckedItem ?
          this.maybeToggleCheckedItem.bind(this, item.id) :
          undefined;

        return <ListItem
          action={actionCb}
          key={item.id}
          item={item}
          invoice={invoices[item.invoiceId]}
          distributor={distributors[item.distributorId]}
          notes={notes}
          checked={checkedItems[item.id]}
          users={users}
          currentUser={this.props.currentUser} />;
      });

      return (
        <div key={user.id}>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          {itemList}
        </div>
      );

    });
  }

  maybeToggleCheckedItem(itemId) {
    // Nothing here yet, but maybe in the future
    this.props.toggleCheckedItem(itemId);
  }

  shouldShowFab() {
    if (!this.props.checkedItems) return false;

    const userIds = {};
    Object.keys(this.props.checkedItems).forEach((itemId) => {
      const item = this.props.items[itemId];
      if (!item) return;
      userIds[item.userId] = true;
    });

    return Object.keys(userIds).length === 1;
  }

  ordermasterNavigation() {
    if (!this.props.currentUser.ordermaster) {
      return <EmptyDiv/>;
    }

    const buttons = this.props.screenData.ordermasterNavButtons.map((button) => {
      const className = button.active ?
        'ordermaster-button submit-active' :
        'ordermaster-button submit-deactive';
      return <ButtonLink text={button.text} path={button.path} type={className} />;
    });
    return <div className='ordermaster-nav'>{buttons}</div>;
  }
}

export default InvoiceItems;
