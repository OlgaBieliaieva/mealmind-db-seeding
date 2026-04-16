export function useRecipeStatusActions() {
  return {
    publish: {
      mutate: (id: string) => console.log("publish", id),
      isPending: false,
    },
    archive: {
      mutate: (id: string) => console.log("archive", id),
      isPending: false,
    },
    restore: {
      mutate: (id: string) => console.log("restore", id),
      isPending: false,
    },
  };
}
