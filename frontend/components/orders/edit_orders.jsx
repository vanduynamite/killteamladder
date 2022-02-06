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

class CreateOrder extends React.Component {

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

      this.props.editItems(
        Object.assign({}, this.state),
        this.props.history.push
      );
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

    return (
      <div className='frame'>
        <h1>Edit orders</h1>
        <h2>Items to update</h2>
        {this.itemList()}
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />
          <div className='inputs'>
            {this.itemFields()}
          </div>
          <div className='form-buttons'>
            <ButtonLink text='Cancel' path='/orders/' type='cancel' />
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

    const noteEl = <Field  ctx={this}
      fieldName={'note'}
      label='Note'
      maxLength='256' />;

    const purchasedInStoreEl = <Checkbox ctx={this}
      fieldName='purchasedInStore'
      label='Purchased in store' />;

    return (
      <div className='new-item-fields'>
        <div className='name-inputs'>
          {nameEl}
          {quantityEl}
        </div>
        {noteEl}
        {purchasedInStoreEl}
      </div>
    );
  }

}

export default CreateOrder;
