import React from 'react';
import ListItem from './list_item';
import EmptyDiv from '../general/empty_div';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import FloatingActionButton from '../general/floating_action_button';
import ImageActionButton from '../general/image_action_button';
import Checkbox from '../general/checkbox';

class EditOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemIdList: [],
      name: '',
      quantity: '',
      note: '',
      purchasedInStore: false,
      statusId: 'x',
      distributorId: 'x',
      itemCode: '',
    };
  }

  componentDidMount() {
    this.props.clearPathHistory();

    if (this.props.getDistributors) this.props.getDistributors();

    if (!this.props.checkedItems) return;
    const checkedItemsArray = Object.keys(this.props.checkedItems);

    this.setState({
      itemIdList: checkedItemsArray,
      name: '',
      quantity: '',
      note: '',
      purchasedInStore: false,
      statusId: 'x',
      distributorId: 'x',
      itemCode: '',
    });
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {

      // check for new notes

      if (this.state.note !== '') {
        this.props.newItemNotes(
          Object.assign({}, this.state),
          this.props.history.push
        );
      }

      if (this.state.name !== '' ||
          this.state.quantity !== '' ||
          this.state.statusId !== 'x' ||
          this.state.distributorId !== 'x' ||
          this.state.itemCode !== '') {
        this.props.editItems(
          Object.assign({}, this.state),
          this.props.history.push
        );
      }
    }
  }

  updateField(field) {
    return e => {
      if (field.startsWith('quantity')) {
        const val = e.target.value;
        if (val !== '') {
          if (!Number.isInteger(val * 1)) return;
          if (val * 1 <= 0) return;
        }
      }
      if (field === 'purchasedInStore') {
        this.setState({purchasedInStore: !this.state.purchasedInStore});
        return;
      }
      if (e.target.value !== 'x') {
        this.setState({ [field]: e.target.value });
      }
    };
  }

  formValid() {
    if (!this.state.itemIdList) return false;
    if (this.state.itemIdList.length === 0) return false;
    if (this.state.name === '' &&
        this.state.quantity === '' &&
        this.state.note === '' &&
        this.state.statusId === 'x' &&
        this.state.distributorId === 'x' &&
        this.state.itemCode === '') {
          return false;
        }
    const qty = this.state.quantity;
    if (qty !== '' &&
        (!Number.isInteger(qty * 1) || qty * 1 < 0)) {
          return false;
        }
    return true;
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;

    const cancelButtonLink = this.props.currentUser.ordermaster ?
      '/ordermaster/' : '/orders/';

    return (
      <div className='frame'>
        <h1>Edit orders</h1>
        { this.errorSection() }
        <h2>Items to update</h2>
        {this.itemList()}
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />
          <div className='inputs'>
            {this.itemFields()}
          </div>
          <div className='form-buttons'>
            <ButtonLink text='Cancel' path={cancelButtonLink} type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  itemList() {
    if (!this.state.itemIdList) return <EmptyDiv/>;

    return this.state.itemIdList.map((itemId) => {
      const item = this.props.items[itemId];
      return <ListItem
        key={itemId}
        item={item}
        distributor={this.props.distributors[item.distributorId]}
        invoice={this.props.invoices[item.invoiceId]}
        notes={this.props.notes}
        checked={false}
        fullWidth={true}
        users={this.props.users}
        currentUser={this.props.currentUser} />;
    });
  }

  itemFields() {
    const nameEl = <Field ctx={this}
      fieldName={'name'}
      label={'Item name'}
      maxLength='256'
      extraClasses={'item-name'}/>;

    const quantityEl = <Field ctx={this}
      fieldName={'quantity'}
      label='Qty'
      maxLength='2'
      type='text'
      extraClasses={'item-qty'}/>;

    const noteEl = <Field ctx={this}
      fieldName={'note'}
      label='Note'
      maxLength='256' />;

    let distributorEl = <EmptyDiv/>;
    if (this.props.currentUser.ordermaster) {
      distributorEl = <SelectList ctx={this}
        fieldName={'distributorId'}
        label={'Distributor'}
        optionsList={this.getDistributorList()} />;
    }

    const statusList = this.getStatusList();
    let statusEl = <EmptyDiv/>;

    if (statusList.length > 1) {
      statusEl = <SelectList ctx={this}
        fieldName={'statusId'}
        label='Status'
        optionsList={statusList} />;
    }

    const purchasedInStoreEl = <Checkbox ctx={this}
      fieldName='purchasedInStore'
      label='Took off the shelf' />;

    return (
      <div className='new-item-fields'>
        <div className='name-inputs'>
          {nameEl}
          {quantityEl}
        </div>
        {noteEl}
        {distributorEl}
        {statusEl}
        {purchasedInStoreEl}
      </div>
    );
  }

  getDistributorList() {
    const distributorList = [['x', 'Choose a distributor']];

    Object.values(this.props.distributors).forEach((distributor) => {
      distributorList.push([distributor.id, distributor.name]);
    });

    return distributorList;
  }

  getStatusList() {
    const statusList = [['x','Choose a status']];

    const items = this.props.items;
    const orderStatuses = this.props.orderStatuses;
    const changeLinks = this.props.changeLinks;

    const statusIds = {};
    this.state.itemIdList.map((itemId) => {
      const statusId = this.props.items[itemId].statusId;
      if (!statusIds[statusId]) {
        const toStatuses = {};
        orderStatuses[statusId].changeLinkIds.forEach((id) => {
          const changeLink = changeLinks[id];
          if (changeLink) {
            const toStatus = orderStatuses[changeLink.toStatusId];
            toStatuses[toStatus.id] = toStatus;
          }
        });
        statusIds[statusId] = toStatuses;
      }
    });

    const statusIdsArray = Object.values(statusIds);
    if (statusIdsArray.length === 0) return statusList;

    const seedStatus = Object.values(statusIdsArray.pop());
    seedStatus.forEach((status) => {
      // see if this status is in all the other statuses
      let statusPresent = true;
      for (let i = 0; i < statusIdsArray.length; i++) {
        const statusListToCheck = statusIdsArray[i];
        if (!statusListToCheck[status.id]) {
          statusPresent = false;
          break;
        }
      }
      if (statusPresent) statusList.push([status.id, status.name]);
    });

    // dang what's the O(n) on this
    return statusList;
  }

  errorSection() {
    const errors = Object.values(this.props.errors);

    if (errors.length === 0) {
      return;
    } else {
      return (<div id='errors'>{ errors }</div>);
    }
  }
}

export default EditOrder;
