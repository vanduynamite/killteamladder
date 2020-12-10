# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_10_071637) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "approved_emails", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "factions", force: :cascade do |t|
    t.string "faction_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ladder_name", null: false
  end

  create_table "ladders", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "matchups", force: :cascade do |t|
    t.integer "team_id", null: false
    t.integer "start_points", null: false
    t.integer "end_points", null: false
    t.integer "result", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "matchup_id"
    t.integer "season", default: 1, null: false
    t.index ["season"], name: "index_matchups_on_season"
    t.index ["team_id"], name: "index_matchups_on_team_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "season", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ladder_name"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_sessions_on_token"
  end

  create_table "teams", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "faction", null: false
    t.string "team_name", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "points", default: 0, null: false
    t.string "ladder_name", null: false
    t.integer "faction_id", null: false
    t.index ["ladder_name"], name: "index_teams_on_ladder_name"
    t.index ["team_name"], name: "index_teams_on_team_name", unique: true
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "pw_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.boolean "authorized_2020_league", default: false, null: false
    t.boolean "admin", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
