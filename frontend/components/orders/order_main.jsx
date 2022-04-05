import React from 'react';
import ButtonLink from '../general/button_link';
import ListItem from './list_item';
import {Link} from 'react-router-dom';
import EmptyDiv from '../general/empty_div';
import FloatingImageButton from '../general/floating_image_button';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.groupIdField = this.props.screenData.initialGroupIdField;
  }

  componentDidMount() {
    this.props.clearPathHistory();
    this.props.clearCheckedItems();
    this.props.getItems();
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;

    const screenData = this.props.screenData;

    const titlebarLink = screenData.topLink ?
      (<Link to={screenData.topLink.link} >{screenData.topLink.text}</Link>) :
      (<EmptyDiv/>);

    let editButtonPath = '/orders/edit';
    if (this.props.currentUser.ordermaster) {
      editButtonPath = this.props.screenData.fabPath || '/ordermaster/edit';  
    }
    const fabIcon = this.props.screenData.fabIcon || window.edit;
    const fab = this.props.checkedItems && Object.keys(this.props.checkedItems).length !== 0 ?
      <FloatingImageButton path={editButtonPath} image={fabIcon} /> :
      <EmptyDiv/> ;

    return (
      <div className='frame'>
        <div className='link-titlebar'>
          <h1>{screenData.title}</h1>
          {titlebarLink}
        </div>
        { this.ordermasterNavigation() }
        <div id={'ranking-list'}>
          { this.getOrderList() }
        </div>
        {fab}
      </div>
    );
  }

  getOrderList() {
    const groupsToDisplay = this.getGroupsToDisplay();
    const itemList = this.getGroupedOrderList(groupsToDisplay);
    return itemList;
  }

  getGroupsToDisplay() {
    const items = this.props.items;
    const groupIdField = this.groupIdField;

    const groupsToDisplay = {};
    Object.values(items).forEach((item) => {
      const entityId = item[groupIdField];
      if (!groupsToDisplay[entityId]) {
        groupsToDisplay[entityId] = [];
      }
      groupsToDisplay[entityId].push(item);
    });

    return groupsToDisplay;
  }

  getGroupedOrderList(groups) {
    return Object.keys(groups).map((groupId) => {
      return this.getOneGroupList(groups[groupId]);
    });
  }

  getOneGroupList(itemArray) {
    const checkedItems = this.props.checkedItems || {};
    const distributors = this.props.distributors;
    const invoices = this.props.invoices;
    const notes = this.props.notes;
    const users = this.props.users;

    const itemList = itemArray.map((item) => {
      const actionCb = this.props.toggleCheckedItem ?
        this.maybeToggleCheckedItem.bind(this, item.id) :
        undefined;

      return <ListItem
        action={actionCb}
        key={"item" + item.id}
        item={item}
        distributor={distributors[item.distributorId]}
        invoice={invoices[item.invoiceId]}
        notes={notes}
        checked={checkedItems[item.id]}
        users={users}
        currentUser={this.props.currentUser} />;
    });

    const groupKey = itemArray[0][this.groupIdField];
    const groupName = this.getGroupName(this.groupIdField, groupKey);

    return (
      <div key={"group" + groupKey}>
        <h2>{groupName}</h2>
        {itemList}
      </div>
    );
  }

  getGroupName(groupIdField, groupId) {
    if (!groupId) return 'Unknown group';

    switch (groupIdField) {
      case 'distributorId':
        return this.props.distributors[groupId].name;

      case 'invoiceId':
        return this.props.invoices[groupId].carcosaId;

      case 'statusId':
        return this.props.statuses[groupId].name;

      case 'userId':
        const user = this.props.users[groupId];
        return `${user.firstName} ${user.lastName}`;

      default:
        return 'Unknown group';
    }
  }

  ordermasterNavigation() {
    if (!this.props.currentUser.ordermaster ||
      !this.props.screenData.ordermasterNavButtons) {
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

  maybeToggleCheckedItem(itemId) {
    // Nothing here yet, but maybe in the future
    this.props.toggleCheckedItem(itemId);
  }
}

export default Main;
