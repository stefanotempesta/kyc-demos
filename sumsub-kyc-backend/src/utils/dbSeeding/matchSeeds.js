const mongoose = require("mongoose");
const { Match } = require("../../models");
const config = require("../../config/EnvConfig");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  seedMatch();
});

const matches = [
  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Welterweight / Main Event",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "Main",
    time: "7:00 PM PST",
    fighter_1: "Conor McGregor",
    fighter_2: "Michael Chandler",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Light Heavyweight / Co-main",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "Main",
    time: "7:00 PM PST",
    fighter_1: "Jamahal Hill",
    fighter_2: "Carlos Ulberg",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Women Bantamweight",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "Main",
    time: "7:00 PM PST",
    fighter_1: "Mayra Bueno Silva",
    fighter_2: "Macy Chiasson",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Middleweight Bout",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "prelim",
    time: "5:00PM PST",
    fighter_1: "Joe Pyfer",
    fighter_2: "Marc-Andre Barriault",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Welterweight Bout",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "prelim",
    time: "5:00PM PST",
    fighter_1: "Ian Machado Garry",
    fighter_2: "Michael Page",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Featherweight",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "prelim",
    time: "5:00PM PST",
    fighter_1: "Cub Swanson",
    fighter_2: "Andre Fili",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },

  {
    date: "2024-06-29",
    promotion: "UFC",
    event: "303",
    match_name: "Feather Weight",
    match_venue: "T-Mobile Arena, Las Vegas United States",
    match_status: "Pending",
    pick_locked: "true",
    main_or_prelim: "prelim",
    time: "5:00PM PST",
    fighter_1: "Charles Jourdain",
    fighter_2: "Jean Silva",

    rematch: null,
    winner: null,
    method: null,
    round: null,
    card_placement: null,
    fighting_tomatoes_aggregate_rating: null,
    fighting_tomatoes_number_ratings: null,
  },
];

const seedMatch = async () => {
  try {
    await Match.insertMany(matches);
    console.log("New matches inserted.");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};
