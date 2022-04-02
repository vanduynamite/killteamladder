import * as InvoiceAPI from '../util/invoice_api_util';

export const RECEIVE_INVOICE = 'RECEIVE_INVOICE';
export const RECEIVE_INVOICE_ERRORS = 'RECEIVE_INVOICE_ERRORS';

const receiveInvoice = (data) => {
  return {
    type: RECEIVE_INVOICE,
    invoices: data.invoices,
    orderItems: data.orderItems,
  };
};

const receiveInvoiceErrors = (errors) => {
  return {
    type: RECEIVE_INVOICE_ERRORS,
    errors: errors,
  };
};

export const newInvoice = (invoice, historyPush, path) => (dispatch) => {
  return InvoiceAPI.newInvoice(invoice).then(
    (payload) => {
      dispatch(receiveInvoice(payload));
      if (historyPush) historyPush(path);
    },
    (errors) => dispatch(receiveInvoiceErrors(errors))
  );
};
