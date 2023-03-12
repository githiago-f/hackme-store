import {rootLogger} from "../../../logging/root-logger.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  const cardTable = 'card_data';
  const ordersTable = 'orders';
  const table = 'users';
  const productsTable = 'products';

  await knex(ordersTable).del();
  await knex(cardTable).del();
  await knex(table).del();
  await knex(productsTable).del();

  const products = await knex(productsTable).insert([
    {
      "product_name": "dolore id duis irure",
      "product_price": 23.48,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP'),
      "description": "<h2>Consequat cillum mollit</h2> sunt eu elit nisi aliqua ad enim sint. Dolor proident labore qui excepteur commodo in. Deserunt enim magna tempor nisi aliquip sunt. Sunt irure ea in amet commodo dolor sunt ex occaecat consequat reprehenderit velit. Mollit ipsum ad tempor culpa irure exercitation mollit elit anim laboris sunt culpa aliquip in."
    },
    {
      "product_name": "consequat anim incididunt id",
      "product_price": 162.07,
      "description": "<h2>Consequat cillum mollit</h2>Sunt quis in nisi irure ipsum duis. Et incididunt dolore deserunt eiusmod duis dolor aute in deserunt labore. Incididunt deserunt labore elit do et cillum esse laborum labore irure dolore amet sit proident. Et consectetur aliqua nisi sunt aliquip esse nisi culpa nisi reprehenderit deserunt eiusmod do. Consectetur elit nisi enim deserunt irure Lorem culpa incididunt dolore enim officia."
    },
    {
      "product_name": "eu aliqua reprehenderit deserunt",
      "product_price": 45.93,
      "description": "Amet labore dolore eiusmod elit aliquip veniam eu dolore laborum. Magna cillum duis commodo commodo ea laborum. Sint ad consectetur adipisicing ut qui et adipisicing ex commodo nisi sunt eu. Elit elit commodo eiusmod occaecat veniam proident incididunt reprehenderit velit qui. Qui officia aliqua nostrud elit do aute."
    },
    {
      "product_name": "et commodo anim voluptate",
      "product_price": 43.48,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP'),
      "description": "Consectetur aute ullamco magna non eu quis dolor duis excepteur. Ipsum anim voluptate cupidatat labore non id amet eu fugiat culpa officia et occaecat. Consectetur eiusmod elit occaecat cillum occaecat sunt consectetur. Proident pariatur non aliquip fugiat enim non dolor est sint minim. Ut Lorem proident fugiat ullamco et fugiat labore ad cupidatat tempor."
    },
    {
      "product_name": "ad dolor nostrud culpa",
      "product_price": 38.68,
      "description": "Pariatur duis nulla quis dolore Lorem minim anim. Proident sint esse consequat officia. Commodo do sint amet dolore laboris irure consectetur consectetur aliquip deserunt cillum aliquip veniam ullamco. Ex id ex ex deserunt est id nulla laborum ullamco aliquip magna irure ea fugiat. Officia labore consectetur eiusmod excepteur pariatur sint laborum."
    },
    {
      "product_name": "magna officia id ullamco",
      "product_price": 60.11,
      "description": "Consectetur laborum et ipsum elit esse id laboris officia <b>laboris</b>quis in deserunt in labore. Elit dolore qui aliquip laboris. Sunt incididunt velit amet cillum consequat tempor minim nisi. Duis qui eu ut sunt Lorem tempor proident non quis fugiat labore minim. Aliqua eu incididunt duis ex nostrud et aute ad nulla."
    },
    {
      "product_name": "reprehenderit et exercitation et",
      "product_price": 166.67,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP'),
      "description": "Eiusmod est labore laboris aute<b>laboris</b> nulla ex culpa deserunt velit. Id fugiat ipsum amet tempor ullamco mollit aliquip laborum enim. Ex sunt non in pariatur dolor dolore esse irure. Cupidatat mollit ut ipsum commodo nisi ea ad et minim anim incididunt incididunt velit. Dolore ad ex laboris velit ad in adipisicing."
    },
    {
      "product_name": "eu voluptate eu exercitation",
      "product_price": 145.78,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP'),
      "description": "Culpa eiusmod incididunt nisi <b>laboris</b> ex dolor fugiat. Minim fugiat laboris occaecat laboris cupidatat esse sint <b>laboris</b> non do ipsum eu elit ipsum. Aliquip reprehenderit sit dolor voluptate ea ex duis aliqua amet amet. Deserunt <b>laboris</b>in occaecat consectetur ut Lorem pariatur. Sit enim ipsum aute deserunt."
    },
    {
      "product_name": "Caneta",
      "product_price": 2.53,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP')
    },
    {
      "product_name": "commodo anim irure ea",
      "product_price": 16.14,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP')
    },
    {
      "product_name": "veniam duis officia cupidatat",
      "product_price": 23.13
    },
    {
      "product_name": "ipsum consectetur culpa duis",
      "product_price": 144.27
    },
    {
      "product_name": "ex non sint pariatur",
      "product_price": 145.74,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP')
    },
    {
      "product_name": "non consequat ut voluptate",
      "product_price": 124.12
    },
    {
      "product_name": "in laborum nisi ullamco",
      "product_price": 171.84
    },
    {
      "product_name": "nostrud quis sunt aute",
      "product_price": 26.11
    },
    {
      "product_name": "aliquip cupidatat pariatur non",
      "product_price": 151.72,
      "deletedAt": knex.raw('CURRENT_TIMESTAMP')
    },
    {
      "product_name": "non veniam aute exercitation",
      "product_price": 112.99
    }
  ]);

  const users  = await knex(table).insert([
      {
        "user_name": "Agnes",
        "user_email": "agnes_evans@gmail.com",
        "user_surname": "Evans",
        "user_password": "123456"
      },
      {
        "user_name": "Houston",
        "user_email": "houston_wooten@gmail.com",
        "user_surname": "Wooten",
        "user_password": "123456"
      },
      {
        "user_name": "Doris",
        "user_email": "doris_cole@gmail.com",
        "user_surname": "Cole",
        "user_password": "123456"
      },
      {
        "user_name": "Duncan",
        "user_email": "duncan_sosa@gmail.com",
        "user_surname": "Sosa",
        "user_password": "123456"
      },
      {
        "user_name": "Owen",
        "user_email": "owen_sykes@gmail.com",
        "user_surname": "Sykes",
        "user_password": "123456"
      },
      {
        "user_name": "Rosario",
        "user_email": "rosario_gross@gmail.com",
        "user_surname": "Gross",
        "user_password": "123456"
      },
      {
        "user_name": "Delia",
        "user_email": "delia_holder@gmail.com",
        "user_surname": "Holder",
        "user_password": "123456"
      },
      {
        "user_name": "Macdonald",
        "user_email": "macdonald_berger@gmail.com",
        "user_surname": "Berger",
        "user_password": "123456"
      },
      {
        "user_name": "Ball",
        "user_email": "ball_solomon@gmail.com",
        "user_surname": "Solomon",
        "user_password": "123456"
      },
      {
        "user_name": "Hogan",
        "user_email": "hogan_brady@gmail.com",
        "user_surname": "Brady",
        "user_password": "123456"
      }
    ]);

  const cards = await knex(cardTable).insert([
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "amex",
      "card_number": "9263824789816480",
      "card_cvv": "010",
      "card_holder": "Fisher Macias",
      "card_expiration_date": "11/2038"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "amex",
      "card_number": "3369170675992569",
      "card_cvv": "312",
      "card_holder": "Mcleod Odom",
      "card_expiration_date": "10/2039"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "discover",
      "card_number": "2965850673935553",
      "card_cvv": "606",
      "card_holder": "Ray Vang",
      "card_expiration_date": "5/2034"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "8386579979216704",
      "card_cvv": "653",
      "card_holder": "Alisha Atkins",
      "card_expiration_date": "1/2028"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "amex",
      "card_number": "4993335331065277",
      "card_cvv": "424",
      "card_holder": "Howell Craft",
      "card_expiration_date": "12/2024"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "5560963488446974",
      "card_cvv": "145",
      "card_holder": "Guerra Moss",
      "card_expiration_date": "8/2032"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "5834107527040886",
      "card_cvv": "358",
      "card_holder": "Genevieve Barr",
      "card_expiration_date": "11/2039"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "6497455813726545",
      "card_cvv": "119",
      "card_holder": "Peggy Abbott",
      "card_expiration_date": "8/2036"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "4183592192531967",
      "card_cvv": "358",
      "card_holder": "Carmella Acosta",
      "card_expiration_date": "12/2036"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "mastercard",
      "card_number": "2775198215641459",
      "card_cvv": "607",
      "card_holder": "Campos Conrad",
      "card_expiration_date": "7/2039"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "4786122611609598",
      "card_cvv": "845",
      "card_holder": "Samantha Kaufman",
      "card_expiration_date": "11/2025"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "discover",
      "card_number": "8888438122129140",
      "card_cvv": "572",
      "card_holder": "Lela Peck",
      "card_expiration_date": "3/2034"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "visa",
      "card_number": "4861568045838322",
      "card_cvv": "413",
      "card_holder": "Erna Jensen",
      "card_expiration_date": "7/2037"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "amex",
      "card_number": "3566043534970582",
      "card_cvv": "667",
      "card_holder": "Howe Terry",
      "card_expiration_date": "11/2029"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "6117775583196338",
      "card_cvv": "425",
      "card_holder": "Doris Hubbard",
      "card_expiration_date": "12/2029"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "visa",
      "card_number": "9785236490222546",
      "card_cvv": "210",
      "card_holder": "Glenda Chang",
      "card_expiration_date": "2/2025"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "cielo",
      "card_number": "9370701430746123",
      "card_cvv": "248",
      "card_holder": "Beatriz Kane",
      "card_expiration_date": "1/2023"
    },
    {
      "user_id": users[Math.floor(Math.random()*users.length)],
      "card_flag": "amex",
      "card_number": "9260593818470706",
      "card_cvv": "183",
      "card_holder": "Emilia Parrish",
      "card_expiration_date": "6/2023"
    }
  ]);

  const ordersData = new Array(30).fill({
    order_status: ['paid', 'canceled', 'waiting', 'confirmed'][Math.floor(Math.random()*4)],
    payment_method: ['card', 'pix', 'boleto'][Math.floor(Math.random()*3)],
    card_used: cards[Math.floor(Math.random()*cards.length)],
    product_id: products[Math.floor(Math.random()*products.length)],
    user_id: users[Math.floor(Math.random()*users.length)]
  });
  await knex(ordersTable).insert(ordersData);
};



