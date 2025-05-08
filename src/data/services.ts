import { getGithubPagesUrl } from "@/lib/utils";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  slug: string;
}

export const services: ServiceItem[] = [
  {
    id: "custom-cakes",
    title: "Custom Cakes",
    description: "Artfully designed custom cakes for birthdays, weddings, and special celebrations, crafted with premium ingredients and attention to detail.",
    images: [
      getGithubPagesUrl("images/Cakes/cake_1.jpg"),
      getGithubPagesUrl("images/Cakes/cake_2.jpg"),
      getGithubPagesUrl("images/Cakes/cake_3.jpg"),
      getGithubPagesUrl("images/Cakes/cake_4.jpg"),
      getGithubPagesUrl("images/Cakes/cake_5.jpg"),
      getGithubPagesUrl("images/Cakes/cake_6.jpg"),
    ],
    slug: "custom-cakes",
  },
  {
    id: "sweets-for-events",
    title: "Sweets for Events",
    description: "Delightful selections of pastries, cookies, and treats perfect for corporate gatherings, family celebrations, and special occasions.",
    images: [
      getGithubPagesUrl("images/Sweets/Sweets_1.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_2.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_3.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_4.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_5.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_6.jpg"),
      getGithubPagesUrl("images/Sweets/Sweets_14.mp4"),
    ],
    slug: "sweets-for-events",
  },
  {
    id: "full-service-catering",
    title: "Full-service Catering",
    description: "Complete catering solutions for weddings and large celebrations, featuring our signature sweets and coordinated service.",
    images: [
      getGithubPagesUrl("images/Catering/catering_1.jpg"),
      getGithubPagesUrl("images/Catering/catering_2.jpg"),
      getGithubPagesUrl("images/Catering/catering_3.jpg"),
      getGithubPagesUrl("images/Catering/catering_4.jpg"),
      getGithubPagesUrl("images/Catering/catering_5.jpg"),
      getGithubPagesUrl("images/Catering/catering_6.jpg"),
    ],
    slug: "full-service-catering",
  },
]; 