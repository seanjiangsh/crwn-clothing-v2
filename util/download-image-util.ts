import fs from "fs";
import path from "path";
import https from "https";

export const oldCategories = [
  {
    id: "cjwuuj5bz000i0719rrtw5gqk",
    title: "Hats",
    items: [
      {
        id: "cjwuuj5ip000j0719taw0mjdz",
        name: "Brown Brim",
        price: 25,
        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      },
      {
        id: "cjwuuj5j4000l0719l3ialwkj",
        name: "Blue Beanie",
        price: 18,
        imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
      },
      {
        id: "cjwuuj5je000n0719ch6nbhik",
        name: "Brown Cowboy",
        price: 35,
        imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
      },
      {
        id: "cjwuuj5jh000p0719rtjatb2f",
        name: "Grey Brim",
        price: 25,
        imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png",
      },
      {
        id: "cjwuuj5jp000r07198x90aciu",
        name: "Green Beanie",
        price: 18,
        imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png",
      },
      {
        id: "cjwuuj5jy000t0719hgrbwczg",
        name: "Palm Tree Cap",
        price: 14,
        imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
      },
      {
        id: "cjwuuj5k0000v0719yug39d50",
        name: "Red Beanie",
        price: 18,
        imageUrl: "https://i.ibb.co/bLB646Z/red-beanie.png",
      },
      {
        id: "cjwuuj5k5000x071945jq904o",
        name: "Wolf Cap",
        price: 14,
        imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
      },
      {
        id: "cjwuuj5k7000z0719j89wlop9",
        name: "Blue Snapback",
        price: 16,
        imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
      },
    ],
  },
  {
    id: "cjwuun2fa001907195roo7iyk",
    title: "Jackets",
    items: [
      {
        id: "cjwuun2fp001a0719thf91fzq",
        name: "Black Jean Shearling",
        price: 125,
        imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
      },
      {
        id: "cjwuun2na001c0719ovsfpdjt",
        name: "Blue Jean Jacket",
        price: 90,
        imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
      },
      {
        id: "cjwuun2nl001e0719x5ca9vk2",
        name: "Grey Jean Jacket",
        price: 90,
        imageUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
      },
      {
        id: "cjwuun2nz001g0719a4nrc7vz",
        name: "Brown Shearling",
        price: 165,
        imageUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png",
      },
      {
        id: "cjwuun2o5001i0719ll276vri",
        name: "Tan Trench",
        price: 185,
        imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png",
      },
    ],
  },
  {
    id: "cjwuuprqs00240719lb9kvlqe",
    title: "Mens",
    items: [
      {
        id: "cjwuuprr7002507197hkhwwjk",
        name: "Camo Down Vest",
        price: 325,
        imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png",
      },
      {
        id: "cjwuuprrg00270719wm1jaeal",
        name: "Floral T-shirt",
        price: 20,
        imageUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
      },
      {
        id: "cjwuuprrj002907199i37iw4j",
        name: "Black & White Longsleeve",
        price: 25,
        imageUrl: "https://i.ibb.co/55z32tw/long-sleeve.png",
      },
      {
        id: "cjwuuprrk002b0719facgebbe",
        name: "Pink T-shirt",
        price: 25,
        imageUrl: "https://i.ibb.co/RvwnBL8/pink-shirt.png",
      },
      {
        id: "cjwuuprro002d071967fd4qev",
        name: "Jean Long Sleeve",
        price: 40,
        imageUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
      },
      {
        id: "cjwuuprrq002f0719pscbbpr2",
        name: "Burgundy T-shirt",
        price: 25,
        imageUrl: "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png",
      },
    ],
  },
  {
    id: "cjwuva2zz003f07193pv1xavh",
    title: "Sneakers",
    items: [
      {
        id: "cjwuva30a003g0719q0czfph5",
        name: "Adidas NMD",
        price: 220,
        imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
      },
      {
        id: "cjwuva30c003i0719vvj1fh5e",
        name: "Adidas Yeezy",
        price: 280,
        imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
      },
      {
        id: "cjwuva30h003k0719w85jjibq",
        name: "Black Converse",
        price: 110,
        imageUrl: "https://i.ibb.co/bPmVXyP/black-converse.png",
      },
      {
        id: "cjwuva30w003m0719wf6z555j",
        name: "Nike White AirForce",
        price: 160,
        imageUrl: "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
      },
      {
        id: "cjwuva30y003o0719tmeghd3t",
        name: "Nike Red High Tops",
        price: 160,
        imageUrl: "https://i.ibb.co/QcvzydB/nikes-red.png",
      },
      {
        id: "cjwuva310003q07198onlywwk",
        name: "Nike Brown High Tops",
        price: 160,
        imageUrl: "https://i.ibb.co/fMTV342/nike-brown.png",
      },
      {
        id: "cjwuva312003s0719v0hwcvv9",
        name: "Air Jordan Limited",
        price: 190,
        imageUrl: "https://i.ibb.co/w4k6Ws9/nike-funky.png",
      },
      {
        id: "cjwuva314003u071910ziu5uw",
        name: "Timberlands",
        price: 200,
        imageUrl: "https://i.ibb.co/Mhh6wBg/timberlands.png",
      },
    ],
  },
  {
    id: "cjwuvbix2003y071935qfqr7a",
    title: "Womens",
    items: [
      {
        id: "cjwuvbix8003z0719zc0rptuq",
        name: "Blue Tanktop",
        price: 25,
        imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
      },
      {
        id: "cjwuvbixa00410719vjogs1r5",
        name: "Floral Blouse",
        price: 20,
        imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
      },
      {
        id: "cjwuvbixd00430719jmw5g07u",
        name: "Floral Dress",
        price: 80,
        imageUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png",
      },
      {
        id: "cjwuvbixh00450719yj2bikt2",
        name: "Red Dots Dress",
        price: 80,
        imageUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
      },
      {
        id: "cjwuvbixm0047071988h0fhiu",
        name: "Striped Sweater",
        price: 45,
        imageUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png",
      },
      {
        id: "cjwuvbixs00490719yme6cgre",
        name: "Yellow Track Suit",
        price: 135,
        imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
      },
      {
        id: "cjwuvbixu004b0719jaipy42p",
        name: "White Blouse",
        price: 20,
        imageUrl: "https://i.ibb.co/qBcrsJg/white-vest.png",
      },
    ],
  },
];

const assetDir = "assets";
oldCategories.forEach((category) => {
  const { title, items } = category;
  const dir = `${assetDir}/${title}`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  items.forEach((item) => {
    const { id, imageUrl } = item;
    const file = fs.createWriteStream(path.join(dir, `${id}.png`));
    https.get(imageUrl, (response) => response.pipe(file));
  });
});

const newJson = oldCategories.map((category) => {
  return {
    ...category,
    items: category.items.map((item) => {
      const { imageUrl, ...itemWithoutImageUrl } = item;
      return itemWithoutImageUrl;
    }),
  };
});
fs.writeFileSync("categories.json", JSON.stringify(newJson, null, 2));
