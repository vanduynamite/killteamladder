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

class CreateInvoice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemIdList: [],
      carcosaId: '',
      squareId: '',
      note: '',
    };
  }

  componentDidMount() {
    this.props.clearPathHistory();

    if (!this.props.checkedItems) return;
    const checkedItemsArray = Object.keys(this.props.checkedItems);

    this.setState({
      itemIdList: checkedItemsArray,
      carcosaId: '',
      squareId: '',
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

      this.props.newInvoice(
        Object.assign({}, this.state),
        this.props.history.push
      );
    }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') {
        this.setState({ [field]: e.target.value });
      }
    };
  }

  formValid() {
    if (!this.state.itemIdList) return false;
    if (this.state.itemIdList.length === 0) return false;

    return true;
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;

    const cancelButtonLink = '/ordermaster/invoice';

    return (
      <div className='frame'>
        <h1>Create invoice</h1>
        { this.errorSection() }
        <h2>Items to invoice</h2>
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
    const carcosaIdEl = <Field ctx={this}
      fieldName={'carcosaId'}
      label={'Carcosa order ID (override)'}
      maxLength='10' />;

    const squareIdEl = <Field ctx={this}
      fieldName={'squareId'}
      label='Square ID'
      maxLength='7' />;

    const noteEl = <Field ctx={this}
      fieldName={'note'}
      label='Note'
      maxLength='256' />;

    return (
      <div className='new-item-fields'>
        {carcosaIdEl}
        {squareIdEl}
        {noteEl}
      </div>
    );
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

export default CreateInvoice;
