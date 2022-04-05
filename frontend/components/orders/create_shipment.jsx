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

class CreateShipment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemIdList: [],
      distributorId: 'x',
      distributorInvoice: '',
      trackingNum: '',
      note: '',
    };
  }

  componentDidMount() {
    this.props.clearPathHistory();

    if (!this.props.checkedItems) return;
    const checkedItemsArray = Object.keys(this.props.checkedItems);

    this.setState({
      itemIdList: checkedItemsArray,
      distributorId: 'x',
      distributorInvoice: '',
      trackingNum: '',
      note: '',
    });
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      if (this.state.note !== '') {
        this.props.newItemNotes(
          Object.assign({}, this.state),
          this.props.history.push
        );
      }

      this.props.newShipment(
        Object.assign({}, this.state),
        this.props.history.push
      );
    }
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.state.itemIdList) return false;
    if (this.state.itemIdList.length === 0) return false;

    return true;
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;

    const cancelButtonLink = '/ordermaster/ship';

    return (
      <div className='frame'>
        <h1>Create shipment</h1>
        { this.errorSection() }
        <h2>Items to ship</h2>
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
        users={this.props.users}
        currentUser={this.props.currentUser} />;
    });
  }

  itemFields() {
    const trackingNumEl = <Field ctx={this}
      fieldName={'trackingNum'}
      label={'Tracking number'}
      maxLength='256' />;

    const distributorIdEl = <SelectList ctx={this}
      fieldName={'distributorId'}
      label='Distributor'
      optionsList={this.distributorList()} />;

    const distributorInvoiceEl = <Field ctx={this}
      fieldName={'distributorInvoice'}
      label='Distributor invoice'
      maxLength='256' />;

    const noteEl = <Field ctx={this}
      fieldName={'note'}
      label='Note'
      maxLength='256' />;

    return (
      <div className='new-item-fields'>
        {trackingNumEl}
        {distributorIdEl}
        {distributorInvoiceEl}
        {noteEl}
      </div>
    );
  }

  distributorList() {
    const distributors = Object.values(this.props.distributors);
    const result = distributors.map(dist => [dist.id, dist.name]);
    result.sort((a,b) => a[1] <= b[1] ? -1 : 1);
    result.unshift(['x', 'Select a distributor']);
    return result;
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

export default CreateShipment;
