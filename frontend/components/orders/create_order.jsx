import React from 'react';
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
    this.state = {};
  }

  componentDidMount() {
    this.props.clearPathHistory();
    this.setState({
      numberOfItems: 1,
      qty0: 1,
      name0: '',
      purchasedInStore: false,
      nonmemberPurchase: false,
      nonmemberEmail: '',
    });
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      this.props.newItems(
        Object.assign({}, this.state),
        this.props.history.push
      );
    }
  }

  updateField(field) {
    return e => {
      if (field.startsWith('qty')) {
        const val = e.target.value;
        if (!Number.isInteger(val * 1)) return;
        if (val * 1 < 0) return;
        if (val === '0') return;
      }
      if (field === 'purchasedInStore') {
        // If non-member purchase, it must be picked up in store.
        if (this.state.nonmemberPurchase) return;

        this.setState({purchasedInStore: !this.state.purchasedInStore});
        return;
      }
      if (field === 'nonmemberPurchase') {
        const previousState = this.state.nonmemberPurchase;
        this.setState({
          purchasedInStore: !previousState,
          nonmemberPurchase: !previousState,
          nonmemberEmail: '',
        });
        return;
      }
      if (e.target.value !== 'x') {
        this.setState({ [field]: e.target.value });
      }
    };
  }

  formValid() {
    for (let i = 0; i < this.state.numberOfItems; i++) {
      const nameField = `name${i}`;
      const qtyField = `qty${i}`;

      if (this.state[nameField] === '') return false;
      if (this.state[qtyField] === '') return false;
      if (!Number.isInteger(this.state[qtyField] * 1)) return false;
      if (this.state[qtyField] * 1 < 0) return false;
      if (this.state[qtyField] === '0') return false;
    }
    if (this.state.nonmemberPurchase) {
      if (!this.state.purchasedInStore) return false;
      if (!this.state.nonmemberEmail) return false;
    }
    return true;
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;

    const itemInputs = [];
    for (let i = 0; i < this.state.numberOfItems; i++) {
      itemInputs.push(this.itemFields(i));
    }

    const newItemBtn = this.formValid() ?
      <FloatingActionButton action={this.addItem.bind(this)} image={window.add} /> :
      <EmptyDiv/>;

    const cancelButtonLink = this.props.currentUser.ordermaster ?
      '/ordermaster/' : '/orders/';

    return (
      <div className='frame'>
        <h1>New order</h1>
        { this.errorSection() }
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />
          <div className='inputs'>
            {itemInputs}
          </div>
          <Checkbox fieldName='purchasedInStore' label='Picked up in store' ctx={this} />
          <Checkbox fieldName='nonmemberPurchase' label='Non-member purchase' ctx={this} />
          { this.nonmemberPurchaseSection() }
          <div className='form-buttons'>
            <ButtonLink text='Cancel' path={cancelButtonLink} type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
        {newItemBtn}
      </div>
    );
  }
  
  itemFields(number) {
    const qty = `qty${number}`;
    const name = `name${number}`;
    const note = `note${number}`;
    
    const noteEl = this.state[note] !== undefined ?
    <Field fieldName={note} label='Note' maxLength='256' ctx={this} /> :
    <div onClick={this.addNote.bind(this, number)} className='item-note'>Add note</div>;
    
    const showDelete = number !== 0 && number === this.state.numberOfItems - 1;
    const deleteButton = showDelete ?
    <ImageActionButton action={this.deleteLastItem.bind(this)} image={window.close} /> :
    <EmptyDiv/>;
    
    return (
      <div className='new-item-fields' key={number}>
        <div className='name-inputs'>
          <Field fieldName={name} label={`Item ${number + 1}`}
            maxLength='256' ctx={this} extraClasses={'item-name'}/>
          <Field fieldName={qty} label='Qty'
          maxLength='2' ctx={this} type='text' extraClasses={'item-qty'}/>
          {deleteButton}
        </div>
        {noteEl}
      </div>
    );
  }
  
  addNote(number) {
    const fieldName = `note${number}`;
    this.setState({[fieldName]: ''});
  }
  
  addItem() {
    const numberOfItems = this.state.numberOfItems;
    const nameField = `name${numberOfItems}`;
    const qtyField = `qty${numberOfItems}`;
    
    this.setState({
      numberOfItems: numberOfItems + 1,
      [nameField]: '',
      [qtyField]: 1,
    });
  }
  
  deleteLastItem() {
    const numberOfItems = this.state.numberOfItems - 1;
    const nameField = `name${numberOfItems}`;
    const qtyField = `qty${numberOfItems}`;
    const noteField = `note${numberOfItems}`;
    
    this.setState({
      numberOfItems: numberOfItems,
      [nameField]: undefined,
      [qtyField]: undefined,
      [noteField]: undefined,
    });
  }
  
  nonmemberPurchaseSection() {
    if (this.state.nonmemberPurchase) {
      return (
        <div className='inputs'>
          <h3>Non-members may only pick up in store and do not get the member discount!</h3>
          <h3>Enter the email address to invoice. If the invoice is not paid in a timely manner,
            the member on submitting this order will be responsible for paying.
          </h3>
          <Field fieldName='nonmemberEmail' label='Email to invoice' maxLength='256' ctx={this} />
        </div>
      );
    }
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

export default CreateOrder;
