json.invoices do
  json.set! invoice.id do
    json.id invoice.id
    json.carcosaId invoice.carcosa_id
    json.squareId invoice.square_id
  end
end
