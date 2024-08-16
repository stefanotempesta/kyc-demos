const mongoose = require("mongoose");
const { Fighter } = require("../../models");
const config = require("../../config/EnvConfig");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  seedFighters();
});

const fighters = [
  {
    name: "Conor McGregor",
    country: "Ireland",
    nick_name: "THE NOTORIOUS",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png",
  },

  {
    name: "Michael Chandler",
    country: "United States",
    nick_name: "IRON",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2022-05/1dd9466e-5d52-4a1d-8af9-201e9af35e6a%252FCHANDLER_MICHAEL_L_05-07.png",
  },
  {
    name: "Jamahal Hill",
    country: "United States",
    nick_name: "SWEET DREAMS",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-06/HILL_JAMAHAL_L_04-13.png",
  },
  {
    name: "Carlos Ulberg",
    country: "New Zealand",
    nick_name: "BLACK JAG",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-06/ULBERG_CARLOS_L_05-11.png",
  },
  {
    name: "Mayra Bueno Silva",
    country: "Brazil",
    nick_name: "SHEETARA",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-01/BUENO_SILVA_MAYRA_L_01-20.png",
  },
  {
    name: "Macy Chiasson",
    country: "United States",
    nick_name: "null",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/CHIASSON_MACY_L_03-16.png",
  },
  {
    name: "Joe Pyfer",
    country: "United States",
    nick_name: "BODYBAGZ",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-02/PYFER_JOE_L_10-07.png",
  },
  {
    name: "Marc-Andre Barriault",
    country: "Canada",
    nick_name: "POWERBAR",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-01/BARRIAULT_MARC-ANDRE_L_01-20.png",
  },
  {
    name: "Ian Machado Garry ",
    country: "Ireland",
    nick_name: "THE FUTURE",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-06/GARRY_IAN_L_05-13.png",
  },
  {
    name: "Michael Page",
    country: "England",
    nick_name: "VENOM",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-03/PAGE_MICHAEL_L_03-09.png",
  },
  {
    name: "Cub Swanson",
    country: "United States",
    nick_name: "null",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-08/SWANSON_CUB_L_08-12.png",
  },
  {
    name: "Andre Fill",
    country: "United States",
    nick_name: "TOUCHY",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-12/FILI_ANDRE_L_12-16.png",
  },
  {
    name: "Charles Jourdain",
    country: "Canada",
    nick_name: "AIR",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-01/JOURDAIN_CHARLES_L_01-20.png",
  },
  {
    name: "Jean Silva",
    country: "Brazil",
    nick_name: "LORD ASSASSIN",
    img_url:
      "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-05/SILVA_JEAN_L_05-04.png",
  },
];

const seedFighters = async () => {
  try {
    await Fighter.insertMany(fighters);
    console.log("New fighters inserted.");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};
