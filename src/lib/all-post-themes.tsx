import BlackCoalPost from "@/components/themes/black-coal/black-coal-post";
import BlackDiamondPost from "@/components/themes/black-diamond/black-diamond-post";
import ColourfulBubblesPost from "@/components/themes/colourful-bubbles/colourful-bubbles-post";
import MidnightSkyPost from "@/components/themes/midnight-sky/midnight-sky-post";
import GrayWhisperPost from "@/components/themes/gray-whisper/gray-whisper-post";
import CornerstonePost from "@/components/themes/cornerstone/cornerstone-post";

const AllPostThemes = [
  {
    name: "black-diamond",
    title: "Black Diamond",
    component: BlackDiamondPost,
    demoUrl: "/demos/black-diamond.png",
    bgUrl: "/backgrounds/black-diamond.png",
  },
  {
    name: "colourful-bubbles",
    title: "Colourful Bubbles",
    component: ColourfulBubblesPost,
    demoUrl: "/demos/colourful-bubbles.png",
    bgUrl: "/backgrounds/colourful-bubbles.png",
  },
  {
    name: "black-coal",
    title: "Black Coal",
    component: BlackCoalPost,
    demoUrl: "/demos/black-coal.png",
    bgUrl: "/backgrounds/black-coal.png",
  },
  {
    name: "midnight-sky",
    title: "Midnight Sky",
    component: MidnightSkyPost,
    demoUrl: "/demos/midnight-sky.png",
    bgUrl: "/backgrounds/midnight-sky.png",
  },
  {
    name: "Gray-whisper",
    title: "Gray Whisper",
    component:GrayWhisperPost,
    demoUrl: "/demos/gray-whisper.png",
    bgUrl: "/backgrounds/Gray-Whisper.jpg",
  },
  {
    name: "Cornerstone",
    title: "Cornerstone",
    component:CornerstonePost,
    demoUrl: "/demos/cornerstone.png",
    bgUrl: "/backgrounds/Cornerstone.jpg",
  },
];

export default AllPostThemes;
