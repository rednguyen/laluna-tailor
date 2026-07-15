export type Shop = {
  id: string;
  name: string;
  address: string;
  logo: string;
  coverImage: string;
  description: string;
};

export const shops: Shop[] = [
  {
    id: "bebe-tailor",
    name: "BeBe Tailor",
    address: "05-07 Hoang Dieu, Hoi An, Da Nang, Vietnam",
    logo: "/shops/bebe-tailor.png",
    coverImage: "/shops/bebe-tailor-cover.jpg",
    description: "Description coming soon.",
  },
  {
    id: "tuong-tailor",
    name: "Tuong Tailor",
    address: "67 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/tuong-tailor.png",
    coverImage: "/shops/tuong-tailor-cover.jpg",
    description: "Description coming soon.",
  },
  {
    id: "bao-diep-tailor",
    name: "Bao Diep Tailor",
    address: "28 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/bao-diep-tailor.png",
    coverImage: "/shops/bao-diep-tailor-cover.jpg",
    description: "Description coming soon.",
  },
  {
    id: "blue-xanh-tailor",
    name: "Blue Xanh Tailor",
    address: "56 Tran Hung Dao, Hoi An, Da Nang, Vietnam",
    logo: "/shops/blue-xanh-tailor.png",
    coverImage: "/shops/blue-xanh-tailor-cover.jpg",
    description: "Description coming soon.",
  },
];
