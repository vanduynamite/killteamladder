json.orderStatuses do
  json.set! status.id do
    json.id status.id
    json.name status.name
    json.searchName status.search_name
    json.sortNum status.sort_num
    json.complete status.complete
    json.changeLinkIds status.acceptable_status_change_links.pluck(:id)
  end
end
