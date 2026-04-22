export async function writeSafe(
  writeContract: any,
  setStatus: any,
  args: any
) {
  try {
    setStatus("pending");

    const tx = await writeContract(args);

    setStatus("success");
    return tx;
  } catch (e) {
    setStatus("error");
    throw e;
  }
}
