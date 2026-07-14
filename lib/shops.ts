export type Shop = {
  id: string;
  name: string;
  address: string;
  logo: string;
  description: string;
};

export const shops: Shop[] = [
  {
    id: "bebe-tailor",
    name: "BeBe Tailor",
    address: "05-07 Hoang Dieu, Hoi An, Da Nang, Vietnam",
    logo: "/shops/bebe-tailor.png",
    description: "Description coming soon.",
  },
  {
    id: "tuong-tailor",
    name: "Tuong Tailor",
    address: "67 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/tuong-tailor.png",
    description: "Description coming soon.",
  },
  {
    id: "bao-diep-tailor",
    name: "Bao Diep Tailor",
    address: "28 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/bao-diep-tailor.png",
    description: "Description coming soon.",
  },
  {
    id: "blue-xanh-tailor",
    name: "Blue Xanh Tailor",
    address: "56 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/blue-xanh-tailor.png",
    description: "Description coming soon.",
  },
];
