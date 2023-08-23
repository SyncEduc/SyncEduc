import { useCourseStore } from "~/store/courses";
const courseStore = useCourseStore();
export default defineNuxtRouteMiddleware(async (to, from) => {
  courseStore.fetchCourses();
  const existCourse = courseStore.getCoursesList.filter((course: any) => {
    return course.id == to.params.id;
  });
  if (existCourse.length >= 1) {
    if (Object.keys(to.query).length >= 1) {
      if (Object.keys(to.query).includes("aula")) {
        return true;
      } else {
        return navigateTo("/cursos/" + to.params.id + "?aula=1");
      }
    } else {
      return navigateTo("/cursos/" + to.params.id + "?aula=1");
    }
  } else {
    return navigateTo('/cursos')
  }
});
