import { createRouter, createWebHashHistory } from "vue-router";
import { chapters } from "../chapters";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    ...chapters.map((chapter, index) => ({
      path: chapter.path,
      name: chapter.title,
      props: { index },
      component:
        index === 5
          ? () => import("../views/ChallengeView.vue")
          : () => import("../views/ChapterView.vue"),
    })),
    { path: "/:pathMatch(.*)*", redirect: "/viewport" },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
