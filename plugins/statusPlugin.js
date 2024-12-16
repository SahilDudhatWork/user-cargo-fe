export default (ctx, inject) => {
  const checkUserUpload = (status) => {
    return status !== "NewAssignments";
  };
  const checkProofOfPhotography = (status) => {
    return status === "Completed";
  };

  inject("checkProofOfPhotography", checkProofOfPhotography);
  inject("checkUserUpload", checkUserUpload);
};
