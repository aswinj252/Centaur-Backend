const Approve = async (id, Dbrepository, mailService) => {
  const data = await Dbrepository.Data(id);
  await Dbrepository.Approve(id);

  await mailService.SentMail(data.name, data.email);

  return { status: true, message: "Doctor Approved" };
};
export default Approve;
