
import React from 'react';

type IProps<T> = {
  component: React.FC<React.PropsWithChildren<T>>,
  visible: boolean,
} & T

function Maybe<T>(props: IProps<T>) {
  const { visible, component: Component, ...rest } = props;
  if (!visible) return null;

  return (
    // @ts-ignore
    <Component {...rest} />
  );
}

export default Maybe;
