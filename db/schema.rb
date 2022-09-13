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

ActiveRecord::Schema.define(version: 2022_09_12_214048) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acceptable_status_changes", force: :cascade do |t|
    t.integer "order_status_id_from", null: false
    t.integer "order_status_id_to", null: false
    t.boolean "ordermaster_only", default: true, null: false
  end

  create_table "approved_emails", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "member", default: false, null: false
    t.boolean "admin", default: false, null: false
    t.boolean "order", default: false, null: false
    t.boolean "ordermaster", default: false, null: false
    t.boolean "unpacker", default: false, null: false
    t.boolean "ladder_admin", default: false, null: false
    t.boolean "ladder_40k", default: false, null: false
  end

  create_table "bb_advancements", force: :cascade do |t|
    t.string "name", null: false
    t.integer "rank", null: false
    t.integer "spp_cost", null: false
    t.integer "value_increase", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "requires_skill_id", default: false, null: false
    t.boolean "stat_upgrade", default: false, null: false
    t.boolean "random", default: false, null: false
    t.boolean "primary_skill", default: false, null: false
  end

  create_table "bb_player_advancements", force: :cascade do |t|
    t.integer "bb_player_id", null: false
    t.integer "bb_advancement_id", null: false
    t.integer "bb_skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_player_skill_groups", force: :cascade do |t|
    t.integer "bb_player_template_id", null: false
    t.integer "bb_skill_group_id", null: false
    t.boolean "primary", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_player_skills", force: :cascade do |t|
    t.integer "bb_player_id", null: false
    t.integer "bb_skill_id", null: false
    t.string "modifier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_player_template_skills", force: :cascade do |t|
    t.integer "bb_player_template_id", null: false
    t.integer "bb_skill_id", null: false
    t.string "modifier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_player_templates", force: :cascade do |t|
    t.integer "bb_team_template_id", null: false
    t.string "position_name", null: false
    t.integer "max_allowed", null: false
    t.integer "cost", null: false
    t.integer "ma", null: false
    t.integer "st", null: false
    t.integer "ag", null: false
    t.integer "pa"
    t.integer "av", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_players", force: :cascade do |t|
    t.integer "team_id", null: false
    t.integer "bb_player_template_id", null: false
    t.string "position_name", null: false
    t.string "name", null: false
    t.integer "number", null: false
    t.integer "ma_original", null: false
    t.integer "st_original", null: false
    t.integer "ag_original", null: false
    t.integer "pa_original", null: false
    t.integer "av_original", null: false
    t.integer "hiring_fee", null: false
    t.integer "current_value", null: false
    t.integer "ma_improvement", default: 0, null: false
    t.integer "st_improvement", default: 0, null: false
    t.integer "ag_improvement", default: 0, null: false
    t.integer "pa_improvement", default: 0, null: false
    t.integer "av_improvement", default: 0, null: false
    t.integer "spp", default: 0, null: false
    t.boolean "mng", default: false, null: false
    t.integer "ni", default: 0, null: false
    t.boolean "temporarily_retired", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_position_group_limits", force: :cascade do |t|
    t.string "name", null: false
    t.integer "max", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_position_groups", force: :cascade do |t|
    t.integer "bb_position_group_limits_id", null: false
    t.integer "bb_player_template_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_skill_groups", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_skills", force: :cascade do |t|
    t.integer "bb_skill_group_id", null: false
    t.string "name", null: false
    t.text "description"
    t.boolean "must_use", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_special_rules", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_team_special_rules", force: :cascade do |t|
    t.integer "bb_special_rule_id", null: false
    t.integer "bb_team_template_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_team_templates", force: :cascade do |t|
    t.integer "faction_id", null: false
    t.integer "reroll_cost", null: false
    t.integer "tier", null: false
    t.boolean "apothecary", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bb_teams", force: :cascade do |t|
    t.integer "team_id", null: false
    t.integer "rerolls", default: 0, null: false
    t.integer "dedicated_fans", default: 1, null: false
    t.integer "treasury", default: 1000000, null: false
    t.integer "team_value", default: 0, null: false
    t.integer "current_team_value", default: 0, null: false
    t.integer "assistant_coaches", default: 0, null: false
    t.integer "cheerleaders", default: 0, null: false
    t.integer "apothecaries", default: 0, null: false
  end

  create_table "distributors", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "search_name"
    t.index ["name"], name: "index_distributors_on_name", unique: true
  end

  create_table "factions", force: :cascade do |t|
    t.string "faction_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ladder_name", null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.string "carcosa_id", null: false
    t.string "square_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["carcosa_id"], name: "index_invoices_on_carcosa_id", unique: true
    t.index ["square_id"], name: "index_invoices_on_square_id", unique: true
  end

  create_table "item_notes", force: :cascade do |t|
    t.string "note", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order_item_id", null: false
    t.integer "user_id", null: false
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

  create_table "order_items", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "quantity", default: 1, null: false
    t.string "name", null: false
    t.integer "status_id", null: false
    t.integer "invoice_id"
    t.integer "invoice_item_num"
    t.integer "distributor_id", null: false
    t.integer "shipment_id"
    t.boolean "purchased_in_store", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "item_code"
  end

  create_table "order_statuses", force: :cascade do |t|
    t.string "name", null: false
    t.integer "sort_num", null: false
    t.boolean "user_visible", default: true, null: false
    t.boolean "item_cancelable", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "search_name", null: false
    t.boolean "complete", default: false, null: false
    t.index ["name"], name: "index_order_statuses_on_name", unique: true
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

  create_table "shipments", force: :cascade do |t|
    t.string "tracking_num"
    t.integer "distributor_id", null: false
    t.string "distributor_invoice"
    t.date "received"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "status_changes", force: :cascade do |t|
    t.integer "order_item_id", null: false
    t.integer "old_status_id", null: false
    t.integer "new_status_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.boolean "ordermaster", default: false, null: false
    t.boolean "receive_daily_email", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
