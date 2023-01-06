import React from 'react';
import ButtonLink from '../general/button_link';
import EmptyDiv from '../general/empty_div';
import FloatingImageButton from '../general/floating_image_button';
import ImageActionButton from '../general/image_action_button';
import ListItem from './list_item';
import TextActionButton from '../general/text_action_button';
import {Link} from 'react-router-dom';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupIdField: this.props.screenData.initialGroupIdField,
    };
  }

  componentDidMount() {
    this.props.clearPathHistory();
    this.props.clearCheckedItems();
    this.props.getItems();
    this.setState({
      groupIdField: this.props.screenData.initialGroupIdField,
    });
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
    if (itemList.length === 0) {
      if (!this.props.currentUser.ordermaster) {
        return (
          <>
            <h2>Nothing to see here!</h2>
            <span>Order something by clicking the + at the bottom right!</span>
          </>
        );
      } else {
        return <h2>Hello Ordermaster. This screen is empty! Good job! Or order something, I dunno what screen this is.</h2>;
      }
    }
    return itemList;
  }

  getGroupsToDisplay() {
    const items = this.props.items;
    const groupIdField = this.state.groupIdField;

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
        fullWidth={this.props.screenData.fullWidthItems}
        users={users}
        currentUser={this.props.currentUser} />;
    });

    const groupKey = itemArray[0][this.state.groupIdField];
    const groupName = this.getGroupName(this.state.groupIdField, groupKey);

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
    return (
      <>
        <div className='ordermaster-nav'>{buttons}</div>
        { this.groupings() }
      </>
    );
  }

  groupings() {
    const possibleGroups = [
      {text: 'Status', field: 'statusId'},
      {text: 'Distributor', field: 'distributorId'},
      {text: 'Person', field: 'userId'},
    ];

    const buttonMappingCb = (button) => {
      const className = this.state.groupIdField === button.field ?
      'submit-deactive' :
      'submit-active';

      return <TextActionButton 
        action={this.changeGrouping.bind(this, button.field)}
        className={className}
        text={button.text}
      />
    };

    const buttons = possibleGroups.map(buttonMappingCb);

    return <div className='ordermaster-group-filter'>
      {buttons}
      <ImageActionButton
        action={this.toggleFilters} 
        className={'filter-img-button'}
        image={window.filter} 
      />
    </div>;
  }

  changeGrouping(field) {
    this.setState({
      groupIdField: field,
    });
  }

  toggleFilters() {
    // Doesn't do anything yet but I wanted to submit this
    console.log('toggle me softly');
  }

  maybeToggleCheckedItem(itemId) {
    // Nothing here yet, but maybe in the future
    this.props.toggleCheckedItem(itemId);
  }
}

export default Main;
