
@distributors.each do |distributor|
  json.partial! 'api/distributors/distributor_basic.json.jbuilder', distributor: distributor
end
