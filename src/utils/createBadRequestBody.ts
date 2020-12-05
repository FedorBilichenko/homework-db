const createBadRequestBody = ({ error }: { error: string | null }) => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  error_message: error,
});

export default createBadRequestBody;
