# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Matchup.delete_all
Team.delete_all
Session.delete_all
User.delete_all

users = []
user_names = [
  "Andrew",
  "Arash",
  "Daniel",
  "Dave",
  "David",
  "George",
  "Isaac",
  "James",
  "Joshua",
  "Kevin",
  "Mike",
  "Nicholas",
  "Paul",
  "Ricky",
  "Rob",
  "Tom",
  "Ronny",
  "McLeod",
  "Milan",
  "Joey",
]

user_names.each_with_index do |name, i|
  users << User.create(
    email: "#{name.downcase}@carcosa.com",
    first_name: "#{name}",
    last_name: "LastName",
    password: "starwars",
  )
  users.last.save
  ApprovedEmail.create!(email: users.last.email)
end

FACTION_LIST = [
  'Adeptus Astartes',
  'Adeptus Mechanicus',
  'Astra Militarum',
  'Asuryani',
  'Death Guard',
  'Deathwatch',
  'Drukhari',
  'Elucidean Starstriders',
  'Gellerpox Infected',
  'Genestealer Cults',
  'Grey Knights',
  'Harlequins',
  'Heretic Astartes',
  'Necrons',
  'Orks',
  'Servants of the Abyss',
  'T\'au Empire',
  'Thousand Sons',
  'Tyranids',
]

teams = []
team_details = [
  ["Andrew's First Team", 0, "Adeptus Astartes"],
  ["Arash's First Team", 1, "Adeptus Astartes"],
  ["Daniel's First Team", 2, "Adeptus Astartes"],
  ["Dave's First Team", 3, "Adeptus Astartes"],
  ["David's First Team", 4, "Adeptus Astartes"],
  ["George's First Team", 5, "Adeptus Astartes"],
  ["Isaac's First Team", 6, "Adeptus Mechanicus"],
  ["James's First Team", 7, "Adeptus Astartes"],
  ["Joshua's First Team", 8, "Tyranids"],
  ["Kevin's First Team", 9, "Adeptus Astartes"],
  ["Mike's First Team", 10, "Adeptus Astartes"],
  ["Nicholas's First Team", 11, "Adeptus Astartes"],
  ["Paul's First Team", 12, "Genestealer Cults"],
  ["Ricky's First Team", 13, "Adeptus Astartes"],
  ["Rob's First Team", 14, "Adeptus Astartes"],
  ["Tom's First Team", 15, "Adeptus Astartes"],
  ["Ronny's First Team", 16, "Adeptus Astartes"],
  ["McLeod's First Team", 17, "Adeptus Astartes"],
  ["Milan's First Team", 18, "Adeptus Astartes"],
  ["Joey's First Team", 19, "Adeptus Astartes"],
  ["Daniel's Second Team", 2, "Asuryani"],
  ["David's Second Team", 4, "Elucidean Starstriders"],
  ["George's Second Team", 5, "Grey Knights"],
  ["Isaac's Second Team", 6, "Grey Knights"],
  ["James's Second Team", 7, "Drukhari"],
  ["Joshua's Second Team", 8, "Genestealer Cults"],
  ["Nicholas's Second Team", 11, "Death Guard"],
  ["Ricky's Second Team", 13, "Death Guard"],
  ["Rob's Second Team", 14, "Death Guard"],
  ["Tom's Second Team", 15, "Death Guard"],
  ["McLeod's Second Team", 17, "Death Guard"],
  ["Isaac's Third Team", 6, "Necrons"],
  ["Rob's Third Team", 14, "Servants of the Abyss"],
  ["Rob's Fourth Team", 14, "Thousand Sons"],
]

team_details.each_with_index do |team, i|
  teams << users[team[1]].teams.new(
    faction: team[2],
    team_name: team[0],
  )
  teams.last.points = 1000
  teams.last.save
end

matchup_team1 = [0,1,2,2,2,2,2,2,3,3,4,4,5,5,5,6,6,6,6,6,7,7,7,8,8,8,8,8,8,9,10,10,12,12,12,12,12,13,13,13,13,13,13,14,14,14,14,14,14,14,14,15,15,16,17,17,17,18,18,18,18,19,20,20,21,21,21,22,22,22,22,22,24,24,25,25,26,26,27,27,27,27,28,28,28,28,28,28,28,28,29,29,30,30,31,31,32,33,33,33]
matchup_team2 = [10,28,6,8,15,23,29,33,21,25,14,20,11,17,23,8,12,18,27,28,14,23,28,3,5,12,20,22,28,27,8,25,4,8,15,15,25,3,10,17,22,24,32,0,1,6,11,12,22,23,25,4,6,27,19,23,27,12,13,13,17,18,10,31,13,14,28,8,10,12,13,26,21,33,15,19,0,9,0,9,9,23,1,6,7,8,12,23,29,31,11,28,13,32,29,30,7,9,13,30]
result_team1 = [1,1,1,-1,-1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,1,-1,-1,1,1,1,1,1,-1,-1,1,1,1,-1,-1,1,-1,1,-1,1,1,1,-1,1,1,1,1,1,1,1,-1,1,-1,1,1,1,1,1,1,-1,-1,-1,0,1,-1,-1,1,0,-1,-1,1,1,0,1,1,1,1,-1,1,-1,1,-1,-1,1,-1,-1,-1,-1,1,1,1,1,1,1,-1,-1,-1,1,1]

(0...matchup_team1.length).each do |i|
  team1 = teams[matchup_team1[i]]
  team2 = teams[matchup_team2[i]]
  result1 = result_team1[i]

  matchup1 = team1.matchups.new(
    result: result1,
  )

  matchup2 = team2.matchups.new(
    result: result1 * -1,
    opposite_matchup: matchup1,
  )

  matchup1.opposite_matchup = matchup2

  matchup1.calculate_end_points!
  matchup2.calculate_end_points!

  team1.points = matchup1.end_points
  team2.points = matchup2.end_points

  matchup1.save
  matchup2.save
  team1.save
  team2.save

end
