# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Team.delete_all

# t1 = Team.first
# t2 = Team.third
#
# m1 = t1.matchups.new(
#   result: -1,
# )
#
# m2 = t2.matchups.new(
#   result: m1.result * -1,
#   opposite_matchup: m1,
# )
#
# m1.opposite_matchup = m2
#
# m1.calculate_end_points!
# m2.calculate_end_points!
#
# t1.points = m1.end_points
# t2.points = m2.end_points
#
# m1.save
# m2.save
# t1.save
# t2.save
#
# # p m1, m2, t1, t2
# code = {
#   -1 => 'loses',
#   0 => 'ties',
#   1 => 'wins'
# }
# puts "\n\n\n"
# puts "Match between T1: #{m1.start_points} and T2: #{m2.start_points}"
# puts "T1 #{code[m1.result]} and T2 #{code[m2.result]}"
# puts "Final scores:"
# puts "   T1: #{m1.end_points} (#{t1.points})"
# puts "   T2: #{m2.end_points} (#{t2.points})"
