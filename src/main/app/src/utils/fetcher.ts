export const fetcher = (url: string, studentId: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      studentId: studentId,
    },
  }).then((res) => res.json());
