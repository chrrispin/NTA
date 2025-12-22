type SubLink = {
  id: string | number;
  title: string;
  url?: string;
  isVideo?: boolean;
  image_url?: string | null;
};

export type Article = {
  id: number;
  section: string;
  category?: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  is_live?: boolean;
  subLinks?: SubLink[];
  isTrending?: boolean;
  isHot?: boolean;
  isVideoSpotlight?: boolean;
  isYoutubePick?: boolean;
  isAudioPick?: boolean;
  roleType?: "heading" | "generic" | "images" | "ads" | "live" | "focus" | "paragraph" | "link";
};

export const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23e5e7eb' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";

export const defaultArticles: Article[] = [
  // news1 primary (large)
  {
    id: 1,
    section: "news1",
    category: "Hero",
    title: "Officials: Over 2,600 rescued from flooded Ukrainian-controlled areas of Kherson",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/97ff8560-8c09-4bfb-8d40-86f8ea671d18.jpg?c=16x9&q=h_720,w_1280,c_fill",
    summary: "Water level at the Nova Kakhovka reservoir 'continues to decline,' minister says, after collapse of major dam in southern Ukraine",
    isTrending: true,
    isHot: true,
    isVideoSpotlight: true,
    isYoutubePick: true,
    isAudioPick: true,
    roleType: "heading",
    subLinks: [
      { id: "1a", title: "Ukrainians in battered southern town hopeful about counter offensive" },
      { id: "1b", title: "Video shows Western donated equipment destroyed by Russia", isVideo: true },
      { id: "1c", title: "Analysis: What's happening along the frontline? It's too early to tell" },
    ],
  },

  // news1 secondary grid items
  {
    id: 2,
    section: "news1",
    title: "Trump's chilling remarks reveal a deeper reality about the 2024 campaign",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230613205742-05-donald-trump-bedminster-061323.jpg?c=16x9&q=h_720,w_1280,c_fill",
    isTrending: true,
    isHot: true,
    isVideoSpotlight: true,
    roleType: "images",
    subLinks: [
      { id: "2a", title: "Takeaways from Trump's historic court appearance" },
      { id: "2b", title: "Trump's pit stop after his arrest was a key play. Here's why", isVideo: true },
      { id: "2c", title: "Opinion: Trump's case is a crucial test for justice in America" },
    ],
  },
  {
    id: 3,
    section: "news1",
    title: "A map in India's new Parliament is making its neighbors nervous",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230531134142-india-new-parliament-house-building-0524.jpg?c=16x9&q=h_720,w_1280,c_fill",
    isTrending: true,
    roleType: "focus",
  },
  {
    id: 4,
    section: "news1",
    title: "Pittsburgh synagogue gunman found guilty on all 63 charges",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230615155632-01-pittsburgh-synagogue-trial-0615-bowers.jpg",
    isTrending: true,
    roleType: "paragraph",
    subLinks: [
      { id: "4a", title: "Cyclist Gino Mäder dies aged 26 after high-speed Tour de Suisse crash" },
      { id: "4b", title: "Thousands of dead fish wash up on Thai beach" },
      { id: "4c", title: "Video shows key Russian supply bridge knocked out by missile", isVideo: true },
    ],
  },
  
  // news2 / sidebar items
  {
    id: 10,
    section: "news2",
    title: "What scientists say keeps mosquitoes at bay",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230622192324-01-how-repel-mosquitos-scientifically-wellness-scn.jpg",
    isHot: true,
    roleType: "generic",
    subLinks: [
      { id: "10a", title: "Train derailment on Montana bridge sends multiple rail cars into the Yellowstone River",
         image_url: "https://cowboystatedaily.imgix.net/train-derail-15-12-19-25.jpg" },
      { id: "10b", title: "Orca pod attacks Ocean Race boats", 
        image_url: "https://cdn.theoceanrace.com/images/m171610_crop169014_1024x576_proportional_1687380005B986.jpg" },
    ],
  },
  {
    id: 11,
    section: "news2",
    title: "'Everybody loves Americans': Why US tourists are a hot commodity",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230622161002-01-us-tourists-hot-commodity-restricted.jpg",
    isHot: true,
    roleType: "link",
    subLinks: [
      { id: "11a", title: "These ordinary people became accidental stars thanks to this niche video genre",
        image_url: "https://m.media-amazon.com/images/M/MV5BZDUwYTBhYjMtYjRhNi00ZGQ0LWI1ZDMtZDg4ZjVhYmM5MGI5XkEyXkFqcGc@._V1_.jpg"
       },
      { id: "11b", title: "This country is 99% water. But the 1% is paradise", 
        image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230516112548-01-crossroads-maldives-aerial.jpg?c=original"
       },
    ],
  },

  // news3
  {
    id: 20,
    section: "news3",
    title: "This endangered bird has found a refuge among Hong Kong's skyscrapers",
    image_url: "https://cdn.cnn.com/cnn/interactive/uploads/20230619-cockatoo_image_c.jpg",
    isHot: true,
    roleType: "images",
    subLinks: [
      { id: "20a", title: "Fox News shuffles prime-time lineup in wake of Tucker Carlson firing and sagging ratings",
        image_url:"https://media.cnn.com/api/v1/images/stellar/prod/230626113836-jesse-watters-fox-file-restricted.jpg?c=original"
      },
      { id: "20b", title: "Hollywood stars part of group taking 24% stake in F1 team",
        image_url:"https://i.dailymail.co.uk/1s/2023/06/26/07/72531583-0-image-a-26_1687761707254.jpg"
       },
      { id: "20c", title: "Rent is falling in America for the first time in years",
        image_url:"https://assets2.cbsnewsstatic.com/hub/i/r/2018/12/05/19c05542-3abf-4e42-923e-26438908b500/thumbnail/1200x630/3998df38fd3ffe09adaac7a4e911d35c/gettyimages-607877802.jpg"
       },
    ],
  },
  {
    id: 21,
    section: "news3",
    title: "Lost for decades, these 19th-century photo portraits tell a quietly radical love story",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230623142929-05-marie-heg-bolette-berg-untold-art-history.jpg",
    roleType: "focus",
    subLinks: [
      { id: "21a", title: "Curious whale follows kayak as Australia revels in bumper annual humpback count", isVideo: true ,
        image_url:"https://c.files.bbci.co.uk/1414/production/_130204150_p0fx9p4m.jpg"
      },
      { id: "21b", title: "Jacquemus' Versailles show was an ode to Princess Diana" ,
        image_url:"https://media.cnn.com/api/v1/images/stellar/prod/230626150138-03-jacquemus-versailles-fashion-show.jpg?c=original"
      },
    ],
  },

  // featured / news4
  {
    id: 30,
    section: "news4",
    title: "Live updates on a huge day for the US economy: Housing, GDP, jobs and Bidenomics",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230627152404-nyse-file-0609.jpg",
    is_live: true,
    isYoutubePick: true,
    roleType: "live",
    subLinks: [
      { id: "30a", title: "Flight problems mostly over — except at United" },
      { id: "30b", title: "The Fed is secretly stress testing the US economy against nightmare scenarios" },
    ],
  },
  {
    id: 32,
    section: "news4",
    title: "Live updates on a huge day for the US economy: Housing, GDP, jobs and Bidenomics",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230627152404-nyse-file-0609.jpg",
    is_live: true,
    isYoutubePick: true,
    roleType: "live",
    subLinks: [
      { id: "30a", title: "Flight problems mostly over — except at United" },
    ],
  },
  {
    id: 31,
    section: "news4",
    title: "The world's biggest cruise ship is almost ready",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230627100639-icon-of-the-sea-card.jpg",
    isYoutubePick: true,
    roleType: "ads",
  },
  {
    id: 33,
    section: "news4",
    title: "Live updates on a huge day for the US economy: Housing, GDP, jobs and Bidenomics",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230627152404-nyse-file-0609.jpg",
    is_live: false,
    isYoutubePick: true,
    roleType: "live",
    subLinks: [
      { id: "30a", title: "Flight problems mostly over — except at United" },
      { id: "30b", title: "The Fed is secretly stress testing the US economy against nightmare scenarios" },
    ],
  },
  {
    id: 34,
    section: "news4",
    title: "The world's biggest cruise ship is almost ready",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230627100639-icon-of-the-sea-card.jpg",
    isYoutubePick: true,
    roleType: "ads",
  },

  // news5/news6/news7 small sets
  { id: 40, section: "news5", title: "Caroline Wozniacki plans return to tennis at US Open",
     image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230622161002-01-us-tourists-hot-commodity-restricted.jpg" },
  { id: 41, section: "news5", title: "Archaeologists find a 3,000-year-old sword so well preserved it's still gleaming", 
    image_url: "https://bloximages.newyork1.vip.townnews.com/kdrv.com/content/tncms/assets/v3/editorial/f/f3/ff384454-6d4c-528c-a9bf-b59a50279205/648c9f073a397.image.jpg?resize=751%2C500" },
  { id: 42, section: "news5", title: "Archaeologists find a 3,000-year-old sword so well preserved it's still gleaming", 
    image_url: "https://news.artnet.com/app/news-upload/2023/03/japanese-sword-3.webp" },
  { id: 50, section: "news6", title: "Rep. Alexandria Ocasio-Cortez supports Biden's reelection bid", 
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230707160356-alexandria-ocasio-cortez-053123.jpg?c=original" },
  { id: 51, section: "news6", title: "Rep. Alexandria Ocasio-Cortez supports Biden's reelection bid", 
    image_url: "https://dims.apnews.com/dims4/default/4f5d293/2147483647/strip/true/crop/7479x4980+0+3/resize/820x546!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Ffb%2F4b%2Fb9fcb0d11926e6fa14009d294ce1%2F7436295568764e6d917742906b33f00e" },
];
