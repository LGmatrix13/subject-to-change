export const fetcher = (url: string, jwt: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      jwt: jwt,
    },
  }).then((res) => res.json());

export async function delayedFetcher<Data>(
  url: string,
  delay: number
): Promise<Data> {
  return new Promise<Data>((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    }, delay);
  });
}
