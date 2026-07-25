import type { StaticImageData } from "next/image";
import gamify from "@/public/pics/1.png";
import liquid from "@/public/pics/2.png";
import unity from "@/public/pics/3.png";
import crop from "@/public/pics/4.png";

export interface Project {
  title: string;
  description: string;
  href: string;
  image: StaticImageData;
  accent: string;
}

// NOTE: descriptions are drafted — Beka to confirm/refine the copy.
export const projects: Project[] = [
  {
    title: "Gamify",
    description: "Gamified web3 platform with an interactive on-chain experience.",
    href: "https://gamyfi.org/",
    image: gamify,
    accent: "var(--accent-purple)",
  },
  {
    title: "Liquid LSP",
    description: "Liquid staking protocol built on the Internet Computer.",
    href: "https://icp-20.com",
    image: liquid,
    accent: "var(--accent-green)",
  },
  {
    title: "Unity Capital",
    description: "Marketing site for a venture capital firm.",
    href: "https://www.unitycapital.vc/",
    image: unity,
    accent: "var(--accent-orange)",
  },
  {
    title: "Crop2shop",
    description: "Agriculture e-commerce marketplace — our first paid project.",
    href: "https://crop2shop.ge/",
    image: crop,
    accent: "var(--accent-yellow)",
  },
];
