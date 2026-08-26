import { todo } from "./schema";
import type { AboutPage } from "./schema";

export const aboutPage: AboutPage = {
  intro: todo("about page intro — 2-3 sentence answer-shaped opening (who we are, what we do)"),
  body: todo("about page body — company story, mission, why a home-doctor service, service commitment"),
};
