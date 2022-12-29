export const scrollToEnd = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current!.scrollIntoView();
};
