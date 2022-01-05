import React from 'react';
import EmptyDiv from '../general/empty_div';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import FloatingActionButton from '../general/floating_action_button';
import ImageActionButton from '../general/image_action_button';

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
    });
    // Keeping this for a bit for testing purposes
    // this.setState({
    //   numberOfItems: 3,
    //   qty0: 1,
    //   name0: 'item 1',
    //   note0: 'note 1',
    //   qty1: 2,
    //   name1: 'item 2',
    //   qty2: 3,
    //   name2: 'item 3',
    //   note2: 'note 3',
    // });
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
    return true;
  }

  render() {
    if (!this.props.loggedIn) return <EmptyDiv/>;
    console.log(this.state);
    const itemInputs = [];
    for (let i = 0; i < this.state.numberOfItems; i++) {
      itemInputs.push(this.itemFields(i));
    }

    const newItemBtn = this.formValid() ?
      <FloatingActionButton action={this.addItem.bind(this)} image={window.add} /> :
      <EmptyDiv/>;

    return (
      <div className='frame'>
        <h1>New order</h1>
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />
          <div className='inputs'>
            {itemInputs}
          </div>
          <div className='form-buttons'>
            <ButtonLink text='Cancel' path='/orders/' type='cancel' />
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

}

export default CreateOrder;
