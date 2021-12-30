json.changeLinks do
  json.set! status_change.id do
    json.id status_change.id
    json.fromStatusId status_change.order_status_id_from
    json.toStatusId status_change.order_status_id_to
    json.ordermasterOnly status_change.ordermaster_only
  end
end
