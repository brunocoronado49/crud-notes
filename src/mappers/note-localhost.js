export const noteLocalhost = (note) => {
  const { id, title, description, isActive } = note;
  return {
    id,
    title,
    isActive,
    description
  };
}
