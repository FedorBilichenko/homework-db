const func = () => {
  // eslint-disable-next-line no-unused-vars
  const obj: { aa: Record<any, any>; bb: Record<any, any> | null } = {
    aa: {},
    bb: null,
  };
};

func();
